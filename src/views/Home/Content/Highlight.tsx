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
import { generateBlurDataURL } from "@/utils/blurImage";

const Highlight = async () => {
  const posts: IRecipe[] = await GET_POSTS({fields : ['_id' , '"slug": slug.current', 'image' , 'title'] , params: ['isSuggested == true'] });
  return (
    <Container className=" mt-4 mb-8">
      <Title >Suggested for you</Title>
      <Carousel opts={{ align: "start" }}>
        <CarouselContent className="gap-4 pl-4">
          {posts.length === 0
            ? Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index}>
                  <SkeletonPost />
                </CarouselItem>
              ))
            : posts.map((post) => (
                <CarouselItem key={post._id}>
                  <Post data={post} />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};

export default Highlight;



const Post = async ({ data: post }: { data: IRecipe }) => {
  const blurDateUrl = await generateBlurDataURL(urlFor(post.image).toString())
  return (
    <Link href={`/recipes/${post.slug}`} aria-label={`View recipe: ${post.title}`}>
      <article className="relative w-80 h-48 lg:w-[21rem] lg:h-52 rounded-[6px] overflow-hidden">
        <Image
          src={urlFor(post.image).toString()}
          width={500}
          height={500}
          alt={`Image for recipe: ${post.title}`}
          className="object-cover w-full h-full hover:scale-105 transition-all duration-200 ease-in-out"
          priority={true}
          placeholder="blur"
          blurDataURL={blurDateUrl}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={75}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-800 to-transparent text-white p-2">
          <h2 className="text-sm font-bold">{post.title}</h2>
        </div>
      </article>
    </Link>
  );
};

const SkeletonPost = () => {
  return (
    <Container className="relative w-80 h-48 lg:w-[21rem] lg:h-52 rounded-[6px] overflow-hidden bg-slate-200 animate-pulse">
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-800 to-transparent p-2">
        <div className="h-4 w-3/4 bg-slate-300 rounded mb-2"></div>
        <div className="h-3 w-1/2 bg-slate-300 rounded"></div>
      </div>
    </Container>
  );
};