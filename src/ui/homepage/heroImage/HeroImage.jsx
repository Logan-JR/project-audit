import styles from "@/ui/homepage/heroImage/heroImage.module.css";
import Image from "next/image";
import Link from "next/link";

const HeroImage = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles.textHero}>
          <p className={styles.title}>Bienvenido a Nuestro Sitio Web</p>
          <p className={styles.subtitle}>
            Honestidad, capacidad y sabiduria... Adelante Auditoria!!!
          </p>
          <Link href={"/form"}>
            <button className={styles.btnHero}>Inscribirse</button>
          </Link>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <Image
              src="/assets/icon-01.png"
              alt=""
              className={styles.logo}
              width={50}
              height={50}
            />
            <p className={styles.cardText}>Re Acreditada</p>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/icon-02.png"
              alt=""
              className={styles.logo}
              width={50}
              height={50}
            />
            <p className={styles.cardText}>Carrera Decana</p>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/icon-03.png"
              alt=""
              className={styles.logo}
              width={50}
              height={50}
            />
            <p className={styles.cardText}>Biblioteca</p>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/icon-04.png"
              alt=""
              className={styles.logo}
              width={50}
              height={50}
            />
            <p className={styles.cardText}>Guarderia</p>
          </div>
          <div className={styles.card}>
            <Image
              src="/assets/icon-05.png"
              alt=""
              className={styles.logo}
              width={50}
              height={50}
            />
            <p className={styles.cardText}>Complejo Deportivo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
