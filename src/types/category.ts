export interface ICategory {
  _id: string; // Sanity document ID
  _type: "category"; // Document type
  name: string; // Name of the category
  title: string; // Title of the category
  slug: {
    current: string; // Slug generated from the name
  };
  description: string; // Description of the category
  image: {
    asset: {
      _ref: string; // Reference to the image asset
      _type: "reference"; // Image reference type
    };
  };
}