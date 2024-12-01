import Navbar from "@/ui/homepage/navbar/Navbar";
import HeroImage from "@/ui/homepage/heroImage/HeroImage";
import CardSection from "@/ui/homepage/cardSection/CardSection";
import Footer from "@/ui/homepage/footer/Footer";
import Gallery from "@/ui/homepage/gallery/Gallery";
import About from "@/ui/homepage/about/About";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroImage />
      <About />
      <Gallery />
      <CardSection />
      <Footer />
    </div>
  );
}
