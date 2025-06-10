import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";

import Login from "./auth/Login";
import Register from "./auth/Register";
import InstrumentsPage from "./instruments/InstrumentsPage";
import InstrumentsDetail from "./instruments/InstrumentsDetail";
import Error404 from "./Error404";
import Account from "./instruments/Account";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<InstrumentsPage />} />
        <Route path="/instruments" element={<InstrumentsPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/instruments/:id" element={<InstrumentsDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
