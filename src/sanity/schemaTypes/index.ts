import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";

import { post } from "./post";
import { category } from "./category";
import { collection } from "./collection";
import { tag } from "./tag";
import { author } from "./author";
import { cuisine } from "./cuisine";
import { tool } from "./tool";
import { mealType } from "./mealType";
import { dietary } from "./dietary";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    author,
    post,
    category,
    collection,
    cuisine,
    mealType,
    tag, 
    tool,
    dietary,
   
    blockContentType,
  ],
};
