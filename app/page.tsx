import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeHero from '@/components/HomeHero';
import HomeDevotions from '@/components/HomeDevotions';
import HomeSermons from '@/components/HomeSermons';
import HomeAbout from '@/components/HomeAbout';
import HomeNewsletter from '@/components/HomeNewsletter';
import HomePrayer from '@/components/HomePrayer';
import HomeContact from '@/components/HomeContact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <HomeAbout />
        <HomeDevotions />
        <HomeSermons />
        <HomeNewsletter />
        <HomePrayer />
        <HomeContact />
      </main>
      <Footer />
    </>
  );
}
