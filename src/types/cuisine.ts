export interface Cuisine {
    _id: string; // Unique ID for the document
    _type: "cuisine"; // Type of the document (always "cuisine" in this case)
    name: string; // Name of the cuisine (e.g., "Italian", "Indian")
    title: string; // A short title for display purposes (e.g., "Traditional Italian Cuisine")
    slug: {
      current: string; // URL-friendly version of the cuisine name, automatically generated
    };
    region: string; // Region or country of origin (e.g., "Southern Italy", "North India")
    description: string; // Description of the cuisine (e.g., "Italian cuisine is known for its pasta, pizza, and rich flavors")
    image: {
      asset: {
        _ref: string; // Reference to the image asset
        _type: "reference"; // The type is always "reference" for images in Sanity
      };
    };
  }
  