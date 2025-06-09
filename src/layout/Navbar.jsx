import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/instruments">
        <img src="steam-locomotive-train-vintage-style.png" alt="train logo" />
        <h1>Orchestration Station</h1>
      </NavLink>
      <nav>
        <NavLink to="/instruments">Individual Instruments</NavLink>
        <NavLink to="/bibliography">Bibliography</NavLink>
        {token ? (
          <>
            <NavLink to="/account">Account</NavLink>
            <a onClick={() => logout()}>Log out</a>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
