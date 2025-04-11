import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 fixed top-0 w-full shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center font-bold">
        <Link href="/" className="text-2xl font-bold">
          ambar
        </Link>
        <div className="flex space-x-6 gap-4">
          <Link href="/" className="text-black hover:font-semibold">
            Home
          </Link>

          <Link href="/products" className="text-black hover:font-normal">
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
