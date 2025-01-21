export interface ITool {
    _id: string;
    name: string; 
    url?:  string; 
    description: string; 
    image: {
      asset: {
        _ref: string; 
        _type: string; 
      };
    }; 
  }