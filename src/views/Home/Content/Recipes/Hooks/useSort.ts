"use client"
import { IRecipe, IRecipeTime } from "@/types/Post";
import { useMemo, useReducer } from "react";

export type SortStateTypes = {
  NewestFirst: boolean;
  OldestFirst: boolean;
  MostViewed: boolean;
  TopRated: boolean;
  Quickest: boolean;
  Longest: boolean;
};

export type SortActionTypes =
  | { type: "SET_NEWEST_FIRST"; payload: boolean }
  | { type: "SET_OLDEST_FIRST"; payload: boolean }
  | { type: "SET_MOST_VIEWED"; payload: boolean }
  | { type: "SET_TOP_RATED"; payload: boolean }
  | { type: "SET_QUICKEST"; payload: boolean }
  | { type: "SET_LONGEST"; payload: boolean };

export const initialState: SortStateTypes = {
  NewestFirst: false,
  OldestFirst: false,
  MostViewed: false,
  TopRated: false,
  Quickest: false,
  Longest: false,
};

export const reducer = (
  state: SortStateTypes,
  action: SortActionTypes
): SortStateTypes => {
  switch (action.type) {
    case "SET_NEWEST_FIRST":
      return { ...initialState, NewestFirst: action.payload };
    case "SET_OLDEST_FIRST":
      return { ...initialState, OldestFirst: action.payload };
    case "SET_MOST_VIEWED":
      return { ...initialState, MostViewed: action.payload };
    case "SET_TOP_RATED":
      return { ...initialState, TopRated: action.payload };
    case "SET_QUICKEST":
      return { ...initialState, Quickest: action.payload };
    case "SET_LONGEST":
      return { ...initialState, Longest: action.payload };
    default:
      return state;
  }
};


const useSort = ({ data }: { data: IRecipe[] }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const result = useMemo(() => {
    if (!data) return [];

    // Determine the active sort option
    if (state.NewestFirst) {
      return [...data].sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());
    }

    if (state.OldestFirst) {
      return [...data].sort((a, b) => new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime());
    }

    if (state.MostViewed) {
      return [...data].sort((a, b) => b.visits - a.visits);
    }

    if (state.TopRated) {
      return [...data].sort((a, b) => b.likesCount - a.likesCount);
    }

    if (state.Quickest) {
      return [...data].sort((a, b) => calculateAverageTime(a.details.time) - calculateAverageTime(b.details.time));
    }

    if (state.Longest) {
      return [...data].sort((a, b) => calculateAverageTime(b.details.time) - calculateAverageTime(a.details.time));
    }

    // Default case (if no sort is active)
    return data;
  }, [data, state]);

  //     const matchesSearch = item.name
  //       .toLowerCase()
  //       .includes(filterState.searchText.toLowerCase());
  //     const matchesCategory =
  //       !filterState.category || post.category === filterState.category;
  //     const matchesPrice =
  //       item.price >= filterState.priceRange[0] &&
  //       item.price <= filterState.priceRange[1];
  //     const matchesStock = !filterState.inStock || item.inStock;
  //     const matchesRatings =
  //       filterState.ratings.length === 0 || state.ratings.includes(item.rating);

  //     return (
  //       matchesSearch &&
  //       matchesCategory &&
  //       matchesPrice &&
  //       matchesStock &&
  //       matchesRatings
  //     );
  //   }).sort((a, b) => {

  //   })
  //   ;
  // }, [data, filterState]);

  return {
    state,
    dispatch,
    result,
  };
};

export default useSort;


function calculateAverageTime(time: IRecipeTime): number {
  const preparationAverage = (time.preparation.from + time.preparation.to) / 2;
  const cookingAverage = (time.cooking.from + time.cooking.to) / 2;

  return preparationAverage + cookingAverage;
}
