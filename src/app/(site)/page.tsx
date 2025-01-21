import HomePage from "@/views/Home";
import Seo from "@/components/meta/seo";
import seo from "@/data/seo";
export default function Home() {
  return (
    <>
      <Seo data={seo.home} />
      <HomePage />
    </>
  );
}
