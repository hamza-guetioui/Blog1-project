export interface Collection {
  _id: string; // Unique ID for the document
  _type: "collection"; // Type of the document (always "collection" in this case)
  name: string; // Name of the collection (e.g., "Summer Collection")
  title: string; // Title of the collection for display purposes (e.g., "Exclusive Summer Edition")
  slug: {
    current: string; // URL-friendly version of the collection name, generated automatically
  };
  description: string; // Description of the collection (e.g., "A limited-time collection of stylish summer wear")
  image: {
    asset: {
      _ref: string; // Reference to the image asset
      _type: "reference"; // The type is always "reference" for images in Sanity
    };
  };
}
