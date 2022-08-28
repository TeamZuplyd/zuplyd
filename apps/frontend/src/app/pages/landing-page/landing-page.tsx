import LandingNavBar from '../../components/landing-nav-bar/landing-nav-bar';
import LandingHero from '../../components/landing-hero/landing-hero';
import LandingFeatures from '../../components/landing-features/landing-features';
import LandingPricing from '../../components/landing-pricing/landing-pricing';
import LandingFaq from '../../components/landing-faq/landing-faq';
import LandingFooter from '../../components/landing-footer/landing-footer';
import LandingTestimonials from '../../components/landing-testimonials/landing-testimonials';

import { useAuth0 } from '@auth0/auth0-react';

export interface LandingPageProps {}

export function LandingPage(props: LandingPageProps) {

  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      screen_hint: 'signup',
      appState: {
        returnTo: '/comp-init-1',
      },
    });
  };

  return (
    <>
      <LandingNavBar />
      <LandingHero getStart={handleSignUp}/>
      <LandingFeatures />
      <LandingPricing getStart={handleSignUp}/>
      <LandingTestimonials />
      <LandingFaq />
      <LandingFooter getStart={handleSignUp}/>
    </>
  );
}

export default LandingPage;
