import { Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/layout/GlobalLayout';
import Home from './pages/Home';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <GlobalLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </GlobalLayout>
  );
}

export default App;
