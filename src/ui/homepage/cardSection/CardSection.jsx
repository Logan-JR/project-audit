import styles from "@/ui/homepage/cardSection/cardsection.module.css";
import Image from "next/image";

const CardSection = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>Escoge tu camino</h2>
      <h1 className={styles.title}>Estudia con nosotros</h1>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <Image
            src="/student-01.jpg"
            alt="Undergraduate Programs"
            className={styles.image}
            width={200}
            height={300}
            unoptimized
          />
          <div className={styles.cardContent}>
            <div className={styles.icon}>
              <Image
                src="/audit-05.png"
                alt="Icon"
                width={50}
                height={50}
                unoptimized
              />
            </div>
            <h3 className={styles.cardTitle}>Undergraduate Programs</h3>
            <p className={styles.cardText}>
              Arts, business, health, science and more, begin your journey with
              a program educavo.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            src="/student-01.jpg"
            alt="Graduate Programs"
            className={styles.image}
            width={200}
            height={300}
            unoptimized
          />
          <div className={styles.cardContent}>
            <div className={styles.icon}>
              <Image
                src="/audit-05.png"
                alt="Icon"
                width={50}
                height={50}
                unoptimized
              />
            </div>
            <h3 className={styles.cardTitle}>Graduate Programs</h3>
            <p className={styles.cardText}>
              Arts, business, health, science and more, begin your journey with
              a program educavo.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            src="/student-01.jpg"
            alt="Online Courses"
            className={styles.image}
            width={200}
            height={300}
            unoptimized
          />
          <div className={styles.cardContent}>
            <div className={styles.icon}>
              <Image
                src="/audit-05.png"
                alt="Icon"
                width={50}
                height={50}
                unoptimized
              />
            </div>
            <h3 className={styles.cardTitle}>Online Courses</h3>
            <p className={styles.cardText}>
              Arts, business, health, science and more, begin your journey with
              a program educavo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
