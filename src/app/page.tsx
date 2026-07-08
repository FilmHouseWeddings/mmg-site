import Header from "@/components/Header";
import HeroSlideshow from "@/components/HeroSlideshow";
import Feed from "@/components/Feed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlideshow />
        <Feed />
      </main>
      <Footer />
    </>
  );
}
