import axios from "axios";

export const sendImageToBB = async (imageData: File | File[]) => {
  const apiKey = import.meta.env.VITE_IMAGEBB_API;
  const url = `https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`;

  try {
    if (imageData instanceof Array) {
      const imageLinks = [];

      for (let i = 0; i < imageData.length; i++) {
        const res = await axios.post(
          url,
          { image: imageData[i] },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageLinks.push(res?.data?.data?.url);
      }

      return imageLinks;
    }

    const response = await axios.post(
      url,
      { image: imageData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const photoURL = response.data.data.url;
  
    return photoURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
