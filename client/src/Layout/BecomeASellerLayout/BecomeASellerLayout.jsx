import { useState } from "react";
import SellerForm from "./SellerForm";

const BecomeASellerLayout = () => {
  const [activeTab, setActiveTab] = useState("guidelines"); // State to manage active tab
  const [showCommissionModal, setShowCommissionModal] = useState(false); // State for commission modal

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige to-sage w-full pt-30 pb-30 flex items-center justify-center ">
      {/* Main Container */}
      <div className="w-full max-w-3xl px-4">
        {" "}
        {/* Adjusted width */}
        {/* Tab Buttons */}
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setActiveTab("guidelines")}
            className={`px-8 py-3 rounded-lg text-lg font-semibold ${
              activeTab === "guidelines"
                ? "bg-brown text-cream"
                : "bg-sage text-darkbrown hover:bg-darkbrown hover:text-cream"
            } transition-colors duration-300`}
          >
            Guidelines
          </button>
          <button
            onClick={() => setActiveTab("sellerForm")}
            className={`px-8 py-3 rounded-lg text-lg font-semibold ${
              activeTab === "sellerForm"
                ? "bg-brown text-cream"
                : "bg-sage text-darkbrown hover:bg-darkbrown hover:text-cream"
            } transition-colors duration-300`}
          >
            Add a Product
          </button>
        </div>
        {/* Content Section */}
        <div className="bg-sage p-8  rounded-xl">
          {activeTab === "guidelines" && (
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Text on the Left */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-darkbrown mb-4">
                  Guidelines for Selling
                </h2>
                <p className="text-darkbrown">
                  Selling at Thrift & Thrive is easy and convenient.Simply
                  follow these steps:
                </p>
                <ul className="list-disc list-inside mt-4 text-darkbrown">
                  <li>Sort the items you would like to sell.</li>
                  <li>Ensure items are in good condition.</li>
                  <li>Pack the items securely.</li>
                  <li>Send them to us using our provided shipping label.</li>
                  <li>
                    Earn a decent passive income once your items are sold!
                  </li>
                </ul>
                <p className="mt-4 text-darkbrown">
                  Join the sellers who choose Thrift & Thrive to de-clutter
                  their closets and homes.
                </p>

                {/* Commission and Fees Button */}
                <button
                  onClick={() => setShowCommissionModal(true)}
                  className="mt-5 bg-darkbrown w-max self-center p-3 px-8 text-cream rounded-lg hover:bg-brown cursor-pointer"
                >
                  Commission and Fees
                </button>
              </div>

              {/* Image on the Right */}
              <div className="flex-1">
                <img
                  src="/other-images/ktakti.png" // Update this path
                  alt="Selling Guidelines"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          )}

          {activeTab === "sellerForm" && <SellerForm />}
        </div>
      </div>

      {/* Commission and Fees Modal */}
      {showCommissionModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-cream p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-darkbrown mb-4">
              Commission and Fees
            </h2>
            <p className="text-darkbrown">
              Here are the details about our commission and fees:
            </p>
            <ul className="list-disc list-inside mt-4 text-darkbrown">
              <li>We charge a 20% commission on every sale.</li>
              <li>There are no upfront fees for listing your products.</li>
              <li>Shipping costs are covered by the buyer.</li>
              <li>
                Payments are processed securely and paid out after your items
                get sold.
              </li>
            </ul>
            <button
              onClick={() => setShowCommissionModal(false)}
              className="mt-5 bg-brown w-max self-center p-3 px-8 text-cream rounded-lg hover:bg-darkbrown cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BecomeASellerLayout;
