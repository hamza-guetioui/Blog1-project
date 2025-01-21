"use client";
import React from "react";
import { ICategory } from "@/types/category";
import { useData } from "../dataContext";

type Props = {
  data: ICategory;
};

const Category = ({ data: category }: Props) => {
  const { filterState: state, filterDispatch: dispatch } = useData();
  const isActive = category._id === state.category;

  return (
    <button
      onClick={() => dispatch({ type: "SET_CATEGORY", payload: category._id })}
      className={`${
        isActive
          ? "bg-blue-500 text-white hover:bg-blue-600" // Active state
          : "bg-slate-100 text-slate-700 hover:bg-slate-200" // Inactive state
      } px-4 py-2 rounded-full transition-all duration-300 ease-in-out`}
    >
      <span className="text-sm font-medium">{category.name}</span>
    </button>
  );
};

export default Category;

export const AllCategories = () => {
  const { filterState: state, filterDispatch: dispatch } = useData();
  const isActive = !state.category;

  return (
    <button
      onClick={() => dispatch({ type: "SET_CATEGORY", payload: "" })}
      className={`${
        isActive
          ? "bg-blue-500 text-white hover:bg-blue-600" // Active state
          : "bg-slate-100 text-slate-700 hover:bg-slate-200" // Inactive state
      } px-4 py-2 rounded-full transition-all duration-300 ease-in-out`}
    >
      <span className="text-sm font-medium">All</span>
    </button>
  );
};