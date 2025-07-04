import { Link } from "react-router-dom";
import Cart from "./Cart";
import { authState } from "../../../GlobalState/authState";

const LoginSignup = () => {
  const { user, role, logout } = authState();

  return (
    <div className="flex flex-row gap-5 items-center justify-center h-full text-darkbrown ">
      {user ? (
        <div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="m-1 flex flex-col items-center justify-center"
            >
              <img
                src="/other-images/profile.png"
                className="size-13 rounded-full"
              />
              <p className="text-sm">
                {user.name.split(" ")[0]} [{role}]
              </p>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-sage rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link
                  to={
                    role === "admin"
                      ? "/admin/dashboard"
                      : role === "seller"
                      ? "/seller/products"
                      : "/buyer/orders"
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li onClick={logout}>
                <div>Logout</div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn text-brown m-2 bg-sage border-0 p-3 rounded-lg"
            >
              Login/Signup
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-sage rounded-box z-1 w-52 p-2 shadow-sm text-brown"
            >
              <li>
                <Link to={"/login/buyer"}>As a Buyer</Link>
              </li>
              <li>
                <Link to={"/login/seller"}>As a Seller</Link>
              </li>
              <li>
                <Link to={"/login/admin"}>As a Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <Cart />
    </div>
  );
};
export default LoginSignup;
