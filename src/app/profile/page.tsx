export default function ProfilePage() {
  const user = {
    name: "Tolga Noyan",
    email: "tolga@example.com",
    orders: [
      { id: 1, product: "Ürün 1", status: "Kargoda" },
      { id: 2, product: "Ürün 2", status: "Teslim edildi" },
    ],
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Profilim</h1>
      <p>Ad Soyad: {user.name}</p>
      <p>Email: {user.email}</p>

      <h2 className="mt-4 text-xl">Siparişlerim</h2>
      <ul className="list-disc pl-5">
        {user.orders.map((o) => (
          <li key={o.id}>
            {o.product} - {o.status}
          </li>
        ))}
      </ul>
    </main>
  );
}
