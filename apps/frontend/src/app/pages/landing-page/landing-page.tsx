import LandingNavBar from '../../components/landing-nav-bar/landing-nav-bar';
import LandingHero from '../../components/landing-hero/landing-hero';
import LandingFeatures from '../../components/landing-features/landing-features';
import LandingPricing from '../../components/landing-pricing/landing-pricing';
import LandingFaq from '../../components/landing-faq/landing-faq';
import LandingFooter from '../../components/landing-footer/landing-footer';
import LandingTestimonials from '../../components/landing-testimonials/landing-testimonials';

export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {
  return (
    <>
      <LandingNavBar />
      <LandingHero />
      <LandingFeatures />
      <LandingPricing />
      <LandingTestimonials />
      <LandingFaq />
      <LandingFooter />
    </>
  );
}

export default LandingPage;
