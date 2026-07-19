import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Promise from "@/components/Promise";
import Journey from "@/components/Journey";
import Shepherd from "@/components/Shepherd";
import VerseOfDay from "@/components/VerseOfDay";
import Countdown from "@/components/Countdown";
import Give from "@/components/Give";
import FindUs from "@/components/FindUs";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Promise />
      <Journey />
      <Shepherd />
      <VerseOfDay />
      <Countdown />
      <Give />
      <FindUs />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
