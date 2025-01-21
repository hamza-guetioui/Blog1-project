import { GET_CATEGORIES } from "@/actions/category";
import { ICategory } from "@/types/category";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Container from "@/components/container";
import Category, { AllCategories } from "./Category";

const Categories = async () => {
  const categories: ICategory[] = await GET_CATEGORIES();

  return (
    <Container className="w-full max-sm:px-2 overflow-hidden">
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="flex px-2">
          <>
            <CarouselItem key="all">
              <AllCategories />
            </CarouselItem>
            {categories.map((category) => (
              <CarouselItem key={category._id}>
                <Category data={category} />
              </CarouselItem>
            ))}
          </>
        </CarouselContent>
      </Carousel>
    </Container>
  );
};

export default Categories;
