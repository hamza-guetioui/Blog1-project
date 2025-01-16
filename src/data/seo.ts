export interface ISeo {
  title: string;
  meta: (
    | {
        name: string;
        content: string;
        charSet?: undefined;
      }
    | {
        charSet: string;
        name?: undefined;
        content?: undefined;
      }
  )[];
  openGraph: {
    type: string;
    title: string;
    description: string;
    image: string;
    url: string;
    siteName: string;
  };
}
const SEO_DATA = {
    home: {
      title: "Recipes Blog - Delicious Recipes for Every Taste",
      meta: [
        {
          name: "description",
          content:
            "Welcome to Recipes Blog, your go-to source for delicious and easy-to-follow recipes on various cuisines and dietary preferences.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { charSet: "UTF-8" },
        { name: "author", content: "Recipes Blog Team" },
        {
          name: "keywords",
          content: "recipes, food, cooking, blog, easy recipes, healthy eating",
        },
      ],
      openGraph: {
        type: "website",
        title: "Recipes Blog - Delicious Recipes for Every Taste",
        description:
          "Explore a variety of mouth-watering recipes for breakfast, lunch, dinner, and desserts at Recipes Blog.",
        image: "/images/og-home.jpg",
        url: "https://www.recipes-blog.com",
        siteName: "Recipes Blog",
      },
    },
    categories: {
      title: "Categories - Recipes Blog",
      meta: [
        {
          name: "description",
          content:
            "Browse through different categories of recipes, from vegan to gluten-free, and find your next favorite dish.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { charSet: "UTF-8" },
        { name: "author", content: "Recipes Blog Team" },
        {
          name: "keywords",
          content: "categories, recipes, vegan, gluten-free, dessert, appetizers",
        },
      ],
      openGraph: {
        type: "website",
        title: "Categories - Recipes Blog",
        description:
          "Browse through various recipe categories to find the perfect dish for any occasion.",
        image: "/images/og-categories.jpg",
        url: "https://www.recipes-blog.com/categories",
        siteName: "Recipes Blog",
      },
    },
    articles: {
      title: "Articles - Recipes Blog",
      meta: [
        {
          name: "description",
          content:
            "Read insightful articles on food trends, cooking tips, and kitchen hacks to improve your culinary skills.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { charSet: "UTF-8" },
        { name: "author", content: "Recipes Blog Team" },
        {
          name: "keywords",
          content: "articles, food trends, cooking tips, kitchen hacks, recipes blog",
        },
      ],
      openGraph: {
        type: "website",
        title: "Articles - Recipes Blog",
        description:
          "Explore articles on cooking techniques, food trends, and everything related to the culinary world.",
        image: "/images/og-articles.jpg",
        url: "https://www.recipes-blog.com/articles",
        siteName: "Recipes Blog",
      },
    },
    recipes: {
      title: "Recipe Posts - Recipes Blog",
      meta: [
        {
          name: "description",
          content:
            "Find detailed recipe posts with step-by-step instructions, ingredient lists, and tips for perfect results every time.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { charSet: "UTF-8" },
        { name: "author", content: "Recipes Blog Team" },
        {
          name: "keywords",
          content: "recipe posts, recipes, cooking instructions, food blog",
        },
      ],
      openGraph: {
        type: "website",
        title: "Recipe Posts - Recipes Blog",
        description:
          "Read detailed recipe posts and learn how to cook delicious meals from around the world.",
        image: "/images/og-posts.jpg",
        url: "https://www.recipes-blog.com/posts",
        siteName: "Recipes Blog",
      },
    },
  };
  
  export default SEO_DATA;
