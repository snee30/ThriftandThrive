import { useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import Link for navigation
import { authState } from "../../GlobalState/authState";

const LoginLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { role } = useParams();

  const { login } = authState();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      {
        email: email,
        password: password,
      },
      role
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-beige to-sage w-full pt-20">
      <div className="bg-sage gap-3 p-8 rounded-xl shadow-2xl flex flex-col justify-center items-center w-full max-w-md text-darkbrown">
        <div>
          <h1 className="text-xl text-center font-bold text-darkbrown">
            Login as a <span className="capitalize">{role}</span>
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
            />
          </div>
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
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="mt-5 bg-brown w-max self-center p-3 px-8 text-cream rounded-lg hover:bg-darkbrown cursor-pointer"
          />
        </form>

        {role !== "admin" && (
          <p className="mt-4 text-sm text-darkbrown">
            Do not have an account?{" "}
            <Link
              to={`/signup/${role}`}
              className="text-forestgreen hover:underline"
            >
              Sign Up As a <span className="capitalize">{role}</span>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginLayout;
