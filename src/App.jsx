import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Verify from "./pages/Verify.jsx";
import Batch from "./pages/Batch.jsx";
import Demo from "./pages/Demo.jsx";
import NotFound from "./pages/NotFound.jsx";

// To add a page: create it in src/pages, then add one <Route> here and one link in components/Layout.jsx
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="verify" element={<Verify />} />
        <Route path="batch" element={<Batch />} />
        <Route path="demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
