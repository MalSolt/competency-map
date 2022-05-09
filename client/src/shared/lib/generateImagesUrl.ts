export const generateImagesUrl = (fileName: string | undefined): string => {
  if (!fileName) {
    return '';
  }

  return `${process.env.IMAGES_BASE_URL}/${fileName}`;
}
