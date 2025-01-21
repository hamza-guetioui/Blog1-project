export interface IMealType {
    _id: string; 
    name: string; 
    slug:  string; 
    description: string; // Description of the meal type
    image?: {
      asset: {
        _ref: string; 
      };
      alt: string;
    };
  }