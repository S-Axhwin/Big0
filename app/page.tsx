import Hero from "./components/Hero"
import WearYourStory from "./components/WearYourStory"
import FeatureCarousel from "./components/FeatureCarousel"
import PortfolioGrid from "./components/PortfolioGrid"
import Timeline from "./components/Timeline"
import Marquee from "./components/Marquee"
import ContactForm from "./components/ContactForm"
import NewsletterSubscribe from "./components/NewsletterSubscribe"
import Header from "./components/Header"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WearYourStory />
      <FeatureCarousel />
      <Timeline />
      <Marquee />
      <NewsletterSubscribe />
    </>
  )
}

