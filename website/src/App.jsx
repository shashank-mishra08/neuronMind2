import GlobalLayout from './components/layout/GlobalLayout';
import Hero from './components/sections/Hero';
import HealthcareReality from './components/sections/HealthcareReality';
import {
  TraditionalAutomation,
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
      <TraditionalAutomation />
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
