import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ImageModal from "../UI/ImageModal";
import Card from "../UI/Card";
import { RootState } from "../../store";
import { getImages } from "../../store/actions/galleryActions";
import { GalleryImage } from "../../store/types";

const Homepage: FC = () => {
  const { images, imagesLoaded } = useSelector(
    (state: RootState) => state.gallery
  );
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!imagesLoaded) {
      dispatch(getImages());
    }
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered is-size-1 mb-6">Welcome</h1>
        <h2 className="has-text-centered">
          React Redux application for authentication of users using firebase.{" "}
          <br /> Designed by David Zagi
        </h2>
        {images.length > 0 && (
          <div className="cards-wrapper is-flex mt-5">
            {images.map((image: GalleryImage) => {
              <Card
                key={image.id}
                imageUrl={image.imageUrl}
                onImageClick={() => setImageUrl(image.imageUrl)}
                onDelete={() => {}}
                publicCard
                uploader={image.uploaderName}
              />;
            })}
          </div>
        )}
      </div>
      {imageUrl && (
        <ImageModal url={imageUrl} onClose={() => setImageUrl("")} />
      )}
    </section>
  );
};

export default Homepage;
