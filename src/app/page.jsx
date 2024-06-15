import Navbar from "@/ui/homepage/navbar/Navbar";
import HeroImage from "@/ui/homepage/heroImage/HeroImage";
import styles from '@/ui/homepage/heroImage/heroImage.module.css'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroImage />
    </div>
  );
}
