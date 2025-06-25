// src/routes/AppRoutes.tsx
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../Components/Loaders/Loader";
import Layout from "../Components/Layout";

const Home = lazy(() => import("../Pages/HomePage/Home"));
const NotFound = lazy(
  () => import("../Pages/StatusPages/NotFoundPage/NotFound")
);

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  </Router>
);

export default AppRoutes;
