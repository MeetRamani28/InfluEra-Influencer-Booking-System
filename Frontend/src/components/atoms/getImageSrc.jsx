const getImageSrc = (image) => {
  if (!image) return "/images/influencer.png";

  if (image.data && image.contentType) {
    const base64 = btoa(
      new Uint8Array(image.data.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:${image.contentType};base64,${base64}`;
  }

  if (image.data) {
    const base64 = btoa(
      new Uint8Array(image.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:image/jpeg;base64,${base64}`;
  }

  return "/images/influencer.png";
};

export default getImageSrc;
