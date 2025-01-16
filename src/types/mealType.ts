export interface MealType {
    _id: string; // Unique ID for the document
    _type: "mealType"; // Type of the document (always "mealType" in this case)
    name: string; // Name of the meal type (e.g., "Vegetarian", "Vegan")
    slug: {
      current: string; // URL-friendly version of the meal type name
    };
    description: string; // Description of the meal type
  }