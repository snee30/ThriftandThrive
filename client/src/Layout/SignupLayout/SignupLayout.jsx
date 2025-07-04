import React, { useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import Link for navigation
import { authState } from "../../GlobalState/authState";

const SignInLayout = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const { signup } = authState();

  const { role } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Clear error if passwords match
    setError("");

    // Log form data
    signup(
      {
        name: fullName,
        email: email,
        password: password,
        phone: phoneNumber,
        address: address,
      },
      role
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-beige to-sage w-full py-32">
      <div className="bg-sage gap-3 p-8 rounded-xl shadow-2xl flex flex-col justify-center items-center w-full max-w-md">
        <div>
          <h1 className="text-xl text-center font-bold text-darkbrown">
            Sign Up as a <span className="capitalize">{role}</span>
          </h1>
        </div>
        <div>
          <img
            src="/logo-nobg.png"
            alt="logo"
            className="size-20 mx-auto bg-cream rounded-full"
          />
        </div>
        <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="ml-1 text-darkbrown">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white p-2 rounded-lg placeholder:text-base"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="ml-1 text-darkbrown">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-white p-2 rounded-lg placeholder:text-base"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="ml-1 text-darkbrown">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white p-2 rounded-lg placeholder:text-base"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="ml-1 text-darkbrown">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white p-2 rounded-lg placeholder:text-base"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="ml-1 text-darkbrown">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white p-2 rounded-lg placeholder:text-base"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="ml-1 text-darkbrown">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white p-2 rounded-lg placeholder:text-base"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          {/* Submit Button */}
          <input
            type="submit"
            value="Sign Up"
            className="mt-5 bg-brown w-max self-center p-3 px-8 text-cream rounded-lg hover:bg-darkbrown cursor-pointer"
          />
        </form>

        {/* Add a link to the login page */}
        <p className="mt-4 text-sm text-darkbrown">
          Already have an account?{" "}
          <Link
            to={`/login/${role}`}
            className="text-forestgreen hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInLayout;
