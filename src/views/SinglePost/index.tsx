import { GET_POST } from "@/actions/post";
import React, { useMemo } from "react";
import {
  ICuisine,
  IRecipe,
  IRecipeCategory,
  IRecipeTag,
  IRecipeTime,
  IYield,
} from "@/types/Post";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faClock,
  faShareNodes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import BackTo from "./BachTo";
import Container from "@/components/container";

const Index = async ({ slug }: { slug: string }) => {
  const post: IRecipe = await GET_POST(slug);

  return (
    <Container className="grid grid-cols-[1fr_300px] gap-8 my-8 max-w-7xl mx-auto p-4">
      {/* Main Content */}
      <Container className="flex flex-col gap-6 shadow-lg rounded-xl overflow-hidden bg-white">
        {/* Cover Image Section */}
        <Container className="relative h-64 rounded-t-xl overflow-hidden">
          {/* Top Bar */}
          <Container className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/50 to-transparent">
  <BackTo />
  <Share />
</Container>

          {/* Cover Image */}
          <Image
            src={urlFor(post.image).toString()}
            width={800}
            height={400}
            alt={post.image.alt}
            className="object-cover w-full h-full"
          />

          {/* Gradient Overlay */}
          <Container className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
            <Category category={post.category} />
            <Name name={post.name} />
            <Description description={post.description} />
          </Container>
        </Container>

        {/* Details Section */}
        <Container className="p-6">
          <Container className="flex gap-6">
            {/* Left Section */}
            <Container className="flex gap-2 flex-col flex-1">
              <Title title={post.title} />
              <Tags tags={post.tags} />
            </Container>

            {/* Right Section */}
            <Container className="w-1/3 pl-6 border-l-2 border-slate-200">
              <Container className="flex flex-col gap-4">
                <Container className="flex gap-4 items-center">
                  <Time time={post.details.time} />
                  <Yield yield={post.details.yield} />
                </Container>
                <Container className="flex flex-wrap gap-2">
                  <Difficulty difficulty={post.details.difficulty} />
                  <Cuisine cuisine={post.details.cuisine} />
                   <EatIn eatIn={post.details.eatIn} />
                {/* <Tags tags={post.details.dietaries} /> */}
                 {/* <Tags tags={post.details.types} />  */}
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>

        {/* Author Section */}
        <Container className="flex gap-6 p-6 border-t border-slate-100">
          <Container className="w-44 h-44 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.image).toString()}
              width={200}
              height={200}
              alt={post.image.alt}
              className="object-cover w-full h-full"
            />
          </Container>
          <Container className="flex-1">
            <h1 className="text-xl font-bold mb-2">{post.title}</h1>
            <p className="text-slate-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
              aperiam recusandae dolore excepturi numquam nisi dolor ratione ad
              expedita cumque velit amet aliquid eos dignissimos voluptatibus
              illum. Dolorum, nisi iusto!
            </p>
          </Container>
        </Container>
      </Container>

      {/* Sidebar */}
      <Container className="flex flex-col gap-6 p-6 bg-blue-50 rounded-xl">
        <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto"></div>
        <h1 className="text-2xl font-bold text-center text-slate-800">
          {post.author.name}
        </h1>
        <p className="text-slate-600 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          similique vero enim at natus, optio quas.
        </p>
      </Container>
    </Container>
  );
};

export default Index;

// Sub-components
const Name = ({ name }: { name: string }) => {
  return <h1 className="text-3xl font-bold text-white">{name}</h1>;
};

const Title = ({ title }: { title: string }) => {
  return <h1 className="text-2xl font-bold text-slate-800">{title}</h1>;
};

const Description = ({ description }: { description: string }) => {
  return <p className="text-slate-200 font-medium">{description}</p>;
};

const Tags = ({ tags }: { tags: IRecipeTag[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag._id} tag={tag} />
      ))}
    </div>
  );
};

const Tag = ({ tag }: { tag: IRecipeTag }) => {
  return (
    <span className="text-xs rounded-full px-3 py-1 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors duration-300">
      {tag.name}
    </span>
  );
};

const Category = ({ category }: { category: IRecipeCategory }) => {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="flex items-center gap-2 text-sm font-semibold text-white hover:text-slate-200 transition-colors duration-300"
    >
      <span>{category.name}</span>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
    </Link>
  );
};

const Difficulty = ({ difficulty }: { difficulty: string }) => {
  const color = useMemo(() => {
    let result;

    switch (difficulty) {
      case "easy":
        result = "bg-green-100 text-green-800";
        break;
      case "medium":
        result = "bg-yellow-100 text-yellow-800";
        break;
      default:
        result = "bg-red-100 text-red-800";
    }

    return result;
  }, [difficulty]);

  return (
    <span
      className={`${color} text-xs rounded-full px-3 py-1 font-semibold transition-colors duration-300`}
    >
      {difficulty}
    </span>
  );
};

const Time = ({ time }: { time: IRecipeTime }) => {
  const totalTime = useMemo(() => {
    const prepTime = (time.preparation.from + time.preparation.to) / 2;
    const cookTime = (time.cooking.from + time.cooking.to) / 2;
    return `${prepTime + cookTime} min`;
  }, [time]);

  return (
    <div className="flex items-center gap-2 text-slate-700">
      <FontAwesomeIcon icon={faClock} className="text-slate-500" />
      <span className="text-sm font-semibold">{totalTime}</span>
    </div>
  );
};

const Yield = ({ yield: y }: { yield: IYield }) => {
  return (
    <div className="flex items-center gap-2 text-slate-700">
      <FontAwesomeIcon icon={faUsers} className="text-slate-500" />
      <span className="text-sm font-semibold">
        {y.minimum}-{y.maximum} servings
      </span>
    </div>
  );
};

const Cuisine = ({ cuisine }: { cuisine: ICuisine }) => {
  return (
    <Link
      href={`/cuisines/${cuisine.slug}`}
      className="text-xs rounded-full px-3 py-1 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors duration-300"
    >
      {cuisine.name}
    </Link>
  );
};

const EatIn = ({ eatIn }: { eatIn: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {eatIn.map((e) => (
        <span
          key={e}
          className="text-xs rounded-full px-3 py-1 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors duration-300"
        >
          {e}
        </span>
      ))}
    </div>
  );
};

const Share = () => {
  return (
    <button className="flex justify-center items-center w-8 h-8 rounded-full bg-white/80 text-slate-700 hover:bg-white hover:text-slate-900 transition-colors duration-300">
      <FontAwesomeIcon icon={faShareNodes} />
    </button>
  );
};
