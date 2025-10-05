import Image from "next/image";

// Şimdilik statik veri, API hazır olduğunda burası değişecek
const products = [
  { id: 1, name: "Sofa", brand: "Mauris At Blandit Orci.", image: "/sofa-1.jpg" },
  { id: 2, name: "Sofa", brand: "Mauris At Blandit Orci.", image: "/sofa-2.jpg" },
  { id: 3, name: "Sofa", brand: "Mauris At Blandit Orci.", image: "/sofa-3.jpg" },
  { id: 4, name: "Sofa", brand: "Mauris At Blandit Orci.", image: "/sofa-4.jpg" },
  { id: 5, name: "Sofa", brand: "Mauris At Blandit Orci.", image: "/sofa-5.jpg" },
  { id: 6, name: "Sofa", brand: "Mauris At Blandit Orci.", image: "/sofa-6.jpg" },
  { id: 7, name: "Sofa", brand: "Mauris At Blandit Orci.", image: "/sofa-7.jpg" },
  { id: 8, name: "Sofa", brand: "Mauris At Blandit Orci.", image: "/sofa-8.jpg" },
];

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-12">
        {/* Sol */}
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold leading-snug mb-4">
            MAECENAS A ARCU NULLA. <br />
            PELLENTESQUE QUIS <span className="text-orange-600">LECTUS</span>{" "}
            <span className="text-orange-600">CONVALLIS</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Nunc Dolor Mauris, Suscipit Vitae Fringilla Eget, Aliquet Ac Tortor.
            Vivamus Pulvinar Pharetra Felis In Dignissim. Vivamus In Dignissim
            Magna, Ac Tincidunt Sapien
          </p>
          <button className="bg-orange-600 text-white px-6 py-2 rounded font-semibold hover:bg-orange-700">
            Pellentesque Quis Lectus
          </button>
        </div>

        {/* Sağ */}
        <div className="mt-8 md:mt-0 md:ml-8">
          <Image
            src="/hero-img.png"
            alt="Hero Görseli"
            width={400}
            height={400}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Products Section */}
      <section className="px-8 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8">Vestibulum Imperdiet Enim</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 bg-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.brand}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Section with Images */}
      <section className="px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
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
              Felis In Dignissim. Vivamus In Dignissim Magna, Ac Tincidunt
              Sapien. Cras Placerat Iaculis Vehicula.
            </p>
          </div>
        </div>

        <div className="relative h-96 md:h-[500px] mb-16">
          <Image
            src="/colorful-sofa.jpg"
            alt="Colorful Sofa"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="px-8 py-12 bg-white border-4 border-blue-500 mx-8 rounded-lg mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="relative h-80">
            <Image
              src="/turntable-couch.jpg"
              alt="Turntable Couch"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4">TURNTABLE COUCH</h2>
            <p className="text-gray-700 mb-2">
              The archaic form of this table speaks for itself.
            </p>
            <p className="text-gray-700 mb-2">
              It owes its unique identity to the feeling that it turns around its own axis.
            </p>
            <p className="text-gray-700">
              It is present in the room as a feature and fixed on its axle-like mobile foot in solid wood.
            </p>
          </div>
          <div className="relative h-80">
            <Image
              src="/couch-detail.jpg"
              alt="Couch Detail"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-gray-50 p-8 rounded-lg">
          <div className="relative h-48">
            <Image
              src="/lamp.jpg"
              alt="Lamp"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">JOIN OUR NEWSLETTER</h3>
            <p className="text-gray-600 mb-4">Sign up for deals, new products and promotions</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800">
                Sign Up
              </button>
            </div>
          </div>
          <div className="relative h-48">
            <Image
              src="/cabinet.jpg"
              alt="Cabinet"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-8 py-12">
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
      </footer>
    </>
  );
}

// API hazır olduğunda şöyle kullanılacak:
/*
async function getProducts() {
  const res = await fetch('https://your-api.com/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function Hero() {
  const products = await getProducts();
  
  return (
    // ... aynı JSX
  );
}
*/