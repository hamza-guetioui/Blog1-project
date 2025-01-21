import { getPlaiceholder } from "plaiceholder";

export const generateBlurDataURL = async (imageUrl: string) => {
    try {
      // Fetch the image as a buffer
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
  
      // Convert the buffer to a base64 string
      const { base64 } = await getPlaiceholder(Buffer.from(buffer));
      return base64;
    } catch (error) {
      console.error("Error generating blur placeholder:", error);
      return "";
    }
  };