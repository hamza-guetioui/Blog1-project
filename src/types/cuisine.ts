export interface ICuisine {
    _id: string; 
    name: string; 
    title: string;
    slug:  string;
  
    region: string;
    description: string; 
    image: {
      asset: {
        _ref: string; 
      };
      alt: string;
    };
  }
  