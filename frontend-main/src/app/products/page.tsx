import Link from "next/link";
import Image from "next/image";
import rs1 from './images/rs1.jpg';
import rs2 from './images/rs2.jpg';
export default function ProductListPage() {
  const products = [
    { id: 1, name: "Sandalye", price: 1299, image:"rs1" },
    { id: 2, name: "Milano Kanepe Takımı", price: 18.340, image:"rs2" },
    { id: 3, name: "(Taş Rengi Deri-Yeşil Kumaş)", price: 18.340, image:"rs1.jpg" },
    { id: 4, name: "Kumru Berjer Tekli (Kaz Ayağı Gri / Antrasit Gri Kırlent)", price: 4.610, image:"rs1.jpg" },
    { id: 5, name: "Dilan Köşe Takımı (Gri Deri-Cappucino Kumaş)", price: 11.999, image:"rs1.jpg" },
    { id: 6, name: "Dilan Köşe Takımı (Gri Deri-Gri Kumaş)", price: 38.190, image:"rs1.jpg" },
    { id: 7, name: "Dilan Koltuk Takımı (Taşrengi Deri-Yeşil Kumaş)", price: 27.230, image:"rs1.jpg"},
    { id: 8, name: "Başak Koltuk Takımı (Kahve)", price: 24.540 , image:"rs1.jpg"},
    { id: 9, name: "Alfa Berjer (Lacivert)", price: 5.290, image:"rs1.jpg" },
    { id: 10, name: "Başak Berjer (Kahve)", price: 6.950, image:"rs1.jpg" },
    { id: 11, name: "Beyzade Berjer (Lacivert)", price: 8.910, image:"rs1.jpg" },
    { id: 12, name: "Kumru Berjer Tekli (Kaz Ayağı Gri / Antrasit Gri Kırlent)", price: 4.610 , image:"rs1.jpg"},
    { id: 13, name: "Optima Berjer (Gül Kurusu)", price: 5.640, image:"rs1.jpg" },
    { id: 14, name: "Dilan Koltuk Takımı (Taşrengi Deri-Yeşil Kumaş)", price: 27.230 , image:"rs1.jpg"},
    { id: 15, name: "Dilan Berjer (Gri Deri-Cappucino Kumaş)", price: 7.440, image:"rs1.jpg" },
    { id: 16, name: "Bella Kanepe Takımı (Açık Gri)", price: 16.380, image:"rs1.jpg"  },
    { id: 17, name: "Bohem Elips Masa Takımı", price: 28.180, image:"rs1.jpg" },
    { id: 18, name: "Bohem Plus Sandalye (Kahve Ayak)", price: 3.980, image:"rs1.jpg" },
    { id: 19, name: "VR Gözlük Seti", price: 1499, image:"rs1.jpg" },
    { id: 20, name: "Kablosuz Şarj Standı", price: 499, image:"rs1.jpg" },
  ];

  return (
    <main className="p-6 bg-neutral-50 min-h-screen">
      <h1 className="text-3xl font-bold text-deep-navy mb-8 text-center">
        Ürün Kataloğu
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] p-4"
          >
            <div className="aspect-square relative mb-4 rounded-lg overflow-hidden">
            <Image
                src={`/images/${p.image}`}  // public klasörü yolu
                alt={p.name}
                width={400}
                height={400}
                className="object-cover rounded-lg"
            />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{p.name}</h2>
            <p className="text-brand-gold font-bold text-lg ">₺{p.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
