import Navbar from './Navbar';
import Footer from './Footer';

const GlobalLayout = ({ children }) => {
  return (
    <div className="global-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
