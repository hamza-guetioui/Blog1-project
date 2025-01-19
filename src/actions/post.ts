import { client } from "@/sanity/lib/client";
import { IRecipe } from "@/types/Post";

const DEFAULT_POSTS_QUERY = `*[_type == "post"]{
  _id,
  name,
  title,
  slug,
  description,
  image,

  "category" : category->{
    _id,
    name,
    slug
  },

  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  },

  content,
  "details": details{
    time,
    difficulty,
    eatIn,
    "cuisine": cuisine->{
      _id,
      name,
      "slug": slug.current
    },
    "diet": diet[]->{
      _id,
      name,
      slug,
    },
    "type": type[]->{
      _id,
      name,
      slug,
    },
    "tools": tools[]->{
      _id,
      name,
      url,
      "image": image.asset->{
        _ref
      }
    },
    yield
  },

  isTrending,
  isSuggested,
  visits,
  likesCount,
  dislikesCount,
  author
}`;

// Get All Posts
export const GET_POSTS = async (
  query: string = DEFAULT_POSTS_QUERY
): Promise<IRecipe[]> => {
  return await client.fetch({
    query,
    config: {
      cache: "force-cache",
      next: { revalidate: 60 },
    },
  });

  // return response as IRecipe[];
};

export const GET_POST = async (slug: string): Promise<IRecipe> => {
  return await client.fetch({
    query: `*[_type == "post" && slug.current == $slug][0]{
  _id,
  name,
  title,
  slug,
  description,
  image,

  "category" : category->{
    _id,
    name,
    slug
  },

  "tags": tags[]->{
    _id,
    name,
    "slug": slug.current
  },

  content,
  "details": details{
    time,
    difficulty,
    eatIn,
    "cuisine": cuisine->{
      _id,
      name,
      "slug": slug.current
    },
    "diet": diet[]->{
      _id,
      name,
      slug,
    },
    "type": type[]->{
      _id,
      name,
      slug,
    },
    "tools": tools[]->{
      _id,
      name,
      url,
      "image": image.asset->{
        _ref
      }
    },
    yield
  },

  isTrending,
  isSuggested,
  visits,
  likesCount,
  dislikesCount,
  author
}`,
    params: {
      slug: slug, // Replace with the actual slug of the post you want to fetch
    },
  });
};
