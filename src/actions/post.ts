import { client } from "@/sanity/lib/client";
import { IRecipe } from "@/types/Post";

interface GetPostsOptions {
  limit?: number;
  fields?: string[];
  params?: string[];
}

// Fetch Posts
export const GET_POSTS = async ({
  limit,
  fields = [],
  params = [],
}: GetPostsOptions = {}): Promise<IRecipe[]> => {
  // Build query
  const query = buildPostsQuery({ limit, fields, params });

  try {
    // Fetch data
    const response = await client.fetch({
      query,
      config: {
        cache: "force-cache",
        next: { revalidate: 60 },
      },
    });
    return response as IRecipe[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts");
  }
};
// Single Post
export const GET_POST = async (
  slug: string,
  fields: string[] = []
): Promise<IRecipe> => {
  const query = buildPostQuery(fields);

  try {
    const response = await client.fetch({
      query,
      params: { slug },
      config: {
        cache: "force-cache",
        next: { revalidate: 60 },
      },
    });
    return response as IRecipe;
  } catch {
    throw new Error("Failed to fetch post");
  }
};

const defaultFields = [
  "_id",
  "name",
  "title",
  '"slug": slug.current',
  "description",
  "image",
  '"category": category->{ _id, name, "slug": slug.current }',
  '"tags": tags[]->{ _id, name, "slug": slug.current }',
  "content",
  `"details": details{
    time,
    difficulty,
    eatIn,
    "cuisine": cuisine->{ _id, name, "slug": slug.current ,region},
    "dietaries": dietary[]->{ _id, name, "slug": slug.current, severity },
    "types": type[]->{ _id, name, "slug": slug.current },
    "tools": tools[]->{ _id, name, url, image ,description},
    yield
  }`,
  "isTrending",
  "isSuggested",
  "visits",
  "likesCount",
  "dislikesCount",
  "author",
];

// Build Query
const buildPostQuery = (fields: string[] = []): string => {
  const selectedFields = fields.length > 0 ? fields : defaultFields;
  return `*[_type == "post" && slug.current == $slug][0]{ ${selectedFields.join(", ")} }`;
};
// Build GROQ Query
const buildPostsQuery = ({
  limit,
  fields = [],
  params,
}: GetPostsOptions = {}): string => {
  // Use the provided fields or default to all fields
  const selectedFields = fields.length > 0 ? fields : defaultFields;

  // Start building the GROQ query
  let groqQuery = `*[_type == "post"`;

  // Append the custom params if provided
  if (params && params.length > 0) {
    groqQuery += ` && ${params.join(" && ")}`; // Join conditions with "&&"
  }
  // Close the query and add the fields
  groqQuery += `]{
    ${selectedFields.join(",\n")}
  }`;

  // Add limit if provided
  if (limit) {
    groqQuery += `[0...${limit}]`;
  }

  return groqQuery;
};
