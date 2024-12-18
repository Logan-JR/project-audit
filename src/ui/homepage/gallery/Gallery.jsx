"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/ui/homepage/gallery/gallery.module.css";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [images, setImages] = useState([]);

  const loadGallery = async () => {
    const res = await fetch("/api/cpa/gallery");
    const data = await res.json();
    setImages(data);
  };

  const imagesPerPage = 12;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Galería</h2>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className={styles.gallery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={styles.galleryItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <motion.img
                    src={image.img}
                    alt={image.detail}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={prevPage}
          >
            <Image
              src={"/assets/left-arrow.png"}
              alt=""
              width={25}
              height={20}
            />
          </button>
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={nextPage}
          >
            <Image
              src={"/assets/right-arrow.png"}
              alt=""
              width={25}
              height={20}
            />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.img}
                alt={selectedImage.detail}
                width={900}
                height={100}
                className={styles.imagen}
                unoptimized
              />
              <button
                className={styles.closeButton}
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
