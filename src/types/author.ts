export interface IAuthor {
    _id: string;
    name : string;
    email: string;
    image: { asset: { _ref: string }; alt: string };
    bio: string;
    socialLinks:{
      instagram?: string;
      twitter?: string;
      facebook?: string;
      linkedin?: string;
    }
  }