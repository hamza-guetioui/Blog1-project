import PostsPage from "@/views/Posts";
import SEO from "@/components/meta/seo";
import seo from "@/data/seo";


export default function Recipes() {
  return (
    <>
      <SEO data={seo.recipes} />
      <main>
        <PostsPage />
      </main>
    </>
  );
}
