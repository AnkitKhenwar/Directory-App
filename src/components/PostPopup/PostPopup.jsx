import React, { useState } from "react";
import PropTypes from "prop-types";
import "./PostPopup.css"; // Import your CSS file

const PostPopup = ({ title, content, isPopupOpen, setPopupOpen }) => {
  return (
    <div styleName="popop-box">
      {isPopupOpen && (
        <div
          className="popup-container"
          onClick={() =>
            setPopupOpen((prev) => {
              return {
                ...prev,
                isPopupOpen: false,
              };
            })
          }
        >
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="close-btn"
              onClick={() =>
                setPopupOpen((prev) => {
                  return {
                    ...prev,
                    isPopupOpen: false,
                  };
                })
              }
            >
              &times;
            </span>
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPopup;
