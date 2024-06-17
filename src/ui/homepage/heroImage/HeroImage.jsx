import styles from "@/ui/homepage/heroImage/heroImage.module.css";
import Image from "next/image";

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
          <button className={styles.btnHero}>Inscribirse</button>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <Image
              src="/audit-03.png"
              alt=""
              className={styles.logo}
              width={50}
              height={50}
            />
            <p className={styles.cardText}>Descripción 1</p>
          </div>
          <div className={styles.card}>
            <Image
              src="/audit-03.png"
              alt=""
              className={styles.logo}
              width={50}
              height={50}
            />
            <p className={styles.cardText}>Descripción 2</p>
          </div>
          <div className={styles.card}>
            <Image
              src="/audit-03.png"
              alt=""
              className={styles.logo}
              width={50}
              height={50}
            />
            <p className={styles.cardText}>Descripción 3</p>
          </div>
          <div className={styles.card}>
            <Image
              src="/audit-03.png"
              alt=""
              className={styles.logo}
              width={50}
              height={50}
            />
            <p className={styles.cardText}>Descripción 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
