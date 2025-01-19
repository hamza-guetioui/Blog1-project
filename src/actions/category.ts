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

export const GET_CATEGORIES = async () : Promise<ICategory[]> => {
  return await client.fetch({query:CATEGORIES_QUERY});
};

