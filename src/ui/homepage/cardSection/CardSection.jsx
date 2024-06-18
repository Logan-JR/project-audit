"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/ui/homepage/cardSection/cardsection.module.css";

const publications = [
  {
    title: "Publicación 1",
    text: "Esta es la descripción de la primera publicación. Es algo larga para probar el truncado de texto.",
    image: "/post-01.jpg",
  },
  {
    title: "Publicación 2 Descripción de la segunda publicación.",
    text: "Descripción de la segunda publicación.",
    image: "/post-02.jpg",
  },
  {
    title: "Publicación 3",
    text: "Descripción de la tercera publicación.",
    image: "/post-03.jpg",
  },
  {
    title: "Publicación 4",
    text: "Descripción de la cuarta publicación.",
    image: "/post-01.jpg",
  },
  {
    title: "Publicación 5",
    text: "Descripción de la quinta publicación.",
    image: "/post-01.jpg",
  },
];

const CardSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < publications.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <>
      <h2 className={styles.postTitle}>Publicaciones</h2>
      <div className={styles.slider}>
        <button onClick={prevSlide} className={styles.arrow}>
          ❮
        </button>
        <div className={styles.sliderContent}>
          {publications
            .slice(currentIndex, currentIndex + 3)
            .map((pub, index) => (
              <div key={index} className={styles.slide}>
                <Image
                  src={pub.image}
                  alt={pub.title}
                  className={styles.image}
                  width={200}
                  height={300}
                  unoptimized
                />
                <p className={styles.title}>{pub.title}</p>
              </div>
            ))}
        </div>
        <button onClick={nextSlide} className={styles.arrow}>
          ❯
        </button>
      </div>
    </>
  );
};

export default CardSection;
