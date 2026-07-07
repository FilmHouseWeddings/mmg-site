import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import TrustedBy from "@/components/TrustedBy";
import Stance from "@/components/Stance";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <Stance />
        <Work />
      </main>
      <Footer />
    </>
  );
}
