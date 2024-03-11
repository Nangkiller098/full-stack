import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./page/Homepage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import RouteNotFoundPage from "./page/RouteNotFoundPage";
import CategoryPage from "./page/CategoryPage";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/customer" element={<h1>customer</h1>} />
            <Route path="/employee" element={<h1>employee</h1>} />
            <Route path="/product" element={<h1>product</h1>} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="*" element={<RouteNotFoundPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
