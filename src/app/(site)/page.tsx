import HomePage from "@/views/Home";
import SEO from "@/components/meta/seo";
import seo from "@/data/seo";

// export const metadata = {
//   title: "Home",
//   description:
//     "Welcome to My Blog, where you can find valuable insights and resources on various topics.",
// };

export default function Home() {
  return (
    <>
      <SEO data={seo.home} />
      <main className="flex flex-col items-center">
        <HomePage />
      </main>
    </>
  );
}
