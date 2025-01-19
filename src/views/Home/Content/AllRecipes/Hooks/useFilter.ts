import { IRecipe } from "@/types/Post";
import { useMemo, useReducer } from "react";

export type Difficulty = "" | "easy" | "medium" | "hard";
export type UpLoadDate = "All time" | "Last week" | "Last month" | "Last Year";
export type CookingTime =
  | "< 10"
  | "10-15"
  | "15-30"
  | "30-60"
  | "> 60"
  | "All time";

export type FilterStateTypes = {
  category: string;
  uploadDate: UpLoadDate;
  cookingTime: CookingTime;
  difficulty: Difficulty;
  calories: {
    from: number;
    to: number;
  };
  diets: string[];
  type: string;
  cuisine: string;
};

export type FilterActionTypes =
  | { type: "SET_CATEGORY"; payload: string }
  | {
      type: "SET_UPLOAD_DATE";
      payload:  UpLoadDate;
    }
  | {
      type: "SET_COOKING_TIME";
      payload: CookingTime;
    }
  | { type: "SET_DIFFICULTY"; payload: Difficulty }
  | { type: "SET_CALORIES"; payload: { from: number; to: number } }
  | { type: "SET_DIETS"; payload: string[] }
  // | { type: "SET_TYPE"; payload: string }
  | { type: "SET_CUISINE"; payload: string }
  | { type: "RESET_FILTER"; payload: null };

export const initialState: FilterStateTypes = {
  category: "",
  uploadDate: "All time",
  cookingTime: "All time",
  difficulty: "",
  calories: {
    from: 0,
    to: 1000,
  },
  diets: [],
  type: "",
  cuisine: "",
};

export const reducer = (
  state: FilterStateTypes,
  action: FilterActionTypes
): FilterStateTypes => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload }; 
    case "SET_UPLOAD_DATE":
      return { ...state, uploadDate: action.payload }; 
    case "SET_COOKING_TIME":
      return { ...state, cookingTime: action.payload };
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload }; 
    case "SET_CALORIES":
      return { ...state, calories: action.payload };
    case "SET_DIETS":
      return { ...state, diets: action.payload }; 
    // case "SET_TYPE":
    //   return { ...state, type: action.payload };
    case "SET_CUISINE":
      return { ...state, cuisine: action.payload }; 
    case "RESET_FILTER":
      return { ...state };
    default:
      return state;
  }
};

const useFilter = ({ data: recipes }: { data: IRecipe[] }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const result = useMemo(() => {
    return recipes.filter((recipe) => {
      // const matchesSearch = item.name
      //   .toLowerCase()
      //   .includes(filterState.searchText.toLowerCase());
      const matchesCategory =
        !state.category || recipe.category._id === state.category;
      const matchesUploadDate =
        new Date(recipe._createdAt) >=
        new Date(getDateByPeriod(state.uploadDate));
      const matchesCookingTime =
        getCookingDurition(state.cookingTime).min <=
          calculateAverageTime(recipe.details.time) &&
        calculateAverageTime(recipe.details.time) <=
          getCookingDurition(state.cookingTime).max;
      const matchesDifficulty =
        !state.difficulty || recipe.details.difficulty === state.difficulty;
      const matchesCalories =
        !state.calories ||
        (recipe.content.nutrients.calories >= state.calories.from &&
          recipe.content.nutrients.calories <= state.calories.to);

      return (
        // matchesSearch &&
        matchesCategory &&
        matchesUploadDate &&
        matchesCookingTime &&
        matchesDifficulty &&
        matchesCalories
      );
    });
  }, [state, recipes]);

  return {
    state,
    dispatch,
    result,
  };
};

export default useFilter;

function getDateByPeriod(
  period: UpLoadDate
): string {
  const currentDate = new Date();
  let targetDate: Date;

  switch (period) {
    case "Last week":
      targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() - 7); // Subtract 7 days for last week
      break;
    case "Last month":
      targetDate = new Date(currentDate);
      targetDate.setMonth(currentDate.getMonth() - 1); // Subtract 1 month for last month
      break;
    case "Last Year":
      targetDate = new Date(currentDate);
      targetDate.setFullYear(currentDate.getFullYear() - 1); // Subtract 1 year for last year
      break;
    case "All time":
      targetDate = new Date(0); // Set to the Unix epoch (January 1, 1970)
      break;
    default:
      throw new Error("Invalid period");
  }

  // Return date in the required format
  return targetDate.toISOString();
}
function getCookingDurition(
  period:CookingTime
): { min: number; max: number } {
  switch (period) {
    case "< 10":
      return { min: 0, max: 10 };
    case "10-15":
      return { min: 10, max: 15 };
    case "15-30":
      return { min: 15, max: 30 };
    case "30-60":
      return { min: 30, max: 60 };
    case "> 60":
      return { min: 60, max: 1000 };
    case "All time":
      return { min: 0, max: 1000 };

    default:
      return { min: 0, max: 1000 };
  }
}

type Time = {
  preparation: {
    from: number;
    to: number;
  };
  cooking: {
    from: number;
    to: number;
  };
};

function calculateAverageTime(time: Time): number {
  const preparationAverage = (time.preparation.from + time.preparation.to) / 2;
  const cookingAverage = (time.cooking.from + time.cooking.to) / 2;

  return preparationAverage + cookingAverage;
}
