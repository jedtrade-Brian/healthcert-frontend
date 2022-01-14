import React, { Component } from "react";

class LoginImage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="signBack">
        <span
          className="logo"
          onClick={() => {
            this.props.history.push("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height=""
            viewBox="0 0 543 602"
          >
            <path
              id="Color_Fill_1"
              fill="#fff"
              data-name="Color Fill 1"
              className="cls-1"
              d="M234,3c26,1.872,65.051,54.05,82,71,47.63,47.634,108.52,91.129,135,159,35.527,91.06-20.658,214.785-93,231-19.873,4.454-67.266-43.775-60-64,4.9-13.636,23.266-17,34-25,26.076-19.432,48.022-67.265,31-111-11.838-30.416-37.736-49.74-59-71l-67-69L204,90c-5.745-10.2,6.515-69.353,13-78C221.005,6.659,227.542,6.079,234,3ZM189,136c20.278,0.184,63.659,38.3,56,60-4.988,14.133-23.119,17.579-34,26-23.163,17.927-46.131,59.292-33,103,8.9,29.638,28.838,45.839,48,65L340,506c12.146,18.2-13.834,81.284-30,85-18.6,4.276-26.419-11.419-34-19l-70-70c-36.353-36.356-83.242-70.923-105-121-32.593-75.013-8.672-177.162,41-217C156.607,152.285,171.376,145.567,189,136Z"
            />
          </svg>
        </span>
        <span className="logoText">HealthCert</span>
      </div>
    );
  }
}

export default LoginImage;
