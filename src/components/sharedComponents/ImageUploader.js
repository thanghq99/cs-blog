import { uploadImage } from "@/src/utils/uploadImage";
import React, { useState } from "react";

function ImageUploader({ imageUrl, setImageUrl }) {
  const [loading, setLoading] = useState(false);
  const handleUpload = async (file) => {
    try {
      const form_data = new FormData();
      let preset = process.env.NEXT_PUBLIC_PRESET;
      if (preset) {
        form_data.append("upload_preset", preset);
      }
      if (file) {
        form_data.append("file", file);
        const imageUrl = await uploadImage(form_data);
        return imageUrl;
      }
    } catch (error) {
      console.log(error);
      alert("Cannot upload the image");
    }
  };
  const handleChangeImageUrl = async (e) => {
    try {
      setLoading(true);
      console.log(e.target.files[0]);
      const newImageUrl = await handleUpload(e.target.files[0]);
      setImageUrl(newImageUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-white">
      <input
        onChange={handleChangeImageUrl}
        className="my-1 text-white"
        type="file"
        placeholder="Backgound image"
      ></input>
      <p>
        Status:{" "}
        {imageUrl === "" && !loading
          ? "Need a image"
          : loading
          ? "Loading..."
          : "OK!"}
      </p>
    </div>
  );
}

export default ImageUploader;
