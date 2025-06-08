import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/instruments">
        <p>Orchestration Station</p>
      </NavLink>
      <nav>
        <NavLink to="/instruments">Indivisual Instruments</NavLink>
        <NavLink to="/bibliography">Bibliography</NavLink>
        {token ? (
          <>
            <NavLink to="/account">Account</NavLink>
            <a onClick={() => logout()}>Log out</a>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
