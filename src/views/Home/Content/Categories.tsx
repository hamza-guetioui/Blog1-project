import React from "react";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/components/container";
import { ICategory } from "@/types/category";
import { GET_CATEGORIES } from "@/actions/category";
import Title from "./Title";

const Categories = async () => {
  const categories: ICategory[] = await GET_CATEGORIES();
  return (
    <Container className="w-full my-4">
      <Title>Categories</Title>
      <CategoriesContent data={categories} />
    </Container>
  );
};

export default Categories;


const CategoriesContent = ({ data: categories }: { data: ICategory[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {categories.map((category: ICategory) => (
        <Category key={category._id} data={category} />
      ))}
    </div>
  );
};

const Category = ({ data: category }: { data: ICategory }) => {
  return (
    <Link href={`/category/${category?.slug?.current}`} key={category._id}>
      <div className="relative overflow-hidden flex rounded-[6px] h-24 bg-gradient-to-t from-slate-800  to-transparent
       shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out ">
        <Image
          src={urlFor(category.image).toString()}
          alt={category.name}
          width={600}
          height={600}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 p-3 text-white ">
          <h3 className="text-lg font-semibold">{category.name}</h3>
          {/* <p className="text-sm text-gray-500">{category.description}</p> */}
        </div>
      </div>
    </Link>
  );
};
