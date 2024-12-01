import styles from "./about.module.css";
import Image from "next/image";

const ServicesSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Acerca de Nosotros</h2>
        </header>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.cardLarge}`}>
            <div className={styles.cardImagePlaceholder}>
              <Image
                src="/assets/edificio.png"
                alt=""
                className={styles.logo}
                width={600}
                height={400}
              />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardContent}>
              <Image src="/assets/icon-06.png" alt="" width={50} height={50} />
              <h3 className={styles.cardTitle}>Historia</h3>
              <p className={styles.cardText}>
                La actual Facultad de Ciencias Económicas, Financieras y
                Administrativas tiene su Origen en el instituto Superior de
                Comercio que se fundó en Potosí el 22 de marzo de 1937, por lo
                que el Honorable Consejo Universitario resuelve con la
                resolución Nº98/2002 que la fecha de creación de la{" "}
                <strong>Carrera de Auditoría-Contaduría Pública</strong> sobre
                la base del articulo histórico grafico de la Facultad de
                Ciencias Económicas, Financieras y Administrativas,
                estableciendo la{" "}
                <strong>fecha de creación el 22 de marzo de 1937.</strong>
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardContent}>
              <Image src="/assets/icon-07.png" alt="" width={50} height={50} />
              <h3 className={styles.cardTitle}>Misión</h3>
              <p className={styles.cardText}>
                Formar profesionales idóneos, críticos, reflexivos y
                prospectivos. Promoviendo la integración de las actividades
                académicas, investigativa y laboral que contribuya a la
                pertinencia profesional a través del desarrollo de la ciencia,
                tecnología y cultura.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardContent}>
              <Image src="/assets/icon-08.png" alt="" width={50} height={50} />
              <h3 className={styles.cardTitle}>Visión</h3>
              <p className={styles.cardText}>
                Unidad académica autónoma e intercultural con liderazgo y
                excelencia, reconocida nacional e internacionalmente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
