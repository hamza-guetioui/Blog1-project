import algoliasearch from "algoliasearch";

import { IRecipe } from "@/types/Post";
import { client } from "@/sanity/lib/client";

export type IAlgoliaRecipe = Omit<IRecipe, "image"> & {
  image: string; // Replace `image` type with `string` for the URL
};

const query = `*[_type == "post"]{
  _id,
  name,
  title,
  slug,
  description,
  "image": image.asset->url,

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
    yield
  },
  author
}`;

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
); // Replace with your keys

const index = algoliaClient.initIndex("Recipes");

export async function syncProducts() {
  try {
    // Fetch posts from Sanity using next-sanity-client
    const recipes: IAlgoliaRecipe[] = await client.fetch({query});

    // Add objectID based on _id from Sanity
    const recipesWithObjectID = recipes.map((recipe) => ({
      ...recipe,
      objectID: recipe._id, // Add objectID using Sanity _id
    }));

    // Sync with Algolia
    await index.saveObjects(recipesWithObjectID);
  } catch {
    
    console.error("Error syncing recipes to Algolia:");
  }
}
