import algoliasearch from "algoliasearch";
import { client } from "@/sanity/lib/client";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_KEY!
); // Replace with your keys

const index = algoliaClient.initIndex("Categories");
interface Category {
  _id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string
}
export async function syncProducts() {
  const categories: Category[] = await client.fetch(
    `*[_type == "category"] {
      _id,
      name,
      title,
      description,
      "imageUrl": image.asset->url
    }`
  );

  // Add objectID based on _id from Sanity
  const categoriesWithObjectID = categories.map((category) => ({
    ...category,
    objectID: category._id, // Add objectID using Sanity _id
  }));

  await index.saveObjects(categoriesWithObjectID);
  console.log(categoriesWithObjectID);
  console.log("Categories synced to Algolia");
}
syncProducts().then(() =>  console.log("Categories synced to Algolia"))
