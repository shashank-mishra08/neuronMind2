import { useEffect } from 'react';
import Insights from '../components/sections/Insights';

const InsightsPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20"> {/* Add padding top to account for fixed navbar */}
      <Insights />
    </main>
  );
};

export default InsightsPage;
