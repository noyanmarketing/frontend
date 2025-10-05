interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Ürün Detayı #{id}</h1>
      <p>Fiyat: ₺{id}99</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Sepete Ekle
      </button>
    </main>
  );
}
