import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default MainLayout;