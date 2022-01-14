import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import '../../CreateDocument/CreateDocument.css';
import './investorSchedule.css';
import InvestorTemplate from './InvestorTemplate';
import { Upload } from 'antd';
import { ExcelRenderer } from 'react-excel-renderer';
import { messagePopup } from '../../../services/messagePopupService';

class SelectInvestorTemplate extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
    };
    this.enableButtons = this.enableButtons.bind(this);
  }

  onCancel() {
    this.props.onCancel()
  }

  fileHandler = (fileList) => {
    let fileObj = fileList;
    if (!fileObj) {
      return false;
    }
    console.log('fileObj.type:', fileObj.type);
    // console.log("fileObj:", fileObj);

    if (
      !(
        fileObj.type === 'application/vnd.ms-excel' ||
        fileObj.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        fileObj.type === ''
      )
    ) {
      return false;
    }
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== 'undefined') {
            // console.log('row',row);
            newRows.push({
              invtId: row[0],
              invtCpy: row[1],
              invtPercent: row[2],
              transBrief: row[3],
              transNo: row[4],
            });
          }
        });
        if (newRows.length === 0) {
          messagePopup('', 'Please enter valid file', 'error');
          return false;
        } else {
          this.props.handleNext(newRows);
        }
      }
    });
    return false;
  };

  enableButtons(e) {
    let target = e.currentTarget;
    target.classList.toggle('selected');
    return e.currentTarget.classList.value === 'saleTemplateImg' ||
      e.currentTarget.classList.value === 'saleTemplateImgBorder selected'
      ? this.setState({ isDisabled: true })
      : e.currentTarget.classList.value === 'saleTemplateImg selected' ||
        e.currentTarget.classList.value === 'saleTemplateImgBorder'
      ? this.setState({ isDisabled: false })
      : '';
  }
  render() {
    return (
      <div>
        <div className='saleTempImgBox'>
          <h3>
            {this.props.data
              ? 'Review Investor Template'
              : 'Select Investor Template'}
          </h3>
          <div
            className={
              this.state.isDisabled === false
                ? 'saleTemplateImgBorder'
                : 'saleTemplateImg'
            }
            style={{ padding: '2px' }}
            onClick={!this.props.data ? this.enableButtons : undefined}
          >
            <InvestorTemplate data={this.props.data} purchaseDate={new Date()}/>
          </div>
        </div>
        <div className='saleAction'>
          <Button
            disabled={this.state.isDisabled}
            onClick={() => this.onCancel()}
            className={
              this.state.isDisabled === true ? 'disabledcancel' : 'cancelBtn'
            }
          >
            {this.props.data ? 'AMEND' : 'CANCEL'}
          </Button>
          {this.props.data ? (
            <Button
              disabled={this.state.isDisabled}
              onClick={() => this.props.handleNext()}
              className={
                this.state.isDisabled === true ? 'disabledmanual' : 'manualBtn'
              }
            >
              NEXT DOCUMENT
            </Button>
          ) : (
            <>
              <Upload
                name='file'
                beforeUpload={this.fileHandler}
                style={{ marginBottom: '10px' }}
                showUploadList={false}
                multiple={false}
              >
                <Button
                  disabled={this.state.isDisabled}
                  className={
                    this.state.isDisabled === true
                      ? 'disabledmanual'
                      : 'manualBtn'
                  }
                >
                  IMPORT FILE
                </Button>
              </Upload>
            </>
          )}
        </div>
      </div>
    );
  }
}
export default SelectInvestorTemplate;
