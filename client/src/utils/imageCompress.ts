import imageCompression from "browser-image-compression";

export const compressImage = async (file: any) => {
  const imageFile = file;
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile

  } catch (error) {
    console.log(error);
  }
};
