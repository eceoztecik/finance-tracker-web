import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addTransaction } from "../features/transactions/transactionSlice";
export default function TransactionForm() {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Form boş mu kontrol et
    if (!amount || !category) {
      alert("Miktar ve kategori zorunlu!");
      return;
    }

    dispatch(
      addTransaction({
        id: Date.now().toString(),
        type: type,
        amount: Number(amount),
        category: category,
        description: description,
        date: date,
      })
    );

    // Formu temizle
    setAmount("");
    setCategory("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Yeni İşlem Ekle</h2>
      <div className="mb-4">
        {" "}
        <label className="block text-sm font-extrabold mb-2">Tip</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="income"
              checked={type === "income"}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
              className="mr-2"
            />
            Gelir
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value as "income" | "expense")}
              className="mr-2"
            />
            Gider
          </label>
        </div>
        {/* Miktar */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Miktar (₺)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {/* Kategori */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Seçiniz</option>
            <option value="Maaş">Maaş</option>
            <option value="Yemek">Yemek</option>
            <option value="Ulaşım">Ulaşım</option>
            <option value="Alışveriş">Alışveriş</option>
          </select>
        </div>
        {/* Açıklama */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Açıklama (Opsiyonel)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Açıklama ekleyin"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {/* Tarih */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tarih</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition"
        >
          Ekle
        </button>
      </div>
    </form>
  );
}
