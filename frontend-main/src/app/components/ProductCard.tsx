import Link from "next/link";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
}

export default function ProductCard({ id, name, price }: ProductCardProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="border rounded-lg shadow p-4 hover:shadow-lg transition"
    >
      <h2 className="font-semibold">{name}</h2>
      <p className="text-gray-600">₺{price}</p>
    </Link>
  );
}
