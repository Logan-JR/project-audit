import Navbar from "@/ui/dashboard/navbar/navbar";
import Sidebar from "@/ui/dashboard/sidebar/sidebar";
import styles from "@/ui/dashboard/dashboard.module.css";
import Footer from "@/ui/dashboard/footer/footer";
import { menuCourses } from "@/data/data";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar menuItems={menuCourses} />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
