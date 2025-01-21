import { GET_POSTS } from "@/actions/post";
import Container from "@/components/container";
import { urlFor } from "@/sanity/lib/image";
import { IRecipe } from "@/types/Post";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Index = async () => {
  const posts: IRecipe[] = await GET_POSTS({fields: ['_id','name', '"slug": slug.current', 'description', 'image'],limit:3});
  return (
    <Container>
      <Title>Recently posted</Title>
      <PostsContent data={posts} />
    </Container>
  );
};

export default Index;

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-sm font-bold text-gray-600">{children}</h2>;
};

const PostsContent = ({ data: posts }: { data: IRecipe[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} data={post} />
      ))}
    </div>
  );
};

const Post = ({ data: post }: { data: IRecipe }) => {
  return (
    <Link href={`/recipes/${post.slug}`}>
      <div className="flex gap-2 my-3 rounded">
        <div className="min-h-4 w-1/4 rounded-[.5rem] overflow-hidden">
          <Image
            src={urlFor(post.image).toString()}
            width={500}
            height={500}
            alt={post.image.alt}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-3/4">
          <h3 className="text-xs font-bold text-gray-700 line-clamp-1">
            {post.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">
            {post.description}
          </p>
        </div>
      </div>
    </Link>
  );
};
