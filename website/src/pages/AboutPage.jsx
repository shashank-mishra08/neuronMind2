import { useEffect } from 'react';
import AboutUs from '../components/sections/AboutUs';

function AboutPage() {
  /* Scroll to top on mount — same pattern as ContactPage */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AboutUs />
    </>
  );
}

export default AboutPage;
