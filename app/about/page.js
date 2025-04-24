"use client";
import styles from "../page.module.css";
import Image from "next/image";
import Navbar from "../nav/nav";

const Aboutpage = () => {
  return (
    <div className="mb-20 mt-20">
      <Navbar />
      <h1
        style={{
          fontSize: "4rem",

          textAlign: "center",
        }}
      >
        About Us
      </h1>
      <div className={styles.about}>
        <p>
          Welcome to Ambar, where elegance meets craftsmanship. We specialize in
          high-quality, timeless jewelry designed to complement every occasion,
          from everyday wear to life’s most cherished moments. Our collection
          features carefully crafted pieces made with precision and passion,
          ensuring beauty, durability, and sophistication. Whether you're
          looking for a classic accessory, a meaningful gift, or a statement
          piece, we are here to add a touch of sparkle to your life. At Ambar,
          we believe jewelry is more than just an accessory—it’s a reflection of
          your unique style and story. Shop with us and discover pieces that
          shine as bright as you!
        </p>

        <Image src="/image4.jpg" width={480} height={380} alt="ring" />
      </div>
    </div>
  );
};

export default Aboutpage;
