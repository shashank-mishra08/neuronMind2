import GlobalLayout from './components/layout/GlobalLayout';
import Hero from './components/sections/Hero';
import HealthcareReality from './components/sections/HealthcareReality';
import {
  OperationsBreakdown,
  IntroducingNeuronMind,
  Solutions,
  HowItWorks,
  OperationalScenarios,
  Industries,
  WhyChooseUs,
  Leadership,
  Insights,
  Contact
} from './components/sections';

function App() {
  return (
    <GlobalLayout>
      <Hero />
      <HealthcareReality />
      <OperationsBreakdown />
      <IntroducingNeuronMind />
      <Solutions />
      <HowItWorks />
      <OperationalScenarios />
      <Industries />
      <Leadership />
      <WhyChooseUs />
      <Insights />
      <Contact />
    </GlobalLayout>
  );
}

export default App;
