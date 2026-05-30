import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeHero from '@/components/HomeHero';
import HomeAbout from '@/components/HomeAbout';
import HomeDevotions from '@/components/HomeDevotions';
import HomeSermons from '@/components/HomeSermons';
import HomeTikTok from '@/components/HomeTikTok';
import HomeNewsletter from '@/components/HomeNewsletter';
import HomePrayer from '@/components/HomePrayer';
import HomeContact from '@/components/HomeContact';
import HomeAccomplishments from '@/components/HomeAccomplishments';
import HomeMissions from '@/components/HomeMissions';
import HomeMiracles from '@/components/HomeMiracles';
import HomeEvents from '@/components/HomeEvents';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <HomeAccomplishments />
        <HomeAbout />
        <HomeEvents />
        <HomeDevotions />
        <HomeSermons />
        <HomeMissions />
        <HomeMiracles />
        <HomeTikTok />
        <HomeNewsletter />
        <HomePrayer />
        <HomeContact />
      </main>
      <Footer />
    </>
  );
}
