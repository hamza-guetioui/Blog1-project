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
    <Container className="grid grid-cols-[50rem_20rem]  gap-4 my-8 max-w-[70rem] ml-40  mx-auto">
       <Container className=" flex-col gap-4  shadow-2xl   rounded-xl overflow-hidden ">
      <Container className="relative h-52 rounded-xl overflow-hidden">
        {/* Top Bar */}
        <Container className="absolute top-0 left-0 w-full flex items-center justify-between gap-2 px-4 py-3">
          <BackTo />
          <Share />
        </Container>
        {/* Cover Image */}
        <Image
          src={urlFor(post.image).toString()}
          width={500}
          height={500}
          alt={post.image.alt}
          className="object-cover w-full h-full"
        />

        <Container
          className="absolute bottom-0 left-0 w-full flex flex-col gap-1 px-3 py-3
                   bg-gradient-to-t from-slate-800  to-transparent "
        >
          <Category category={post.category} />
          <Name name={post.name} />
          <Description description={post.description} />
        </Container>
      </Container>
      <Container className="py-4 flex">
        <Container className="flex gap-2 flex-col">
          <Title title={post.title} />
          <Tags tags={post.tags} />
        </Container>
        <Container className=" w-2/6 pl-4 border-l-2 border-slate-400/40">
          <Container className="flex gap-2 mb-2 items-center">
            <Time time={post.details.time} />
            <Yield yield={post.details.yield} />
          </Container>
          <Container className="flex gap-2 items-center flex-wrap">
            <Difficulty difficulty={post.details.difficulty} />
            <Cuisine cuisine={post.details.cuisine} />
            <EatIn eatIn={post.details.eatIn} />
            <Tags tags={post.details.diet} />
            <Tags tags={post.details.type} />
          </Container>
        </Container>
      </Container>
      <Container className="flex gap-4 py-4 px-2">
        <Container className="w-44 h-44 rounded-[.5rem] overflow-hidden">
          <Image
            src={urlFor(post.image).toString()}
            width={500}
            height={500}
            alt={post.image.alt}
            className="object-cover w-full h-full"
          />
        </Container>
        <Container className="w-3/4">
          <h1 className="text-lg font-bold mb-2">{post.title}</h1>
          <p className="text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
            aperiam recusandae dolore excepturi numquam nisi dolor ratione ad
            expedita cumque velit amet aliquid eos dignissimos voluptatibus
            illum. Dolorum, nisi iusto!
          </p>
        </Container>
      </Container>
    </Container>
    <Container className="flex flex-col   gap-4 py-4 px-2 items-center w-60 bg-blue-100 rounded-xl h-fit">
      <div className="w-24 h-24 rounded-full bg-[#F5F5F5] "></div>
      <h1 className="text-3xl font-[auto] font-bold  text-white">{post.author}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Aperiam similique vero enim  at natus, optio quas.
      </p>

    </Container>
    </Container>
   
  );
};

export default Index;




const Name = ({ name }: { name: string }) => {
  return <h1 className="text-3xl font-[auto] font-bold  text-white">{name}</h1>;
};
const Title = ({ title }: { title: string }) => {
  return <h1 className="text-xl font-[auto] font-bold ">{title}</h1>;
};
const Description = ({ description }: { description: string }) => {
  return <p className="text-slate-100 font-semibold">{description}</p>;
};
const Tags = ({ tags }: { tags: IRecipeTag[] }) => {
  return (
    <div className="flex gap-2 items-center">
      {tags.map((tag) => (
        <Tag key={tag._id} tag={tag} />
      ))}
    </div>
  );
};

const Category = ({ category }: { category: IRecipeCategory }) => {
  return (
    <Link
      href={`/categories/${category.slug?.current}`}
      className="flex items-center gap-2 text-base text-white  font-semibold group  transation-all duration-300 ease-in-out "
    >
      <span className="group-hover:text-gray-200">{category.name}</span>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="text-white group-hover:text-gray-200"
      />
    </Link>
  );
};
const Tag = ({ tag }: { tag: IRecipeTag }) => {
  return (
    <span
      key={tag._id}
      className="text-[10px] rounded-full px-2 py-[3px] font-semibold text-slate-800/90 
     border-[1px] border-slate-200/40 bg-slate-800/10 hover:bg-gray-200/30 transation-all duration-300 ease-in-out
    "
    >
      {tag.name}
    </span>
  );
};
const Difficulty = ({ difficulty }: { difficulty: string }) => {
  const color = useMemo(
    () =>
      difficulty === "easy"
        ? "bg-green-400/50"
        : difficulty === "medium"
          ? "bg-yellow-400/50"
          : "bg-red-400/50",
    [difficulty]
  );
  return (
    <span
      className={`${color} text-xs rounded-full px-2 py-1 font-semibold text-slate-800/80 
     border-[1px] border-gray-800/30 bg-gray-800/10 hover:bg-gray-800/20 transation-all duration-300 ease-in-out
    `}
    >
      {difficulty}
    </span>
  );
};

const Time = ({ time }: { time: IRecipeTime }) => {
  const t = useMemo(() => {
    const timeCalc =
      (time.preparation.from + time.preparation.to) / 2 +
      (time.cooking.from + time.cooking.to) / 2;

    return `${timeCalc} min`;
  }, [time]);

  return (
    <div className="flex items-center gap-1 text-slate-700/80">
      <FontAwesomeIcon icon={faClock} />
      <span className="text-sm font-semibold ">{t}</span>
    </div>
  );
};
const Yield = ({ yield: y }: { yield: IYield }) => {
  return (
    <div className="flex items-center gap-1  text-slate-700/80">
      <FontAwesomeIcon icon={faUsers} />
      <span className="flex items-center gap-[1px] text-sm font-semibold  ">
        <span>{y.minimum}</span>
        <span>{"-"}</span>
        <span>{y.maximum}</span>
      </span>
    </div>
  );
};

const Cuisine = ({ cuisine }: { cuisine: ICuisine }) => {
  return (
    <Link href={`/cuisines/${cuisine.slug}`}>
      <span
        className=" text-xs rounded-full px-2 py-1 font-semibold text-slate-800/80 
     border-[1px] border-gray-800/30 bg-gray-800/10 hover:bg-gray-800/20 transation-all duration-300 ease-in-out"
      >
        {cuisine.name}
      </span>
    </Link>
  );
};

const EatIn = ({ eatIn }: { eatIn: string[] }) => {
  return (
    <div className="flex gap-2 items-center">
      {eatIn.map((e, index) => (
        <span
          key={index}
          className="text-xs rounded-full px-2 py-1 font-semibold text-slate-900/80 
  border-[1px] border-gray-800/30 bg-gray-800/10 hover:bg-gray-800/20 transation-all duration-300 ease-in-out
 "
        >
          {e}
        </span>
      ))}
    </div>
  );
};

const Share = () => {
  return (
    <button className="flex justify-center items-center w-7 h-7 rounded-full bg-white/70 gap-2  text-gray-800/80 hover:text-gray-800/90  hover:bg-white/90 transation-all duration-300 ease-in-out">
      <FontAwesomeIcon icon={faShareNodes} />
    </button>
  );
};
