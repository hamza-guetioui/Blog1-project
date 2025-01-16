import React, { forwardRef, useMemo } from "react";
import Container from "@/components/container";
import {
  
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
  faEllipsisV,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

type PostProps = {
  post: IRecipe;
};

// Use React.forwardRef to pass the ref to the underlying DOM element
const Post = forwardRef<HTMLDivElement, PostProps>(({ post }, ref) => {


  return (
    <Container
      ref={ref}
      className="relative shadow-2xl h-[25rem] rounded-xl overflow-hidden"
    >
      {/* Top Bar */}
      <Container className="absolute top-0 left-0 w-full flex items-center justify-between gap-2 px-3 py-3 text-xs">
        <Category category={post.category} /> <Options />
      </Container>
      {/* Cover Image */}
      <Image
        src={urlFor(post.image).toString()}
        width={500}
        height={500}
        alt={post.image.alt}
        className="object-cover w-full h-full"
      />
      {/* Content Section */}
      <Container className="absolute bottom-0 left-0 flex items-start p-5 bg-gradient-to-t from-gray-900 via-transparent to-transparent backdrop-blur-sm">
        <Container className="flex gap-2 flex-col">
          <Title title={post.name} slug={post.slug?.current} />
          <Tags tags={post.tags} />
          <Container className="flex gap-2 items-center">
            <Time time={post.details.time} />
            <Yield yield={post.details.yield} />
          </Container>
          <Description description={post.description} />
        </Container>
        {/* <Container className="flex gap-2 w-2/6 pl-4 flex-wrap border-l-2 border-slate-400/40">
          <Difficulty difficulty={post.details.difficulty} />
          <Cuisine cuisine={post.details.cuisine} />
          <EatIn eatIn={post.details.eatIn} />
          <Tags tags={post.details.diet} />
          <Tags tags={post.details.type} />
        </Container> */}
      </Container>
    </Container>
  );
});

// Set displayName for better debugging experience
Post.displayName = "Post";

export default Post;

const Title = ({ title, slug }: { title: string; slug: string }) => {
  return (
    <Link href={`/recipes/${slug}`} className="flex gap-2 items-center">
      <h1 className="text-xl font-[auto] font-bold  text-white">{title}</h1>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-white" />
    </Link>
  );
};
const Tags = ({ tags }: { tags: IRecipeTag[] }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {tags.map((tag) => (
        <Tag key={tag._id} tag={tag} />
      ))}
    </div>
  );
};
const Description = ({ description }: { description: string }) => {
  return <p className="text-slate-50/80 font-semibold line-clamp-2">{description}</p>;
};

const Category = ({ category }: { category: IRecipeCategory }) => {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="flex justify-center items-center bg-blue-400/50 text-slate-100/80 px-2 py-1 text-sm font-semibold rounded-full border-2 border-slate-300/30 hover:bg-blue-400/80 transation-all duration-300 ease-in-out "
    >
      <span>{category.name}</span>
    </Link>
  );
};
const Tag = ({ tag }: { tag: IRecipeTag }) => {
  return (
    <span
      key={tag._id}
      className="text-[10px] rounded-full px-2 py-[3px] font-semibold text-slate-100/90 
     border-[1px] border-slate-200/40 bg-slate-100/10 hover:bg-gray-200/30 transation-all duration-300 ease-in-out
    "
    >
      {tag.name}
    </span>
  );
};
// const Difficulty = ({ difficulty }: { difficulty: string }) => {
//   const color = useMemo(
//     () =>
//       difficulty === "easy"
//         ? "bg-green-400/50"
//         : difficulty === "medium"
//           ? "bg-yellow-400/50"
//           : "bg-red-400/50",
//     [difficulty]
//   );
//   return (
//     <span
//       className={`${color} text-xs rounded-full px-2 py-1 font-semibold text-slate-200/80 
//      border-[1px] border-gray-200/30 bg-gray-200/10 hover:bg-gray-200/20 transation-all duration-300 ease-in-out
//     `}
//     >
//       {difficulty}
//     </span>
//   );
// };

const Time = ({ time }: { time: IRecipeTime }) => {
  const t = useMemo(() => {
    const timeCalc =
      (time.preparation.from + time.preparation.to) / 2 +
      (time.cooking.from + time.cooking.to) / 2;

    return `${timeCalc} min`;
  }, [time]);

  return (
    <div className="flex items-center gap-1 text-slate-100/80">
      <FontAwesomeIcon icon={faClock} />
      <span className="text-sm font-semibold ">{t}</span>
    </div>
  );
};
const Yield = ({ yield: y }: { yield: IYield }) => {
  return (
    <div className="flex items-center gap-1  text-slate-100/80">
      <FontAwesomeIcon icon={faUsers} />
      <span className="flex items-center gap-[1px] text-sm font-semibold  ">
        <span>{y.minimum}</span>
        <span>{"-"}</span>
        <span>{y.maximum}</span>
      </span>
    </div>
  );
};

// const Cuisine = ({ cuisine }: { cuisine: ICuisine }) => {
//   return (
//     <Link href={`/cuisines/${cuisine.slug}`}>
//       <span
//         className=" text-xs rounded-full px-2 py-1 font-semibold text-slate-200/80 
//      border-[1px] border-gray-200/30 bg-gray-200/10 hover:bg-gray-200/20 transation-all duration-300 ease-in-out"
//       >
//         {cuisine.name}
//       </span>
//     </Link>
//   );
// };

// const EatIn = ({ eatIn }: { eatIn: string[] }) => {
//   return (
//     <div className="flex gap-2 items-center">
//       {eatIn.map((e, index) => (
//         <span
//           key={index}
//           className="text-xs rounded-full px-2 py-1 font-semibold text-slate-200/80 
//   border-[1px] border-gray-200/30 bg-gray-200/10 hover:bg-gray-200/20 transation-all duration-300 ease-in-out
//  "
//         >
//           {e}
//         </span>
//       ))}
//     </div>
//   );
// };

const Options = () => {
  return (
    <button className="flex justify-center items-center w-7 h-7 rounded-full bg-white/70 gap-2  text-gray-800/80 hover:text-gray-800/90  hover:bg-white/90 transation-all duration-300 ease-in-out">
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
  );
};
