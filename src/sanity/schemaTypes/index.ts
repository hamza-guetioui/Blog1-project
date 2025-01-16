import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { category } from "./category";
import { collection } from "./collection";
import { post } from "./post";
import { author } from "./author";
import { user } from "./user";
import { cuisine } from "./cuisine";
import { mealType } from "./mealType";
import { tag } from "./tag";
import { tool } from "./tool";
import { dietaryRestriction } from "./dietaryRestriction";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    author,
    user,
    post,
    category,
    collection,
    cuisine,
    mealType,
    tag, 
    tool,
    dietaryRestriction,
   
    blockContentType,
  ],
};
