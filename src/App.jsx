import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";

import Login from "./auth/Login";
import Register from "./auth/Register";
import InstrumentsPage from "./instruments/InstrumentsPage";
import InstrumentDetail from "./instruments/InstrumentDetail";
import Error404 from "./Error404";
import Account from "./instruments/Account";
import About from "./About/about";
import Biblio from "./About/bibliography";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<InstrumentsPage />} />
        <Route path="/instruments" element={<InstrumentsPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/instruments/:id" element={<InstrumentDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/bibliography" element={<Biblio />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
