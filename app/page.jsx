import JewelryApp from "@components/JewelryApp";
import "../styles/globals.css";

const Home = () => {
  return (
    <section>
      <JewelryApp />
      <div className="container mx-auto p-6">
        {/* Your main content goes here */}

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            {/* Left section (could be logo, copyright, etc.) */}
            <div className="text-center sm:text-left">
              <span>
                &copy; {new Date().getFullYear()} Jewelry Shop. All rights
                reserved.
              </span>
            </div>

            {/* Right section (links, social media icons, etc.) */}
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-white hover:text-gray-400">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Terms of Service
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Home;
