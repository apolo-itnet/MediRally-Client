import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  .button {
    display: block;
    position: relative;
    width: 76px;
    height: 76px;
    margin: 0;
    overflow: hidden;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border: 0;
  }

  .button:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 7px;
    border: 3px solid black;
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
      transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
  }

  .button:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 7px;
    border: 4px solid #599a53;
    transform: scale(1.3);
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
  }

  .button:hover:before,
  .button:focus:before {
    opacity: 0;
    transform: scale(0.7);
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .button:hover:after,
  .button:focus:after {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
      transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
  }

  .button-box {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
  }

  .button-elem {
    display: block;
    width: 30px;
    height: 30px;
    margin: 24px 18px 0 22px;
    transform: rotate(360deg);
    fill: #f0eeef;
  }

  .button:hover .button-box,
  .button:focus .button-box {
    transition: 0.4s;
    transform: translateX(-69px);
  }
`;

const ArrowBtn = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <div className="button-box">
          <span className="button-elem">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow-icon"
            >
              <path
                fill="black"
                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              />
            </svg>
          </span>
          <span className="button-elem">
            <svg
              fill="black"
              viewBox="0 0  24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow-icon"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </span>
        </div>
      </button>
    </StyledWrapper>
  );
};

export default ArrowBtn;

