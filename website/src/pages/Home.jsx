import Hero from '../components/sections/Hero';
import HealthcareReality from '../components/sections/HealthcareReality';
import {
  OperationsBreakdown,
  IntroducingNeuronMind,
  Industries,
  WhyChooseUs,
  Leadership,
  Insights
} from '../components/sections';

function Home() {
  return (
    <>
      <Hero />
      <HealthcareReality />
      <OperationsBreakdown />
      <IntroducingNeuronMind />
      <Industries />
      <Leadership />
      <WhyChooseUs />
      <Insights />
    </>
  );
}

export default Home;
