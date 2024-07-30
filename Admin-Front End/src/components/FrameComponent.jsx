import { useMemo } from "react";
import PropTypes from "prop-types";
import "./FrameComponent.css";

const FrameComponent = ({ className = "", propAlignSelf, propWidth }) => {
  const frameDivStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      width: propWidth,
    };
  }, [propAlignSelf, propWidth]);

  return (
    <div
      className={`verification-code-group ${className}`}
      style={frameDivStyle}
    >
      <div className="verification-code1">
        <div className="code-input">
          <div className="input-dots" />
          <div className="input-dots1" />
          <div className="input-dots2" />
          <div className="input-dots3" />
          <div className="input-dots4" />
          <div className="input-dots5" />
          <div className="input-dots6" />
          <div className="input-dots7" />
          <div className="input-dots8" />
          <div className="input-dots9" />
        </div>
      </div>
      <button className="send-button1">
        <div className="send-button-child" />
        <b className="send1">SEND</b>
      </button>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,

  /** Style props */
  propAlignSelf: PropTypes.any,
  propWidth: PropTypes.any,
};

export default FrameComponent;
