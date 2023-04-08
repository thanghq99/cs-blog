export const uploadImage = async (formData) => {
  const cloudinary_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDNAME;
  try {
    const imgUpload = await fetch(
      `${cloudinary_url}/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await imgUpload.json();

    if (data) {
      return data.secure_url;
    }
  } catch (err) {}
};
