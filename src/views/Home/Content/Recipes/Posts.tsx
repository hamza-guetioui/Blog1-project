"use client";
import React, { useEffect } from "react";
import { useFetch } from "./Hooks/useFetch";
import { useObservate } from "./Hooks/useObservate";
import Post from "./Post";
import Container from "@/components/container";
import { useData } from "./dataContext";



const Posts = () => {
  const { limit, observerRef } = useObservate(3);
  const { data, loading, error } = useFetch({limit});
  const { displayData: posts, handelData } = useData();


  useEffect(() => {
    if (data) {
      handelData(data);
      return;
    }
    handelData([]);
  }, [handelData, data]);

  return (
    <Container className="w-full px-4 mt-4">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((post) => <Post key={post._id} post={post} />)}
      </Container>
      {/* Red div with the ref */}
      <Container ref={observerRef} className="py-8">
        {loading && <Loading/>}
        {error && (
          <StateMessage
            message={`An error occurred: ${error || "Unable to load posts."}`}
            color="red"
          />
        )}
        {!posts ||
          (posts.length === 0 && (
            <StateMessage
              message="No posts available at the moment."
              color="gray"
            />
          ))}
      </Container>
    </Container>
  );
};

export default Posts;

const StateMessage = ({
  message,
  color,
}: {
  message: string;
  color: string;
}) => (
  <div className="flex justify-center items-center mt-4 min-h-[24rem]">
    <p className={`text-${color}-500`}>{message}</p>
  </div>
);


const Loading =()=>{
  return <div className="loader"></div>
}