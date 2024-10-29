"use client";
import React, { useEffect, useState } from "react";
import styles from "./cardsection.module.css";
import Image from "next/image";
import Link from "next/link";

const CardSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    const res = await fetch("/api/cpa/post");
    const data = await res.json();
    console.log(data);
    setImages(data);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className={styles.carrusel}>
      <div
        className={styles.carruselInner}
        style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
      >
        {images.map((image) => (
          <div key={image._id} className={styles.card}>
            <Image
              src={image.img}
              alt={image.detail}
              className={styles.image}
              width={1200}
              height={1200}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.title}>{image.title}</h3>
              <p className={styles.description}>{image.detail}</p>
              <Link href={image.file} target="_blank">
                <button
                  className={`${styles.pdf} ${
                    !image.file.trim() ? styles.error : ""
                  }`}
                  disabled={!image.file.trim()}
                >
                  PDF
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className={`${styles.button} ${styles.prevButton}`}
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className={`${styles.button} ${styles.nextButton}`}
      >
        &#10095;
      </button>
    </div>
  );
};

export default CardSection;
