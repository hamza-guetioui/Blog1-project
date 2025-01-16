import React from "react";
import AllRecipes from "./Content/AllRecipes";

import RecentlyPosted from "./Sidebar/RecentlyPosted";
import SideBar from "./Sidebar";
import Container from "@/components/container";
import RecipeHighlights from "./Content/RecipeHighlights";
import Categories from "./Content/Categories";

const Index = async () => {
  return (
    <Container className="grid lg:grid-cols-12 gap-8 max-w-7xl ml-16 mx-8">
      <Container className="col-span-9 my-8">
        <RecipeHighlights />
        <Categories />
        <AllRecipes />
      </Container>

      <SideBar className="col-span-3 bg-slate-100/40 border-gray-100/30 sticky top-[80px] h-[70vh] rounded-[6px] overflow-hidden p-4 border-2 ">
        <RecentlyPosted />
      </SideBar>
    </Container>
  );
};

export default Index;
