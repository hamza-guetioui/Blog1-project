import { useEffect, useMemo, useState } from "react";
import { IRecipe } from "@/types/Post";
import { GET_POSTS } from "@/actions/post";

export const useFetch = ({ limit }: { limit: number }) => {
  const [data, setData] = useState<IRecipe[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const POSTS_QUERY = useMemo(() => {
    return `*[_type == "post"]{
      _id,
      name,
      title,
      slug,
      description,
      image,
      "category" : category->{
        _id,
        name,
        "slug": slug.current
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
          name
        },
        "type": type[]->{
          _id,
          name
        },
        "tools": tools[]->{
          _id,
          name,
          url,
          "image": image.asset->{
            _ref
          },
          nutrients
        },
        yield
      },
      isTrending,
      isSuggested,
      visits,
      likesCount,
      dislikesCount,
      author,
      _createdAt
    }[0...${limit}]`;
  }, [limit]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: IRecipe[] = await GET_POSTS(POSTS_QUERY);
        setData(response);
      } catch {
        setError("Failure loading posts");
      }
      setLoading(false);
    };

    fetchData();
  }, [POSTS_QUERY]); // Now this will refetch data when 'limit' changes

  return {
    data,
    error,
    loading,
  };
};

// import useSWR from "swr";
// import { Category } from "@/types/category";
// import { getCategories } from "./action";
// import { useMemo } from "react";

// export const useFetch = ({ page }: { page: number }) => {
//   const CATEGORIES_QUERY = useMemo(() => {
//     return `*[_type == "category"] { 
//       _id,
//       name,
//       title,
//       slug,
//       description,
//       image
//     } [0...${page}]`;
//   }, [page]);

//   const { data, error, isLoading } = useSWR<Category[]>(
//     CATEGORIES_QUERY, 
//     getCategories,
//     {
//       revalidateOnFocus: false, // Avoid refetching on focus (optional)
//     }
//   );

//   return {
//     data,
//     error: error ? "Failure loading posts" : null,
//     loading: isLoading,
//   };
// };