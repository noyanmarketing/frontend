"use client";

import Image from "next/image";
import sofa1 from "./images/sofa-1.jpg";
import homepage1 from "./images/rs6.jpg";

type Product = {
  id: number;
  name: string;
  brand: string;
  image: any;
};

const products: Product[] = [
  { id: 1, name: "Sofa (2x2)", brand: "Mauris At Blandit Orci.", image: sofa1 },
  { id: 2, name: "Small 1", brand: "Mauris At Blandit Orci.", image: sofa1 },
  { id: 3, name: "Small 2", brand: "Mauris At Blandit Orci.", image: sofa1 },
  { id: 4, name: "Small 3", brand: "Mauris At Blandit Orci.", image: sofa1 },
  { id: 5, name: "Small 4", brand: "Mauris At Blandit Orci.", image: sofa1 },
  { id: 6, name: "Small 5", brand: "Mauris At Blandit Orci.", image: sofa1 },
  { id: 7, name: "Small 6", brand: "Mauris At Blandit Orci.", image: sofa1 },
  { id: 8, name: "Green Armchair", brand: "Luxury Collection", image: sofa1 },
  { id: 9, name: "Wooden Chair", brand: "Classic Design", image: sofa1 },
  { id: 10, name: "Metal Chair", brand: "Industrial Look", image: sofa1 },
];

type ProductCardProps = {
  product: Product;
  price?: string;
  className?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, price, className }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover"
      />
      <div className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded">
        <p className="text-sm font-semibold">{product.name}</p>
        <p className="text-xs">{product.brand}</p>
        {price && <p className="text-sm font-bold">{price}</p>}
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              MAECENAS A ARCU NULLA.
              <br />
              PELLENTESQUE QUIS{" "}
              <span className="text-blue-600">LECTUS CONVALLIS</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Nunc Dolor Mauris, Suscipit Vitae Fringilla Eget, Aliquet Ac Tortor.
              Vivamus Pulvinar Pharetra Felis In Dignissim.
            </p>
            <a
              href="#"
              className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800"
            >
              Pellentesque Quis Lectus
            </a>
          </div>

          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <Image
              src= {homepage1}
              alt="Hero visual"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Vestibulum Imperdiet Enim</h2>

          <div className="grid grid-cols-6 grid-rows-3 gap-4 h-[800px]">
            {/* SOL: Büyük kart */}
            <div className="col-span-2 row-span-3">
              <ProductCard product={products[0]} className="w-full h-full" />
            </div>

            {/* ORTA: 6 küçük kart */}
            <div className="col-span-2 row-span-3 grid grid-cols-2 grid-rows-3 gap-4">
              {products.slice(1, 7).map((p, i) => (
                <ProductCard key={p.id} product={p} price={`$${100 + i * 10}`} />
              ))}
            </div>

            {/* SAĞ: 2 büyük yatay kart */}
            <div className="col-span-2 grid grid-rows-2 gap-4">
              <ProductCard product={products[8]} price="$250" className="h-full" />
              <ProductCard product={products[9]} price="$280" className="h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="relative h-96">
            <Image
              src="/room-interior.jpg"
              alt="Interior Design"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Nunc Dolor Mauris,</h2>
            <p className="text-gray-600 leading-relaxed">
              Suscipit Vitae Fringilla Eget, Aliquet Ac Tortor. Vivamus Pulvinar Pharetra
              Felis In Dignissim. Cras Placerat Iaculis Vehicula.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">About Us</h4>
              <p className="text-gray-400 text-sm">
                Vivamus pulvinar pharetra felis in dignissim. Vivamus in dignissim magna.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Products</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: info@furniture.com</li>
                <li>Phone: +90 (555) 123-4567</li>
                <li>Address: Istanbul, Turkey</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Furniture Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
