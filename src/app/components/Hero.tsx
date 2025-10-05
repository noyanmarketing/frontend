

import Image from "next/image";
import './hero.css';
import sofa1 from './images/sofa-1.jpg';

// Diziyi görseldeki 10 karta göre düzenliyoruz.
const products = [
  { id: 1, name: "Sofa (2x2)", brand: "Mauris At Blandit Orci.", image: sofa1 }, // 1. BÜYÜK (index 0)
  { id: 2, name: "Small 1", brand: "Mauris At Blandit Orci.", image: sofa1 }, // KÜÇÜK 1 (index 1)
  { id: 3, name: "Small 2", brand: "Mauris At Blandit Orci.", image: sofa1 }, // KÜÇÜK 2 (index 2)
  { id: 4, name: "Small 3", brand: "Mauris At Blandit Orci.", image: sofa1 }, // KÜÇÜK 3 (index 3)
  { id: 5, name: "Small 4", brand: "Mauris At Blandit Orci.", image: sofa1 }, // KÜÇÜK 4 (index 4)
  { id: 6, name: "Small 5", brand: "Mauris At Blandit Orci.", image: sofa1 }, // KÜÇÜK 5 (index 5)
  { id: 7, name: "Small 6", brand: "Mauris At Blandit Orci.", image: sofa1 }, // KÜÇÜK 6 (index 6)
  
  // Bu 3 kart, görseldeki en sağdaki büyük, geniş ve en alttaki kartlara karşılık geliyor
  { id: 8, name: "Green Armchair", brand: "Luxury Collection", image: sofa1 }, // BÜYÜK KOLTUK (index 7, span-1x3)
  { id: 9, name: "Wooden Chair", brand: "Classic Design", image: sofa1 }, // GENİŞ KART (index 8, span-2x1)
  { id: 10, name: "Metal Chair", brand: "Industrial Look", image: sofa1 }, // ALT KART (index 9, span-2x1)
  
  // Eski fazla kartlar (index 10 ve 11) kaldırılmıştır.
];

// Yardımcı bileşen aynı kalıyor
const ProductCard: React.FC<{ product: typeof products[0]; className: string; price?: string }> = ({ product, className, price }) => {
    // Büyük kartlar için 'product-info-dark'
    const infoClass = className.includes('span-2x2') || className.includes('span-2x1') ? 'product-info-dark' : 'product-info';
    
    return (
        <div className={`product-card ${className}`}>
            <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
            />
            <div className={infoClass}>
                <p className="product-category">{product.name}</p>
                <p className="product-name">{product.brand}</p>
                {price && <p className="product-price">{price}</p>}
            </div>
        </div>
    );
};

export default function Hero() {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              MAECENAS A ARCU NULLA.
              <br />
              PELLENTESQUE QUIS <span className="highlight">LECTUS CONVALLIS</span>
            </h1>
            <p>
              Nunc Dolor Mauris, Suscipit Vitae Fringilla Eget, Aliquet Ac Tortor.
              Vivamus Pulvinar Pharetra Felis In Dignissim. Vivamus In Dignissim
              Magna, Ac Tincidunt Sapien
            </p>
            <a className="hero-btn" href="#">Pellentesque Quis Lectus</a>
          </div>

          <div className="hero-image-wrapper" style={{ position: 'relative', width: 360, height: 360 }}>
            <Image src="/colorful-sofa.jpg" alt="Hero visual" fill className="hero-image" />
          </div>
        </div>
      </section>

      {/* Products Section - GÖRSELDEKİ 10 KARTA GÖRE TEMİZLENMİŞ KISIM */}
      <div className="products-section">
        <h2 className="section-title">Vestibulum Imperdiet Enim</h2>
        
        <div className="product-grid">
            {/* 1. KART: BÜYÜK KART (Sol) - span-2x2 (index 0) */}
            <ProductCard key={products[0].id} product={products[0]} className="span-2x2" />

            {/* Orta bölge: küçük 1x1 kartlar (6 adet) - 2 sütun x 3 satır */}
            <div className="middle-stack">
              {products.slice(1, 7).map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className="span-1x1"
                  price={`$${100 + index * 10}`}
                />
              ))}
            </div>

            {/* Sağ kolon: 9-10. KARTLAR - ekranın en sağında üst üste */}
            <div className="right-stack">
              <ProductCard key={products[8].id} product={products[8]} className="span-2x1" price="$250" />
              <ProductCard key={products[9].id} product={products[9]} className="span-2x1" price="$280" />
            </div>
            
            {/* NOT: Görseldeki o boş gri kart (yer tutucu) artık tamamen kaldırılmıştır.
               Grid akışında boşluk oluşursa, bu sizin CSS'inizdeki 8 sütunluk 
               tanımın, bu kartların boyutlarını tam olarak dolduramadığı anlamına gelir. */}
            
        </div>
      </div>

      {/* Content Section, Featured Product ve Footer kısımları aynı kaldı... */}
      {/* ... */}
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
    </div>
  );
}