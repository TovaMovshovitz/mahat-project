import { Button,Box } from "@mui/material";
import React, { useState } from "react";
import { FcAddImage } from "react-icons/fc";

function Image({ recipe, setRecipe }) {
  const [selectedImage, setSelectedImage] = useState("first");
  const [page, setPage] = useState("first");

  const handleFileChange = (event) => {
    console.log(selectedImage);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      const selectedFile = event.target.files[0];
      setRecipe({ ...recipe, img: selectedFile });
      const formData = new FormData();
      formData.append("image", selectedFile);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",width:"50%"}}>

      {selectedImage == "first" && recipe.img != null ? (
        <div>
          <img
            src={`http://localhost:3600/images/${recipe.img}`}
            alt={`Uploaded image`}
            style={{ width: "100%" }}
          />
          <br></br>
          <Button
            onClick={(selectedImage) => {
              setRecipe({ ...recipe, img: null });
            }}
          >
            replace
          </Button>
        </div>
      ) : selectedImage != "first" && selectedImage ? (
        <div>
          <img
            src={selectedImage}
            alt={`Uploaded image`}
            style={{ width: "100%" }}
          />{" "}
          <br></br>
          <Button
            onClick={(selectedImage) => {
              setSelectedImage(null);
            }}
          >
            replace
          </Button>
        </div>
      ) : (
        <Button component="label">
          <FcAddImage style={{ fontSize: 50 }} />
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleFileChange}
          />
        </Button>
      )}
    </div>
  );
}

export default Image;
