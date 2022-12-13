import imageCompression from "browser-image-compression";

/** 파일과 최대 가로/세로 크기(옵션)를 입력받아 압축을 진행한 후 압축된 파일을 리턴 */
export const compressImage = async (file:File,maxWidth?:number) => {
  const imageFile = file;
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: maxWidth?maxWidth:980,
    useWebWorker: true,
    fileType:'image/png'
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile
  } catch (error) {
    console.log(error);
  }
};
