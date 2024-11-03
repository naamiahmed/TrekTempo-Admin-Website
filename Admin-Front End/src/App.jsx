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
import AddPlaceForm from "./pages/HomePage/Place/AddPlaceForm/AddPlaceForm";
import DataDisplay from "./pages/DisplayEvent/DisplayEvent";
import AcceptedEvent from "./pages/DisplayEvent/AcceptedEvent/AcceptedEvent";
import RequestedPlaces from "./pages/HomePage/Place/RequstedPlaces/RequestedPlaces";
import AllPlaces from "./pages/HomePage/AddedPlaces/AllPlaces/Allplaces";
import AddingForm from "./pages/HomePage/AddNewPlace/AddingForm/AddingForm";
import DisplayAccommodation from "./pages/HomePage/Accommodation/ReqAccommodation";
import AddEventForm from "./pages/HomePage/AddEventForm/AddEventForm";
import AddAccomadationForm from"./pages/HomePage/AddAccomadationForm/AddAccommodationForm";



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
      // case "/16":
      //   title = "";
      //   metaDescription = "";
      //   break;
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
        break;
      case "/23":
        title = "";
        metaDescription = "";
        break;
      case "/24":
        title = "";
        metaDescription = "";
        break;
        case "/25":
        title = "";
        metaDescription = "";
        break;
        case "/26":
        title = "";
        metaDescription = "";
        break;

        case "/add-event":
          title = "Add Event";
          metaDescription = "Add a new event to the platform";
          break;

          case "/add-accommodation":
          title = "Add Accomodation Form";
          metaDescription = "Add a new accomodation to the platform";
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
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route path="/19" element={<Shop />} />
      <Route path="/18" element={<Root1 />} />
      <Route path="/17" element={<Root />} />

      <Route path="/12" element={<Homepage1 />} />
      <Route path="/" element={<Homepage2 />} />
      <Route path="/20" element={<Body />} />
      <Route path="/21" element={<RequestedPlaces />} />
      <Route path="/22" element={<DataDisplay />} />
      <Route path="/23" element={<AcceptedEvent />} />
      <Route path="/24" element={<AddPlaceForm />} />
      <Route path="/25" element={<AllPlaces />} />
      <Route path="/26" element={<AddingForm />} />
      <Route path="/27" element={<DisplayAccommodation />} />
      <Route path="/add-event" element={<AddEventForm />} />
      <Route path="/add-accommodation" element={<AddAccomadationForm />} />
   
      
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
/*/23 is for AcceptedEvent page */
/*/24 is for AddPlaceForm page */
/*/25 is for AllPlaces page */
/*/26 is for AddingForm page */   
/*/27 is for DisplayAccommodation page */

