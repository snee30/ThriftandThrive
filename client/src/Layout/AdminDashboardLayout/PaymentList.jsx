import { useEffect } from "react";
import { useAdminStore } from "../../GlobalState/useAdminStore";

export default function PaymentList() {
  const { pendingPayments, getPendingPayments } = useAdminStore();

  useEffect(() => {
    getPendingPayments();
  }, [getPendingPayments]);

  return (
    <div className="min-h-screen pt-38 px-6 bg-[var(--sage)]">
      <h1 className="text-2xl font-bold text-[var(--forestgreen)] mb-6">
        Pending Payments
      </h1>
      <div className="grid gap-6">
        {pendingPayments.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-6 bg-white rounded-xl shadow">
            No Pending Payments
          </div>
        ) : (
          pendingPayments.map((payment) => (
            <PaymentCard key={payment._id} payment={payment} />
          ))
        )}
      </div>
    </div>
  );
}

function PaymentCard({ payment }) {
  const { acceptPayment, loadingPaymentAccept } = useAdminStore();

  const handleAcceptPayment = () => {
    acceptPayment(payment._id);
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-md hover:shadow-lg transition-all border border-[var(--lightborder)]">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm text-gray-500">
          Payment by:{" "}
          <span className="text-base font-semibold text-gray-800">
            {payment.buyer.name}
          </span>
        </h2>
      </div>

      <div className="text-[var(--forestgreen)] text-xl font-bold mb-1">
        Rs. {payment.amount.toLocaleString()}
      </div>

      <div className="text-sm text-gray-600 leading-relaxed">
        Method: <span className="capitalize">{payment.method}</span> <br />
        Txn ID:{" "}
        <span className="font-mono text-gray-700">
          {payment.transactionId}
        </span>{" "}
        <br />
        Paid At:{" "}
        <span className="text-gray-700">
          {new Date(payment.paid_at).toLocaleString()}
        </span>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAcceptPayment}
          disabled={loadingPaymentAccept}
          className={`text-white px-5 py-2 rounded-xl text-sm font-medium bg-[var(--forestgreen)] hover:bg-green-700 transition ${
            loadingPaymentAccept ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Accept Payment
        </button>
      </div>
    </div>
  );
}
