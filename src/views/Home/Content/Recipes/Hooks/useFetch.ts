import { useEffect, useMemo, useState } from "react";
import { IRecipe } from "@/types/Post";
import { client } from "@/sanity/lib/client";

export const useFetch = ({ limit }: { limit: number }) => {
  const [data, setData] = useState<IRecipe[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => {
    return `*[_type == "post"]{
      _id,
      name,
      title,
      "slug": slug.current,
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
        const response: IRecipe[] = await client.fetch({ query });
        setData(response);
      } catch {
        setError("Failure loading posts");
      }
      setLoading(false);
    };

    fetchData();
  }, [query]); // Now this will refetch data when 'limit' changes

  return {
    data,
    error,
    loading,
  };
};
