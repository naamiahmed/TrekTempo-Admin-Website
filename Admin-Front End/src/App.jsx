import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Shop from "./pages/Shop";
import Root1 from "./pages/Root1";
import Root from "./pages/Root";
import Homepage1 from "./pages/Homepage1";
import Homepage2 from "./pages/Homepage2";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/19":
        title = "";
        metaDescription = "";
        break;
      case "/18":
        title = "";
        metaDescription = "";
        break;
      case "/17":
        title = "";
        metaDescription = "";
        break;
      case "/12":
        title = "";
        metaDescription = "";
        break;
      case "/16":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/19" element={<Shop />} />
      <Route path="/18" element={<Root1 />} />
      <Route path="/17" element={<Root />} />
      <Route path="/12" element={<Homepage1 />} />
      <Route path="/16" element={<Homepage2 />} />
    </Routes>
  );
}
export default App;
