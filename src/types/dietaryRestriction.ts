export interface DietaryRestriction {
    _id: string; // Unique ID for the document
    _type: "dietaryRestriction"; // Type of the document (always "dietaryRestriction" in this case)
    name: string; // Name of the dietary restriction (e.g., "No Sugar", "Nut-Free")
    slug: {
      current: string; // URL-friendly version of the dietary restriction name
    };
    description: string; // Description of the dietary restriction (e.g., "Avoids all forms of sugar")
  }