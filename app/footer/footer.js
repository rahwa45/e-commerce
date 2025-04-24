// app/components/Footer.js
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-around items-center px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4 sm:mb-0">
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "20px",
            }}
          >
            AMBAR
            <Image
              src="/diamond1.webp"
              width={16}
              height={16}
              alt="diamond"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            JEWElRY
          </h1>
        </div>

        {/* Links */}
        <div className="flex gap-6 mb-4 sm:mb-0 items-center">
          <Link href="/products" className="hover:text-yellow-300">
            Products
          </Link>
          <Link href="/about" className="hover:text-yellow-300">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-yellow-300">
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4">
          <a
            href="https://web.facebook.com/people/Rahwa-Gebreslassie/pfbid029PWAf6x9YLuBgGPnmANRY6EbU9ZhRtrcEojS1j2n3GJRh9MnmGgtiZ6mwZY3onffl/?mibextid=ZbWKw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f text-white text-1xl hover:text-yellow-300"></i>
          </a>
          <a
            href="https://www.instagram.com/rahwa_ri/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram text-white text-1xl hover:text-yellow-300"></i>
          </a>
          <a
            href="https://x.com/RahwaG65944/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter text-white text-1xl hover:text-yellow-300"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; 2025 AMBAR Jewelry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
