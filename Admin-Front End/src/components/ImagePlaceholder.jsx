/* This is for 1st page(Sign up) */
import PropTypes from "prop-types";
import "./ImagePlaceholder.css";

const ImagePlaceholder = ({ className = "" }) => {
  return (
    <div className={`image-placeholder ${className}`}>
      
      <div className="feature-icons-row-parent">
       
        <img className="frame-child30" alt="" src="/group-3341@2x.png" />
        <img className="frame-child31" alt="" src="/group-3351@2x.png" />
      </div>
      <img
        className="image-2-icon"
        loading="lazy"
        alt=""
        src="/image-2@2x.png"
      />
    </div>
  );
};

ImagePlaceholder.propTypes = {
  className: PropTypes.string,
};

export default ImagePlaceholder;
