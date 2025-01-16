import { client } from "@/sanity/lib/client";
import { ICategory } from "@/types/category";

const CATEGORIES_QUERY = `*[_type == "category"] {
      _id,
  name,
  title,
  slug,
  description,
  image
}`;

export const GET_CATEGORIES = async () => {
  return await client.fetch(CATEGORIES_QUERY);
};
export const getCategories = async (
  CATEGORIES_QUERY: string
): Promise<ICategory[]> => {
  const response = await client.fetch(CATEGORIES_QUERY);
  return response;
};
