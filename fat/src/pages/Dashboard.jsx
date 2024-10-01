import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <FrameComponent1 />
      <div className="jammessage-alt" />
      <div className="send-plane-icon-wrapper">
        <img className="send-plane-icon" loading="lazy" alt="" />
      </div>
      <div className="trend-icon">
        <h1 className="travel-to-the-container">
          <p className="travel-to-the">{`Travel to the `}</p>
          <p className="travel-to-the">{`any corner `}</p>
          <p className="travel-to-the">
            <span>of</span>
            <span className="span">{` `}</span>
            <span className="the-sri-lanka">the sri Lanka</span>
          </p>
        </h1>
      </div>
      <main className="lets-iconssetting-fill-parent">
        <img
          className="lets-iconssetting-fill"
          loading="lazy"
          alt=""
          src="/letsiconssettingfill.svg"
        />
        <img className="mirissa-1-1-icon" alt="" src="/mirissa1-1@2x.png" />
        <img className="header-icon" alt="" src="/header.svg" />
        <div className="frame-child" />
        <div className="frame-item" />
        <div className="main-menu" />
        <div className="frame-inner" />
        <div className="ellipse-div" />
        <div className="frame-child1" />
        <div className="frame-child2" />
        <div className="frame-child3" />
        <div className="frame-child4" />
        <div className="frame-child5" />
        <img className="rectangle-icon" alt="" />
        <img className="frame-child6" alt="" src="/rectangle-823.svg" />
      </main>
      <FrameComponent />
      <div className="explore-the-beautiful-sri-lank-wrapper">
        <div className="explore-the-beautiful-container">
          <span>
            <span>Explore the</span>
            <span className="beautiful">{` `}</span>
          </span>
          <span className="beautiful">
            <b>Beautiful</b>
            <span className="span2">{` `}</span>
          </span>
          <span className="sri-lanka">
            <b>Sri Lanka</b>
            <span className="span2">!</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
