import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

const Home = lazy(() => import("./pages/Home"));
const Audit = lazy(() => import("./pages/Audit"));
const SharedResult = lazy(() => import("./pages/SharedResult"));

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
        <Navbar />
        <main>
          <Suspense
            fallback={
              <div className="flex min-h-[50vh] items-center justify-center px-6">
                <div className="glass-card rounded-[28px] px-8 py-6 text-center text-stone-600">
                  Loading experience...
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="/share/:publicId" element={<SharedResult />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
