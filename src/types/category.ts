export interface ICategory {
  _id: string;
  parentCategory?: ICategory; 
  name: string;
  title: string; 
  slug:  string; 
  description: string; 
  image: { asset: { _ref: string }; alt: string };
  popularity: number; 
  isFeatured: boolean; 
}
