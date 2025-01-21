import React, { forwardRef, useMemo } from "react";
import Container from "@/components/container";
import { IRecipe, IRecipeCategory, IRecipeTag, IRecipeTime, IYield } from "@/types/Post";
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

const Post = forwardRef<HTMLDivElement, PostProps>(({ post }, ref) => {
  return (
    <Container
      ref={ref}
      className="relative shadow-md h-[22rem] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Top Bar */}
      <Container className="absolute top-0 left-0 w-full flex items-center justify-between gap-2 px-3 py-3 bg-gradient-to-b from-black/30 to-transparent">
        <Category category={post.category} />
        <Options />
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
      <Container className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm">
        <Container className="flex flex-col gap-2">
          <Title title={post.name} slug={post.slug} />
          <Tags tags={post.tags} />
          <Container className="flex gap-4 items-center text-white/80">
            <Time time={post.details.time} />
            <Yield yield={post.details.yield} />
          </Container>
          <Description description={post.description} />
        </Container>
      </Container>
    </Container>
  );
});

Post.displayName = "Post";

export default Post;

// Sub-components
const Title = ({ title, slug }: { title: string; slug: string }) => {
  return (
    <Link href={`/recipes/${slug}`} className="group flex gap-2 items-center hover:text-blue-300 transition-colors duration-300">
      <h1 className="text-lg font-bold text-white">{title}</h1>
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="text-white/70 group-hover:text-blue-300 transition-colors duration-300"
      />
    </Link>
  );
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
    <span
      className="text-xs rounded-full px-2 py-1 font-semibold text-white/90 border border-white/20 bg-white/10 hover:bg-white/20 transition-colors duration-300"
    >
      {tag.name}
    </span>
  );
};

const Description = ({ description }: { description: string }) => {
  return (
    <p className="text-sm text-white/80 line-clamp-2">
      {description}
    </p>
  );
};

const Category = ({ category }: { category: IRecipeCategory }) => {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="flex items-center bg-blue-400/50 text-white/80 px-2 py-1 text-sm font-semibold rounded-full border border-white/30 hover:bg-blue-400/80 transition-colors duration-300"
    >
      {category.name}
    </Link>
  );
};

const Time = ({ time }: { time: IRecipeTime }) => {
  const totalTime = useMemo(() => {
    const preparationTime = (time.preparation.from + time.preparation.to) / 2;
    const cookingTime = (time.cooking.from + time.cooking.to) / 2;
    return `${preparationTime + cookingTime} min`;
  }, [time]);

  return (
    <div className="flex items-center gap-1">
      <FontAwesomeIcon icon={faClock} className="text-white/80" />
      <span className="text-sm font-semibold">{totalTime}</span>
    </div>
  );
};

const Yield = ({ yield: y }: { yield: IYield }) => {
  return (
    <div className="flex items-center gap-1">
      <FontAwesomeIcon icon={faUsers} className="text-white/80" />
      <span className="text-sm font-semibold">
        {y.minimum}-{y.maximum}
      </span>
    </div>
  );
};

const Options = () => {
  return (
    <button className="flex items-center justify-center w-7 h-7 rounded-full bg-white/70 text-gray-800/80 hover:bg-white/90 hover:text-gray-800/90 transition-colors duration-300">
      <FontAwesomeIcon icon={faEllipsisV} />
    </button>
  );
};