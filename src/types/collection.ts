export interface ICollection {
  _id: string;
  name: string;
  title: string;
  slug: string;
  description: string;
  image: {
    asset: {
      _ref: string;
    };
    alt: string;
  };
}
