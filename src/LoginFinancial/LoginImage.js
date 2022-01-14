import React, { Component } from "react";

class LoginImage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="signBack">
        <span className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            width="78"
            height="87"
            viewBox="0 0 78 87"
          >
            <defs>
              <clipPath id="clip-path">
                <rect
                  id="Rectangle_371"
                  data-name="Rectangle 371"
                  width="78"
                  height="87"
                  transform="translate(-2269 -5850)"
                  fill="#fff"
                  opacity="0.2"
                />
              </clipPath>
            </defs>
            <g
              id="logo"
              transform="translate(2269 5850)"
              clipPath="url(#clip-path)"
            >
              <g
                id="Group_1069"
                data-name="Group 1069"
                transform="translate(-3989.496 -5953.821)"
              >
                <path
                  id="Oval-3"
                  d="M37.529,6.955a38.144,38.144,0,0,0,6.084,75.8"
                  transform="translate(1701.713 146.92) rotate(-45)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="square"
                  strokeWidth="9"
                  fillRule="evenodd"
                />
                <path
                  id="Oval-3-2"
                  data-name="Oval-3"
                  d="M81.755,44.614A38.187,38.187,0,0,0,70.912,17.976"
                  transform="translate(1702.054 146.92) rotate(-45)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="square"
                  strokeWidth="9"
                  fillRule="evenodd"
                />
                <path
                  id="Path_435"
                  data-name="Path 435"
                  d="M.1,1.979l9.979-3.887-.031,31.94H31.026l-.031,9.953H10V44s-.037,5.375,7.8,7.348a15.406,15.406,0,0,0,11.313-1.856l6.127,6.252a26.852,26.852,0,0,1-22.372,3.5C-.248,53.378,0,44,0,44Z"
                  transform="translate(1744 108)"
                  fill="#fff"
                />
              </g>
            </g>
          </svg>
        </span>
        <span className="logoText">HealthCert</span>
      </div>
    );
  }
}

export default LoginImage;
