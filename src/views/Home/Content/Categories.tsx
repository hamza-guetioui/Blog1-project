import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/components/container";
import { ICategory } from "@/types/category";
import { GET_CATEGORIES } from "@/actions/category";
import Title from "./Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Categories = async () => {
  const categories: ICategory[] = await GET_CATEGORIES();

  return (
    <Container>
      <Title>Categories</Title>

      {/* Grid Layout for Desktop (hidden on mobile) */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <Category key={category._id} data={category} />
        ))}
      </div>

      {/* Carousel Layout for Mobile (hidden on desktop) */}
      <div className="md:hidden">
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent className="gap-4 mx-2">
            {Array.from({ length: Math.ceil(categories.length / 3) }).map(
              (_, groupIndex) => {
                // Create a unique key for the group based on the first category's ID
                const groupKey =
                  categories[groupIndex * 3]?._id || `group-${groupIndex}`;
                return (
                  <CarouselItem
                    key={groupKey}
                    className="grid grid-cols-1 w-[70%] gap-4"
                  >
                    {categories
                      .slice(groupIndex * 3, (groupIndex + 1) * 3)
                      .map((category) => (
                        <Category key={category._id} data={category} />
                      ))}
                  </CarouselItem>
                );
              }
            )}
          </CarouselContent>
        </Carousel>
      </div>
    </Container>
  );
};

export default Categories;

const Category = ({ data: category }: { data: ICategory }) => {
  return (
    <Link href={`/category/${category?.slug}`} key={category._id}>
      <div
        className="relative overflow-hidden flex rounded-xl h-28 bg-gradient-to-t from-slate-900/80 to-transparent
       shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out group"
      >
        <Image
          src={urlFor(category.image).toString()}
          alt={category.name}
          width={600}
          height={600}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold group-hover:text-blue-200 transition-colors duration-300">
            {category.name}
          </h3>
          {/* Optional: Add a description if needed */}
          {/* <p className="text-sm text-gray-300">{category.description}</p> */}
        </div>
      </div>
    </Link>
  );
};
