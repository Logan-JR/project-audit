import styles from "@/ui/homepage/gallery/gallery.module.css";
import Image from "next/image";

const images = [
  { src: "/gallery/img-01.jpg", alt: "" },
  { src: "/gallery/img-02.jpg", alt: "" },
  { src: "/gallery/img-03.jpg", alt: "" },
  { src: "/gallery/img-04.jpg", alt: "" },
  { src: "/gallery/img-05.jpg", alt: "" },
  { src: "/gallery/img-06.jpg", alt: "" },
];

const Gallery = () => {
  return (
    <>
      <h2 className={styles.galleryTitle}>Galería</h2>
      <div className={styles.gallery}>
        {images.map((image, index) => (
          <div key={index} className={styles.galleryItem}>
            <Image
              src={image.src}
              alt={image.alt}
              className={styles.image}
              width={100}
              height={100}
              unoptimized
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallery;
