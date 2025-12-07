import { useAppDispatch, useAppSelector } from "./store/hooks";
import TransactionForm from "./components/TransactionForm";
import { deleteTransaction } from "./features/transactions/transactionSlice";

function App() {
  const { items, totalIncome, totalExpense } = useAppSelector(
    (state) => state.transactions
  );
  const dispatch = useAppDispatch();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Finance Tracker 💰
        </h1>

        <TransactionForm />

        {/* Balance Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm text-green-600">Gelir</p>
            <p className="text-2xl font-bold text-green-700">{totalIncome} ₺</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-sm text-red-600">Gider</p>
            <p className="text-2xl font-bold text-red-700">{totalExpense} ₺</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Bakiye</p>
            <p className="text-2xl font-bold text-blue-700">
              {totalIncome - totalExpense} ₺
            </p>
          </div>
        </div>

        {/* Transaction List */}
        <div>
          <h2 className="text-xl font-bold mb-4">İşlemler ({items.length})</h2>
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-4 rounded mb-2 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.category}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <p
                  className={`font-bold ${
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}
                  {item.amount} ₺
                </p>
                <button
                  onClick={() => dispatch(deleteTransaction(item.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
