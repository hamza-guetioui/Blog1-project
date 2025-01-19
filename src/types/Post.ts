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
export interface ISlug {
  current: string;
}


export interface IRecipeContent {
  introduction: BlockContent[];
  image: { asset: { _ref: string }; alt: string }; // Updated type to include potential metadata
  ingredients: {
    name: string;
    description?: string;
  }[];
  steps: {
    title: string;
    description: BlockContent[];
    note: string;
  }[];
  highlights: {
    title : string;
    details: string[];
  };
  nutrients:  {
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
  slug: ISlug;
}
export interface ITool {
  _id: string;  
  name: string;
  url: string;
  image: { asset: { _ref: string }; alt: string };
}
export interface IDiet {
  _id: string;
  name: string;
  slug: ISlug;
}
export interface IType {
  _id: string;
  name: string;
  slug: ISlug;
}
export interface IYield {
  minimum: number;
  maximum: number;
}
export interface IRecipeDetails {
  time: IRecipeTime;
  difficulty: "easy" | "medium" | "hard" ;
  eatIn : string[];
  cuisine: ICuisine;
  tools:  ITool[];
  diet: IDiet[];
  type: IType[];
  yield:IYield;
}

export interface IRecipeCategory {
  _id: string;
  name : string;
  slug: ISlug;
}
export interface IRecipeTag {
  _id: string;
  name : string;
  slug: ISlug;
}

export interface IRecipe {
  _id: string;
  name: string;
  title: string;
  slug : ISlug;
  description: string;
  image: { asset: { _ref: string }; alt: string };

  category:IRecipeCategory;
  tags: IRecipeTag[];

  content: IRecipeContent;
  details: IRecipeDetails;

  isTrending: boolean;
  isSuggested: boolean;
  visits : number;
  likesCount : number;
  dislikesCount : number;
  author: string;
  _createdAt: string;

  // seo: {
  //   title: string;
  //   description: string;
  //   keywords: string[];
  // };
}
