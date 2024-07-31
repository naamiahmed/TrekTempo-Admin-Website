/* First page (Sign up) */
import ImagePlaceholder from "../components/ImagePlaceholder";
import LoginForm from "../components/LoginForm";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <main className="sign-up1">
        <div className="image-container">
          <div className="image-container-child" />
          <ImagePlaceholder />
        </div>
        <div className="content1">
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
