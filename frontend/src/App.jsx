import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./component/Navbar";

import Footer from "./component/Footer";

// Lazy-loaded pages — each becomes its own JS chunk, only downloaded when
// the user actually navigates to that route.
const Home = lazy(() => import("./page/Home"));
const Services = lazy(() => import("./page/Collection"));
const Membership = lazy(() => import("./page/About"));
const NewArrivals = lazy(() => import("./page/New"));
const Contact = lazy(() => import("./page/Contact"));
const Gallery = lazy(() => import("./page/Gallery"));

// Shown briefly while a page chunk is downloading.
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-2 border-[#E8D9C0] border-t-[#C8A96E] rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative max-w-md mx-auto min-h-screen bg-[#FAF7F2] md:max-w-none">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Services />} />
            <Route path="/about" element={<Membership />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Suspense>
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;