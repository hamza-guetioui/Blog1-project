import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { IRecipe } from "@/types/Post";
import { GET_POSTS } from "@/actions/post";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/components/container";
import Title from "./Title";

const Highlight = async () => {
  const posts: IRecipe[] = await GET_POSTS({fields : ['_id' , '"slug": slug.current', 'image' , 'title'] , params: ['isSuggested == true'] });
  return (
    <Container className=" mt-4 mb-8">
      <Title >Suggested for you</Title>
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="gap-4 pl-4">
          {posts.map((post) => (
            <CarouselItem key={post._id}>
              <Post data={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* 
        <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </Container>
  );
};

export default Highlight;



const Post = ({ data: post }: { data: IRecipe }) => {
  return (
    <Link href={`/recipes/${post.slug}`}>
      <Container className="relative w-80 h-48 lg:w-[21rem] lg:h-52 rounded-[6px] overflow-hidden">
        <Image
          src={urlFor(post.image).toString()}
          width={500}
          height={500}
          alt={post.image.alt}
          className="object-cover w-full h-full  hover:scale-105 transition-all duration-200 ease-in-out"
        />
        <div className="absolute bottom-0 left-0 right-0  bg-gradient-to-t from-slate-800  to-transparent text-white p-2">
          <h2 className="text-sm font-bold">{post.title}</h2>
          {/* <p className="text-xs text-gray-500">{post.description}</p> */}
        </div>
      </Container>
    </Link>
  );
};
