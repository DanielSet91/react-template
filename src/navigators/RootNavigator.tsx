import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/mainLayout/MainLayout";
import HomePage from "../pages/homepage/Homepage";

function RootNavigator() {
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

export default RootNavigator;