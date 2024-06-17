import Navbar from "@/ui/homepage/navbar/Navbar";
import HeroImage from "@/ui/homepage/heroImage/HeroImage";
import CardSection from "@/ui/homepage/cardSection/CardSection";
import Footer from "@/ui/homepage/footer/Footer";
import Gallery from '@/ui/homepage/gallery/Gallery'

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroImage />
      <Gallery />
      <CardSection />
      <Footer />
    </div>
  );
}
