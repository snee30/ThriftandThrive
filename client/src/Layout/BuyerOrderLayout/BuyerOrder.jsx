// GroupedOrderList.tsx
import { useState, useEffect } from "react";
import { useBuyerStore } from "../../GlobalState/useBuyerState";

function BuyerOrder() {
  const { groupedOrders, getOrders } = useBuyerStore();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="pt-40 px-4  bg-sage min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-forestgreen">
        Your Orders
      </h2>
      <div className="space-y-6 max-w-4xl mx-auto">
        {Object.entries(groupedOrders).map(([date, items]) => (
          <OrderGroup key={date} date={date} items={items} />
        ))}
      </div>
    </div>
  );
}

function OrderGroup({ date, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-cream shadow-xl rounded-xl border border-gray-200">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-[#F2E9DC] transition rounded-t-xl"
      >
        <h3 className="text-lg font-semibold text-[#5C5470]">
          Order from {date}
        </h3>
        <span className="text-[#FF8360] text-xl">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <ul className="px-6 pb-4 space-y-4 bg-[#FDFDFD] rounded-b-xl">
          {items.map((item) => (
            <li
              key={item._id}
              className="flex gap-4 items-center bg-[#FAF6F0] p-3 rounded-lg hover:shadow-md transition"
            >
              <img
                src={item.product.productImages[0].url}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-md border"
              />
              <div className="flex-1">
                <p className="font-medium text-[#2D2A32]">
                  {item.product.name}
                </p>
                <p className="text-sm text-[#7A7A7A]">Rs. {item.price}</p>
                <p className="text-sm">
                  <span className="font-semibold text-[#5C5470]">Status:</span>{" "}
                  <span
                    className={`${
                      item.delivery_status === "Delivered"
                        ? "text-green-600"
                        : item.delivery_status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.delivery_status}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuyerOrder;
