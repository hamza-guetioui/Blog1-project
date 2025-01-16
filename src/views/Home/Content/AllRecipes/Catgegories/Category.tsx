"use client";
import { ICategory } from "@/types/category";
import React from "react";
import { useData } from "../dataContext";

type Props = {
  data: ICategory;
};

const Category = ({ data: category }: Props) => {
  const { filterState: state, filterDispatch: dispatch } = useData();

  return (
    <button
      onClick={() =>
        dispatch({ type: "SET_CATEGORY", payload: category._id })
      }
      className={`${category._id === state.category ? "text-blue-300" : "bg-slate-100"} px-3 py-1 rounded-full `}
    >
      <span className="text-sm">{category.name}</span>
    </button>
  );
};

export default Category;

export const AllCategories = ()=>{
  const { filterState: state, filterDispatch: dispatch } = useData();
  return   (  <button
    onClick={() =>
      dispatch({ type: "SET_CATEGORY", payload: "" }) // Set to default or null
    }
    className={`${
      !state.category ? "text-blue-300" : "bg-slate-100"
    } px-3 py-1 rounded-full`}
  >
    <span className="text-sm">All</span>
  </button>)

}