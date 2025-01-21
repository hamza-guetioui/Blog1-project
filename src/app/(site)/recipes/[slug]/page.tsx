import React from "react";
import Post from "@/views/SinglePost";
import { GET_POSTS } from "@/actions/post";
import { IRecipe } from "@/types/Post";

export async function generateStaticParams() {
  const posts: IRecipe[] = await GET_POSTS();

  return posts.map((recipe) => ({
    slug: recipe?.slug,
  }));
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return <Post slug={slug} />;
};

export default page;
