import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/mainLayout/MainLayout";
import HomePage from "../pages/homepage/Homepage";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Routing;