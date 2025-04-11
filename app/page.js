import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Navbar from "./nav/nav";

export default function Home() {
  return (
    <div className={styles.page}>
      {/*Header Section*/}
      <Navbar />
      <header>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "3rem",
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
        <p className="text-center">
          Discover elegant, handcrafted jewelry made with love
        </p>
      </header>
      {/*Featured Products Section*/}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm">
        <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300 w-full sm:w-[48%] md:w-[300px]">
          <Image
            src="/image5.jpg"
            width={300}
            height={300}
            alt="ring"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300 w-full sm:w-[48%] md:w-[480px]">
          <Image
            src="/image4.jpg"
            width={480}
            height={320}
            alt="ring"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-[250px]">
          <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
            <Image
              src="/image7.jpg"
              width={250}
              height={300}
              alt="ring"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
            <Image
              src="/image8.jpg"
              width={250}
              height={300}
              alt="ring"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/*Link To All Product*/}
      <div style={{ gap: "1rem" }} className={styles.footer}>
        <a href="/products">
          <button className="font-bold">View All Products</button>
        </a>
        <a href="/about">
          <button className="font-bold">About</button>
        </a>
        <a href="/contact">
          <button className="font-bold">Contact</button>
        </a>
      </div>
      <a href="/products">
        <button className="bg-gradient-to-r from-amber-700 to-yellow-300 text-white font-semibold tracking-wide px-7 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer">
          Shop Now
        </button>
      </a>
    </div>
  );
}
