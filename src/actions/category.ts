import { client } from "@/sanity/lib/client";
import { ICategory } from "@/types/category";


interface GetCategoriesOptions {
  limit?: number;
  fields?: string[];
  params?: string[];
}

// Fetch Categories
export const GET_CATEGORIES  = async ({
  limit,
  fields = [],
  params = [],
}: GetCategoriesOptions = {}): Promise<ICategory[]> => {
  // Build query
  const query = buildCategoriesQuery({ limit, fields, params });

  try {
    // Fetch data
    const response = await client.fetch({
      query,
      config: {
        cache: "force-cache",
        next: { revalidate: 60 },
      },
    });
    return response as ICategory[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
// Single Post
export const GET_CATEGORY = async (
  slug: string,
  fields: string[] = []
): Promise<ICategory> => {
  const query = buildCategoryQuery(fields);

  try {
    const response = await client.fetch({
      query,
      params: { slug },
      config: {
        cache: "force-cache",
        next: { revalidate: 60 },
      },
    });
    return response as ICategory;
  } catch {
    throw new Error("Failed to fetch category");
  }
};

// Build Query
const buildCategoryQuery = (fields: string[] = []): string => {
  const defaultFields = [
    "_id",
    "name",
    "title",
    '"slug": slug.current',
    "description",
    "image",
    "popularity",
    "isFeatured",
    "ParentCategory"
  ];

  const selectedFields = fields.length > 0 ? fields : defaultFields;
  return `*[_type == "category" && slug.current == $slug][0]{ ${selectedFields.join(", ")} }`;
};
// Build GROQ Query
const buildCategoriesQuery = ({
  limit,
  fields = [],
  params,
}: GetCategoriesOptions = {}): string => {
  const defaultFields = [
    "_id",
    "name",
    "title",
    '"slug": slug.current',
    "description",
    "image",
    "popularity",
    "isFeatured",
    "ParentCategory"
  ];

  // Use the provided fields or default to all fields
  const selectedFields = fields.length > 0 ? fields : defaultFields;

  // Start building the GROQ query
  let groqQuery = `*[_type == "category"`;

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
