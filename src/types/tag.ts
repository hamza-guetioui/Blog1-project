export interface Tag {
    _id: string; // Unique ID for the document
    _type: "tag"; // The type of document (always "tag" in this case)
    name: string; // The name of the tag (e.g., "Vegan")
    title: string; // The title of the tag (e.g., "Plant-Based")
    slug: {
      current: string; // URL-friendly version of the tag name
    };
    description: string; // A brief description of the tag
    image?: {
      asset: {
        _ref: string; // Reference to the image asset
        _type: string; // Type of the asset (usually "image")
      };
    }; // Optional image field
  }