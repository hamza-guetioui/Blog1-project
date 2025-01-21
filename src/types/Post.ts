import { IAuthor } from "./author";

export interface BlockContent {
  _key: string;
  _type: string;
  children: Array<{
    _key: string;
    _type: string;
    marks: string[];
    text: string;
  }>;
}

export interface IRecipeContent {
  introduction: BlockContent[];
  image: { asset: { _ref: string }; alt: string };
  ingredients: {
    name: string;
    description?: string;
  }[];
  steps: {
    title: string;
    description: BlockContent[];
    note?: string;
  }[];
  highlights?: {
    title: string;
    details: string[];
  };
  nutrients: {
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
    sodium: number;
  };
  faq: {
    question: string;
    answer: string;
  };
}

export interface IRecipeTime {
  preparation: {
    from: number;
    to: number;
  };
  cooking: {
    from: number;
    to: number;
  };
}
export interface ICuisine {
  _id: string;
  name: string;
  slug: string;
  region: string;
}
export interface ITool {
  _id: string;
  name: string;
  url?: string;
  image: { asset: { _ref: string }; alt: string };
  description?: string;
}
type SeverityType = "low" | "medium" | "high";

export interface IDietary {
  _id: string;
  name: string;
  slug: string;
  severity: SeverityType;
}
export interface IType {
  _id: string;
  name: string;
  slug: string;
}
export interface IYield {
  minimum: number;
  maximum: number;
}

type DifficultyType = "easy" | "medium" | "hard";
type EatInType = "breakfast" | "lunch" | "dinner" | "snack";
export interface IRecipeDetails {
  time: IRecipeTime;
  difficulty: DifficultyType;
  eatIn: EatInType[];
  cuisine: ICuisine;
  tools: ITool[];
  dietaries: IDietary[];
  types: IType[];
  yield: IYield;
}

export interface IRecipeCategory {
  _id: string;
  name: string;
  slug: string;
}
export interface IRecipeTag {
  _id: string;
  name: string;
  slug: string;
}

export interface IRecipe {
  _id: string;
  name: string;
  title: string;
  slug: string;
  description: string;
  image: { asset: { _ref: string }; alt: string };

  category: IRecipeCategory;
  tags: IRecipeTag[];

  content: IRecipeContent;
  details: IRecipeDetails;

  isTrending: boolean;
  isSuggested: boolean;
  visits: number;
  likesCount: number;
  dislikesCount: number;
  author: IAuthor;
  _createdAt: string;

  // seo: {
  //   title: string;
  //   description: string;
  //   keywords: string[];
  // };
}
