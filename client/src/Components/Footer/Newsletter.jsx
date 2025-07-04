import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual backend endpoint or email service integration
      const response = await fetch("https://your-backend-api.com/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setMessage("Subscription failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="p-[10px_20px] bg-[var(--cream)] flex justify-between flex-wrap items-center gap-4"
    >
      <div className="newsletter">
        <h4 className="text-2xl font-bold text-[#74512d] italic">
          Sign Up For a Sustainable Future
        </h4>
        <p className="text-sm font-semibold text-[var(--forestgreen)] mt-2">
          Get E-mail updates about our latest shop and special offers
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full md:w-[40%] min-w-[300px]"
      >
        <div className="flex flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email Address"
            required
            className="h-[3.125rem] px-5 w-full border border-transparent rounded-l outline-none bg-white"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[3.125rem] px-5 whitespace-nowrap bg-[#7bc0a3] text-white border border-transparent rounded-r hover:bg-[#6ba893] transition-colors"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>

      {message && (
        <div className="w-full text-center text-[var(--forestgreen)] mt-2">
          {message}
        </div>
      )}
    </section>
  );
};

export default Newsletter;
