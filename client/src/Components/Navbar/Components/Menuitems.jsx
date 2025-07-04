import { Link, NavLink } from "react-router-dom";
import { items } from "./items";
import { authState } from "../../../GlobalState/authState";

export default function Menuitems() {
  const { role } = authState();
  return (
    <ul className=" flex flex-col lg:flex-row justify-center h-full gap-15 items-center">
      {/* Listing items of data */}
      {items.map((item, index) => (
        <li
          key={index}
          className="hover:text-[var(--darksage)] text-[var(--darkbrown)]"
        >
          <NavLink to={item.link}>{item.name}</NavLink>
        </li>
      ))}
      {(!role || role === "seller") && (
        <Link
          to={role === "seller" ? "/sell" : "/signup/seller"}
          className="bg-sage py-2 px-4 rounded-lg text-[var(--darkbrown)]"
        >
          {role === "seller" ? "Add a Product" : "Become a Seller"}
        </Link>
      )}
    </ul>
  );
}
