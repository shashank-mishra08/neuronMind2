import Hero from '../components/sections/Hero';
import HealthcareReality from '../components/sections/HealthcareReality';
import {
  OperationsBreakdown,
  IntroducingNeuronMind,
  Industries,
  Leadership
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
    </>
  );
}

export default Home;
