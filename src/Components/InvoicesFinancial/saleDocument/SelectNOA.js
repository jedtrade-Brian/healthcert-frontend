import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "../../CreateDocument/CreateDocument.css";


class SelectNOA extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
    };
    this.enableButtons = this.enableButtons.bind(this);
  }
  componentDidMount() {
    this.renderTemplateImgUrl(this.props.type);
  }

  renderTemplateImgUrl = type => {
    
  };

  goToSalesQuotation = () => {
    this.props.handleNext();
  };
  importFile = () => {};
  enableButtons(e) {
    let target = e.currentTarget;
    target.classList.toggle("selected");
    return e.currentTarget.classList.value === "saleTemplateImg" ||
      e.currentTarget.classList.value === "saleTemplateImgBorder selected"
      ? this.setState({ isDisabled: true })
      : e.currentTarget.classList.value === "saleTemplateImg selected" ||
        e.currentTarget.classList.value === "saleTemplateImgBorder"
      ? this.setState({ isDisabled: false })
      : "";
  }
  render() {
    return (
      <div>
        <div className="saleTempImgBox">
          <h3>Select NOA</h3>
          <div
            className={
              this.state.isDisabled === false
                ? "saleTemplateImgBorder"
                : "saleTemplateImg"
            }
            onClick={this.enableButtons}
          >
          </div>
        </div>
        <div className="saleAction">
          <Button
            disabled={this.state.isDisabled}
            className={
              this.state.isDisabled === true ? "disabledcancel" : "cancelBtn"
            }
          >
            BACK
          </Button>
          <Button
            disabled={this.state.isDisabled}
            className={
              this.state.isDisabled === true ? "disabledmanual" : "manualBtn"
            }
          >
            PROCEED
          </Button>
        </div>
      </div>
    );
  }
}
export default SelectNOA;
