export interface ITag {
    _id: string;
    name: string; 
    slug:  string; 
    description: string; 
    image?: {
      asset: {
        _ref: string; 
        _type: string; 
      };
    }; 
  }