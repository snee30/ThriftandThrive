import React, { useState } from "react";
import footerData from "./footerData";
import { FaInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";

const Content = () => {
  const [activePopup, setActivePopup] = useState(null);

  // Content for each popup
  const popupContents = {
    "Privacy Policy": (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-darkbrown mb-4">
          Privacy Policy
        </h2>
        <div className="text-darkbrown space-y-4">
          <p>
            At Thrift and Thrive, we are committed to protecting your privacy.
            This policy outlines how we collect, use, and safeguard your
            personal information.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              We collect only necessary information to process your orders
            </li>
            <li>
              Your data is never shared with third parties without consent
            </li>
            <li>We use secure encryption for all transactions</li>
            <li>You can request account deletion at any time</li>
          </ul>
          <p>For more details, please contact us at thrift&thrive@gmail.com</p>
        </div>
      </div>
    ),
    FAQs: (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-darkbrown mb-4">
          Frequently Asked Questions
        </h2>
        <div className="text-darkbrown space-y-6">
          <div>
            <h3 className="font-semibold text-lg">How do I place an order?</h3>
            <p>
              Simply browse our collection, add items to your cart, and proceed
              to checkout.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              What payment methods do you accept?
            </h3>
            <p>
              We accept cash on hand as well as online payment for both inside
              and outside Kathmandu valley.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              What is your return policy?
            </h3>
            <p>
              Currently we are offering return facility inside Kathmandu valley
              within 2 days of purchase.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              How long does shipping take?
            </h3>
            <p>Typically 1-3 business days.</p>
          </div>
        </div>
      </div>
    ),
    "Contact Us": (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-darkbrown mb-4">Contact Us</h2>
        <div className="text-darkbrown space-y-4">
          <div>
            <h3 className="font-semibold">Email:</h3>
            <p>thrift&thrive@gmail.com</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone:</h3>
            <p>+977 9846669386</p>
          </div>
          <div>
            <h3 className="font-semibold">Address:</h3>
            <p>Lalitpur, Nepal</p>
          </div>
          <div>
            <h3 className="font-semibold">Business Hours:</h3>
            <p>9:00 - 23:00, Sun - Sat</p>
          </div>
          <div className="pt-4">
            <h3 className="font-semibold">Social Media:</h3>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.instagram.com/thrift.and._.thrive"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  size={24}
                  className="text-darkbrown hover:text-brown"
                />
              </a>
              <a
                href="https://www.tiktok.com/@your_username"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillTikTok
                  size={24}
                  className="text-darkbrown hover:text-brown"
                />
              </a>
              <FaFacebookSquare
                size={24}
                className="text-darkbrown hover:text-brown cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <footer className="p-10 bg-cream relative">
      {/* Popup Modal */}
      {activePopup && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[1000]">
          {" "}
          {/* Increased z-index */}
          <div className="bg-cream p-6 rounded-lg shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto z-[1001]">
            {" "}
            {/* Even higher z-index for content */}
            {popupContents[activePopup]}
            <button
              onClick={() => setActivePopup(null)}
              className="mt-4 bg-brown w-full p-2 text-[var(--cream)] rounded-lg hover:bg-[var(--darkbrown)] cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-around items-start flex-wrap gap-10">
        <div>
          <img
            className="logo max-w-[120px] h-auto size-30s"
            src="/logo-nobg.png"
            alt="Logo"
          />
        </div>
        <div className="flex flex-col gap-2 text-[var(--darkbrown)]">
          <h4 className="text-lg font-bold">Contact</h4>
          <p>
            <strong>Address:</strong> Lalitpur, Nepal
          </p>
          <p>
            <strong>Phone:</strong> +977 9846669386
          </p>
          <p>
            <strong>Hours:</strong> 9:00 - 23:00, Sun - Sat
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold text-[var(--darkbrown)]">
            Connect with us
          </h4>
          <div className="icon flex mt-2 gap-4">
            <a
              href="https://www.instagram.com/thrift.and._.thrive"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                size={30}
                className="hover:text-forestgreen transition-colors duration-200 text-darkbrown"
              />
            </a>
            <a
              href="https://www.tiktok.com/@your_username"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillTikTok
                size={30}
                className="hover:text-forestgreen transition-colors duration-200 text-darkbrown"
              />
            </a>
            <FaFacebookSquare
              size={30}
              className="hover:text-forestgreen transition-colors duration-200 text-darkbrown"
            />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-[var(--darkbrown)]">About</h4>
          <div className="flex gap-2 flex-col">
            {footerData.map((link, index) => (
              <button
                key={index}
                onClick={() => setActivePopup(link.name)}
                className="hover:text-forestgreen transition-colors duration-200 text-darkbrown text-left"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-5 text-green-200" />
      <div className="copyright text-center text-[var(--darkbrown)]">
        <p>© 2024, Thrift and Thrive - T&T</p>
      </div>
    </footer>
  );
};

export default Content;
