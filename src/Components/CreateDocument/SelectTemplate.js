import React, { Component } from "react";
import { Dialog, IconButton, Button, Typography } from "@material-ui/core";
import "./CreateDocument.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import DICTUrl from "../../assets/DICT_Image.PNG";
import HCPCRUrl from "../../assets/HCPCR_Image.PNG";

import PDDMCSUrl from "../../assets/PDDMCS_Image.PNG";
import ADSMUrl from "../../assets/ADSM_Image.PNG";
import ADCSUrl from "../../assets/ADCS_Image.PNG";
import PGDSLIUrl from "../../assets/PGDSLI_Image.PNG";
import TwoApproverUrl from "../../assets/TwoApprover_Image.png";
import anyUrl from "../../assets/combine_certificate.svg";
import InvalidUrl from "../../assets/invalid.jpeg";
import { Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import adsmTemplateFile from "../../assets/document-template/ADSM-template.xlsx"
import pgdsliTemplateFile from "../../assets/document-template/PGDSLI-template.xlsx"
import dictTemplateFile from "../../assets/document-template/DICT-template.xlsx"
import pddmcsTemplateFile from "../../assets/document-template/PDDMCS-template.xlsx"
import adcsTemplateFile from "../../assets/document-template/ADCS-template.xlsx"
import multipleTemplate from "../../assets/document-template/Multiple-templates.xlsx"
import twoApproverTemplate from "../../assets/document-template/Two-Approver-template.xlsx"

import HCPCRTemplate from "../../assets/document-template/HCPCR-template.xlsx"

import { messagePopup } from '../../services/messagePopupService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    left: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <ArrowBackIosIcon />
        </IconButton>
      ) : null}
      <Typography variant='h6' align={children ? 'center' : 'left'}>
        {children}
      </Typography>
    </MuiDialogTitle>
  );
});

class SelectTemplate extends Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      templateFile: null,
      isSelected: null,
      openImageModal: false,
      previewImage: null,
    };
    this.enableButtons = this.enableButtons.bind(this);
  }

  getTemplateFile = (selectedFile) => {
    switch (selectedFile) {
      case "DICT_Doc":
        this.setState({ templateFile: dictTemplateFile });
        break;
      case "PDDMCS_Doc":
        this.setState({ templateFile: pddmcsTemplateFile });
        break;
      case "ADSM_Doc":
        this.setState({ templateFile: adsmTemplateFile });
        break;
      case "PGDSLI_Doc":
        this.setState({ templateFile: pgdsliTemplateFile });
        break;
      case "ADCS_Doc":
        this.setState({ templateFile: adcsTemplateFile });
        break;
      case "any":
        this.setState({ templateFile: multipleTemplate });
        break;
      case "TwoApprover_Doc":
        this.setState({ templateFile: twoApproverTemplate });
        break;
      case "HCPCR_Doc":
        this.setState({ templateFile: HCPCRTemplate });
      break;  
      default:
        break;
    }
  }

  getFileName = () => {
    switch (this.state.isSelected) {
      case "DICT_Doc":
        return "DICT-template.xlsx"
      case "PDDMCS_Doc":
        return "PDDMCS-template.xlsx"
      case "ADSM_Doc":
        return "ADSM-template.xlsx"
      case "PGDSLI_Doc":
        return "PGDSLI-template.xlsx"
      case "ADCS_Doc":
        return "ADCS-template.xlsx"
      case 'any':
        return "Multiple-templates.xlsx"
      case 'TwoApprover_Doc':
        return "Two-Approver-template.xlsx"
      case 'HCPCR_Doc':
        return "HCPCR-template.xlsx"  
      default:
        return ''
    }
  }

  goToSalesQuotation = () => {
    this.props.handleNext();
  };
  importFile = () => { };
  async enableButtons(e) {
    let target = e.currentTarget;
    this.setState({ isSelected: target.id })
    this.getTemplateFile(target.id)

    return e.currentTarget.classList.value === "certificateTemplateImgBorder"
      ? this.setState({ isDisabled: true, isSelected: null, templateFile: null })
      : e.currentTarget.classList.value === "certificateTemplateImg"
        ? this.setState({ isDisabled: false })
        : "";
  }

  getDDMMYYYYDate(dateStr) {
    if (dateStr) {
      try {
        const [day, month, year] = dateStr.split("/")
        if (day && month && year){
          return new Date(year, month - 1, day)
        }
        else {
          return '';
        }
      } catch {
        return '';
      }
    } else {
      return '';
    }
  }













  setImportedTemplateData = (rows) => {
    let list = []
    let finalData = {}
    switch (this.state.isSelected) {
        case "DICT_Doc":
        rows.slice(1).map((row, index) => {
          //  console.log('row & index',row, index)
          if (row && row !== "undefined" && row.length) {
            if (row[0] !== undefined) {
              list.push({
                'transcriptId': row[0],
                'studentId': row[1],
                'studentNRIC': row[2],
                'studentEmail': row[3],
                "studentFirstName": row[4],
                'studentLastName': row[5],
                'courseName': row[6],
                'dob': this.getDDMMYYYYDate(row[7]),
                'completionDate': this.getDDMMYYYYDate(row[8]),
                'modules': row[9].toString().split('|'),
                'grades': row[10].toString().split('|'),
                'template' : 'DICT',
              })
            }
          }
        });
        return list

        case "HCPCR_Doc":
          rows.slice(1).map((row, index) => {
            console.log('row & index',row, index)
            if (row && row !== "undefined" && row.length) {
              if (row[0] !== undefined) {
                list.push({
                  'transcriptId': row[0],
                  'patientId': row[1],
                  'patientNRIC': row[2],
                  'patientEmail': row[3],
                  'patientFirstName': row[4],
                  'patientLastName': row[5],
                  'gender': row[6],
                  'patientPPN': row[7],
                  'nationally': row[8],
                  'dob': this.getDDMMYYYYDate(row[9]),
                  'patientTKC': row[10],
                  'patientTKN': row[11],
                  'collectedDate': this.getDDMMYYYYDate(row[12]),
                  'effectiveDate': this.getDDMMYYYYDate(row[13]),
                  'resultCode': row[14],
                  'result': row[15],
                  'performer': row[16],
                  'identifier': row[17],
                  'clinicName': row[18],
                  'officeAdd': row[19],
                  'officeNo': row[20],
                  'webAdd': row[21],
                  'labName': row[22],
                  'labAdd': row[23],
                  'labNo': row[24],
                  'template' : 'HCPCR',
                })
              }
            }
            console.log(list);
          });
          return list
         
     

        // console.log('sq11')
        // rows.slice(1).map((row, index) => {
        //   if (row && row !== "undefined" && row.length) {
        //     if (index === 0) {
        //       finalData['fullName'] = row[0]
        //       finalData['emailAddress'] = row[1]
        //       finalData['phoneNumber'] = row[2]
        //       finalData['companyName'] = row[3]
        //       finalData['customerId'] = row[4]
        //       finalData['streetAddress'] = row[5]
        //       finalData['city'] = row[6]
        //       finalData['state'] = row[7]
        //       finalData['zipCode'] = row[8]
        //       finalData['validityPeriod'] = this.getDDMMYYYYDate(row[9])
        //       finalData['quoteNumber'] = row[10]
        //       finalData['quoteDate'] = this.getDDMMYYYYDate(row[11])
        //       finalData['comments'] = row[12]
        //       finalData['orderInfo'] = [
        //         {
        //           itemDesc: row[13],
        //           itemAmt: row[14]
        //         }
        //       ]
        //       finalData['currency'] = row[15]
        //       // finalData['finalAmt'] = row[15]
        //     } else {
        //       finalData.orderInfo = [
        //         ...finalData.orderInfo,
        //         {
        //           itemDesc: row[13],
        //           itemAmt: row[14]
        //         }
        //       ]
        //     }
        //   }
        // });
        // // console.log('Final data orderInfo: ',finalData.orderInfo);
        // if (Object.keys(finalData).length) {
        //   finalData['docType'] = 'DICT'
        // }
        // return finalData;

      case "PDDMCS_Doc":
        rows.slice(1).map((row, index) => {
          //  console.log('row & index',row, index)
          if (row && row !== "undefined" && row.length) {
            if (row[0] !== undefined) {
              list.push({
                'transcriptId': row[0],
                'studentId': row[1],
                'studentNRIC': row[2],
                'studentEmail': row[3],
                "studentFirstName": row[4],
                'studentLastName': row[5],
                'courseName': row[6],
                'dob': this.getDDMMYYYYDate(row[7]),
                'completionDate': this.getDDMMYYYYDate(row[8]),
                'modules': row[9].toString().split('|'),
                'grades': row[10].toString().split('|'),
                'template' : 'PDDMCS',
              })
            }
          }
        });
        return list

      case "ADSM_Doc":
        rows.slice(1).map((row, index) => {
          //  console.log('row & index',row, index)
          if (row && row !== "undefined" && row.length) {
            if (row[0] !== undefined) {
              list.push({
                'transcriptId': row[0],
                'studentId': row[1],
                'studentNRIC': row[2],
                'studentEmail': row[3],
                "studentFirstName": row[4],
                'studentLastName': row[5],
                'courseName': row[6],
                'dob': this.getDDMMYYYYDate(row[7]),
                'completionDate': this.getDDMMYYYYDate(row[8]),
                'modules': row[9].toString().split('|'),
                'grades': row[10].toString().split('|'),
                'template' : 'ADSM',
              })
            }
          }
        });
        return list

      case "PGDSLI_Doc":
        rows.slice(1).map((row, index) => {
          //  console.log('row & index',row, index)
          if (row && row !== "undefined" && row.length) {
            if (row[0] !== undefined) {
              list.push({
                'transcriptId': row[0],
                'studentId': row[1],
                'studentNRIC': row[2],
                'studentEmail': row[3],
                "studentFirstName": row[4],
                'studentLastName': row[5],
                'courseName': row[6],
                'dob': this.getDDMMYYYYDate(row[7]),
                'completionDate': this.getDDMMYYYYDate(row[8]),
                'modules': row[9].toString().split('|'),
                'grades': row[10].toString().split('|'),
                'template' : 'PGDSLI',
              })
            }
          }
        });
        return list

      case 'ADCS_Doc':
        rows.slice(1).map((row, index) => {
          //  console.log('row & index',row, index)
          if (row && row !== "undefined" && row.length) {
            if (row[0] !== undefined) {
              list.push({
                'transcriptId': row[0],
                'studentId': row[1],
                'studentNRIC': row[2],
                'studentEmail': row[3],
                "studentFirstName": row[4],
                'studentLastName': row[5],
                'courseName': row[6],
                'dob': this.getDDMMYYYYDate(row[7]),
                'completionDate': this.getDDMMYYYYDate(row[8]),
                'modules': row[9].toString().split('|'),
                'grades': row[10].toString().split('|'),
                'template' : 'ADCS',
              })
            }
          }
        });
        return list

      case 'TwoApprover_Doc':
        rows.slice(1).map((row, index) => {
          //  console.log('row & index',row, index)
          if (row && row !== "undefined" && row.length) {
            if (row[0] !== undefined) {
              list.push({
                'transcriptId': row[0],
                'studentId': row[1],
                'studentNRIC': row[2],
                'studentEmail': row[3],
                "studentFirstName": row[4],
                'studentLastName': row[5],
                'courseName': row[6],
                'dob': this.getDDMMYYYYDate(row[7]),
                'completionDate': this.getDDMMYYYYDate(row[8]),
                'modules': row[9].toString().split('|'),
                'grades': row[10].toString().split('|'),
                'approvers': [row[11] ? row[11].toString() : '', row[12] ? row[12].toString() : ''],
              })
            }
          }
        });
        return list

      case 'any':
        rows.slice(1).map((row, index) => {
          //  console.log('row & index',row, index)
          if (row && row !== "undefined" && row.length) {
            if (row[0] !== undefined) {
              list.push({
                'transcriptId': row[0],
                'studentId': row[1],
                'studentNRIC': row[2],
                'studentEmail': row[3],
                "studentFirstName": row[4],
                'studentLastName': row[5],
                'courseName': row[6],
                'dob': this.getDDMMYYYYDate(row[7]),
                'completionDate': this.getDDMMYYYYDate(row[8]),
                'modules': row[9].toString().split('|'),
                'grades': row[10].toString().split('|'),
              })
            }
          }
        });
        return list

        // let list = []
        // let obj = {}
        // console.log("rows", rows)
        // rows.slice(1).map((row, index) => {
        //   //  console.log('row & index',row, index)
        //   if (row && row !== "undefined" && row.length) {

        //     if (row[0] !== undefined) {
        //       list.push({
        //         "studentName": row[0],
        //         'studentNRIC': row[1],
        //         'studentId': row[2],
        //         'studentEmail': row[3],
        //         'studentCourse': row[4],
        //         'transcriptId': row[5],
        //         'merit': row[6],
        //         'certificateDescription': row[7],
        //         'certificateName': row[8],
        //         'issuedOn': this.getDDMMYYYYDate(row[9]),
        //         'admissionDate': this.getDDMMYYYYDate(row[10]),
        //         'graduationDate': this.getDDMMYYYYDate(row[11]),
        //         'transcript': [
        //           {
        //             subject: row[12],
        //             grade: row[13],
        //             courseCredit: row[14],
        //             courseCode: row[15],
        //             examDate: row[16],
        //             semester: row[17]

        //           }
        //         ],
        //       })

        //     }
        //     else {
        //       // console.log(list[list.length -1].orderInfo)
        //       //obj.orderInfo = [
        //       list[list.length - 1].transcript = [
        //         ...list[list.length -1].transcript,
        //         {
        //           subject: row[12],
        //           grade: row[13],
        //           courseCredit: row[14],
        //           courseCode: row[15],
        //           examDate: row[16],
        //           semester: row[17]
        //         }
        //       ]
              
        //     }


        //   }
        // });

        // if(Object.keys(finalData).length) {
        //   finalData['docType'] = 'TVCertificate'
        // }
        //console.log("multipleFinalData",multipleFinalData)
        // return list
      

      default:
        break;
    }
  }



























  
  openTemplateModal = (template) => {
    switch(template){
      case 'ADSM_Doc':
        this.setState({ previewImage: ADSMUrl });
        break;

      case 'ADCS_Doc':
        this.setState({ previewImage: ADCSUrl });
        break;

      case 'DICT_Doc':
        this.setState({ previewImage: DICTUrl });
        break;

      case 'HCPCR_Doc':
        this.setState({ previewImage: HCPCRUrl });
        break;

      case 'PGDSLI_Doc':
        this.setState({ previewImage: PGDSLIUrl });
        break;

      case 'PDDMCS_Doc':
        this.setState({ previewImage: PDDMCSUrl });
        break;

      case 'TwoApprover_Doc':
        this.setState({ previewImage: TwoApproverUrl });
        break;

      case 'HCPPCR_Doc':
        this.setState({ previewImage: HCPCRUrl });
        break;

      default:
        break;
    }
    this.setState({ openImageModal: true });
  }

  handleCloseModal = () => {
    this.setState({ openImageModal: false, previewImage: null });
  };

  handleCancel = () => {
    if (this.props && this.props.history) {
      this.props.history.goBack();
    }
  }























  fileHandler = fileList => {
    let fileObj = fileList;
    
    if (!fileObj) {
      return false;
    }

    this.props.handleExcel(fileObj, this.state.isSelected)

    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileObj.type === ""
      )
    ) {
      return false;
    }
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let finalData = null
        finalData = this.setImportedTemplateData(resp.rows)
        if (Object.keys(finalData).length === 0) { //newRows.length === 0
          messagePopup('', 'Please enter valid file', 'error');
          return false;
        } else {
          this.props.handleNext(finalData)
          console.log(finalData);
        }
      }
    });
    return false;
  };





















  render() {
    return (
      <div>
        <div className="saleTempImgBox">
          <h3>Choose A Template</h3>
          
          








          <span
            className={
              this.state.isSelected === 'HCPCR_Doc'
                ? "certificateTemplateImgBorder"
                : "certificateTemplateImg"
            }
            onClick={this.enableButtons}
            id = 'HCPCR_Doc'
          >
            <img src={HCPCRUrl} alt="HCPCR Template" />
            <div className="previewImageBtn">
              <button className="previewImageBtnContent" onClick={() => this.openTemplateModal('HCPCR_Doc')}>
                <FontAwesomeIcon icon={faExpand} className="previewIcon" /> Preview
              </button>
            </div>
            <div className="templateName">HCPCR Template</div>
          </span>
































         
          
          <div className={ this.state.isDisabled === true
                  ? "disableddownloadtemplate"
                  : "downloadtemplate"
          }>
            <a href={this.state.templateFile} download={this.getFileName()}>
              <IconButton aria-label="Download">
                <GetAppIcon />
              </IconButton>
              Download Input Template
            </a>
          </div>
        </div>









        
        <div className="certificateAction">
          <input
            id="myInput"
            type="file"
            ref={ref => (this.myInput = ref)}
            style={{ display: "none" }}
          />
          <Button
            onClick={this.handleCancel}
            className="cancelBtn"
          >
            CANCEL
          </Button>
          {/* <Button
            onClick={this.goToSalesQuotation}
            // className="addButton"
            disabled={this.state.isDisabled}
            className={
              this.state.isDisabled === true ? "disabledmanual" : "manualBtn"
            }
          >
            MANUAL INPUT
          </Button> */}
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            style={{ marginBottom: '10px' }}
            showUploadList={false}
            multiple={false}
            disabled={this.state.isDisabled}
          >
            <Button
              disabled={this.state.isDisabled}
              className={
                this.state.isDisabled === true
                  ? "disabledimportFile"
                  : "importFile"
              }
            >
              IMPORT FILE
            </Button>
          </Upload>
          {/* <Button
            className={
              this.state.isDisabled === true
                ? "disabledimportFile"
                : "importFile"
            }
            onClick={e => this.myInput.click()}
            disabled={this.state.isDisabled}
          >
            IMPORT FILE
          </Button> */}
        </div>
        <Dialog
          open={this.state.openImageModal}
          onClose={this.handleCloseModal}
          aria-labelledby='simple-modal-title'
          aria-describedby='scroll-dialog-description'
          className='saleModaleTemplate'
        >
          <DialogTitle id='customized-dialog-title' onClose={this.handleCloseModal} ></DialogTitle>
          <DialogContent>
            <img src={this.state.previewImage} height="700px" width="500px" style={{paddingTop: "35px"}} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default SelectTemplate;
