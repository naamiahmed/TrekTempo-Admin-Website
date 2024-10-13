import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HomePage from "../src/pages/SignUp/HomePage";
import Shop from "./pages/ForgotPwd/Shop";
import Root1 from "./pages/ForgotPwd/Root1";
import Root from "./pages/ForgotPwd/Root";
import Homepage1 from "./pages/ForgotPwd/Homepage1";
import Homepage2 from "./pages/SignIn/Homepage2";
import Body from "./pages/HomePage/Body/Body";
import AddPlaceForm from './pages/HomePage/Place/AddPlaceForm/AddPlaceForm';
import DataDisplay from "./pages/DisplayEvent/DisplayEvent";
import UploadForm from "./pages/UploadImage/UploadImage";


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
      case "/20":
        title = "";
        metaDescription = "";
        break;
      case "/21":
        title = "";
        metaDescription = "";
        break;
      case "/22":
        title = "";
        metaDescription = "";
        break
      case "/23":
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
      <Route path="/20" element={<Body />} />
      <Route path="/21" element={<AddPlaceForm />} />
      <Route path="/22" element={<DataDisplay />} /> 
      <Route path="/23" element={<UploadForm />} />

    </Routes>
  );

}
export default App;
 /* / is for first page (Sign up) */
 /* /19 is for last page (reset password) */
 /* /18 is for OTP typing page (Sign up) */
 /* /17 is for Check your mail popup page */
 /* /12 is for forget password (3rd page) */
 /* /16 is for Sign in page */
 /*/21 is for DisplayEvent page */
  /*/22 is for UploadImage page */
 