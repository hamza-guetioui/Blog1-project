type Menu = {
    id: number;
    name: string;
    link: string;
  };
  
  export const mainMenu: Menu[] = [
    { id: 3, name: "Home",  link: "/" },
    { id: 1, name: "Categories",  link: "/categories" },
    { id: 2, name: "Collections",  link: "/collections" },
    { id: 4, name: "Recipes",  link: "/#recipes" },
  ];
  
  export const footerMenu: Menu[] = [
    { id: 1, name: "Categories",  link: "/categories" },
    { id: 2, name: "Collections",  link: "/collections" },
    { id: 3, name: "Trending",  link: "/trending" },
    { id: 4, name: "All Recipes",  link: "/recipes" },
  ];
  