import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects } from "./pages";

function HomeLoader() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== "/") return;
    const existing = document.getElementById("html-loader");
    if (existing) return;
    const el = document.createElement("div");
    el.id = "html-loader";
    const box = '<div class="box"><div></div><div></div><div></div><div></div></div>';
    el.innerHTML = '<div class="boxes">' + box + box + box + box + '</div>';
    document.body.prepend(el);
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 600);
      }, 300);
    });
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <main className='bg-slate-300/20'>
      <Router>
        <HomeLoader />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/*'
            element={
              <>
                <Routes>
                  <Route path='/about' element={<About />} />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/contact' element={<Contact />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
