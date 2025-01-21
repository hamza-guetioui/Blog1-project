type SeverityType = "low" | "medium" | "high";

export interface IDietary {
  _id: string;
  name: string;
  slug: string;
  description: string;
  severity: SeverityType;
  image?: {
    asset: {
      _ref: string;
    };
    alt: string;
  };
}
