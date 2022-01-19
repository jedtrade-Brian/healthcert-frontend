import React, { Component } from 'react';
import './CreateDocument.css';
import { Button, Input, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Dialog } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SalesQuotationTemplate from './SalesQuotationTemplate';
import DelieveryQuotationTemplate from './DeliveryQuotationTemplate';
import PaymentQuotationTemplate from './PaymentCertificateTemplate';
import InvoiceQuotationTemplate from './InvoiceQuotationTemplate';
import TVCertificateQuotation from './TVCertificateQuotation';
import createDocService from '../../services/createDocumentService';
import { messagePopup } from '../../services/messagePopupService.jsx';
import {BackdropLoader} from '../../services/loader';
import authService from '../../services/authService';
import {formatDate,formatTime} from "../Shared/dateTimeFormat"
import {unixTimestampToDate,getTimeFromUnixTimestamp} from '../Shared/dateTimeFormat'
import {getDocumentListFun} from "../Shared/Documents/getDocumentsList";
import moment from 'moment'
import { formatAmount } from '../Shared/amountFormat';
import ProgressStepper from '../Shared/ProgressStepper';
import DemoCertificate from '../Dashboard/CertificateTemplate/SignatureTemplateDemo';
import SignatureCanvas from 'react-signature-canvas';
import '../../assets/SignatureFonts/stylesheet.css'
import { GenerateSignatureConfig } from './GenerateSignatureConfig';
import * as htmlToImage from 'html-to-image';

const successPopupMsg = (template) => {
  switch (template) {
    case 'DICT_Doc':
      messagePopup('Jupyton Certificate', 'DICT Template Certificate is created', 'success')
      return;

    case 'ADSM_Doc':
      messagePopup('Jupyton Certificate', 'ADSM Template Certificate is created', 'success')
      return;

    case 'ADCS_Doc':
      messagePopup('Jupyton Certificate', 'ADCS Template Certificate is created', 'success')
      return;

    case 'PGDSLI_Doc':
      messagePopup('Jupyton Certificate', 'PGDSLI Template Certificate is created', 'success')
      return;

    case 'PDDMCS_Doc':
      messagePopup('Jupyton Certificate', 'PDDMCS Template Certificate is created', 'success')
      return;

    case 'TwoApprover_Doc':
      messagePopup('Jupyton Certificate', 'Two Approver Template Certificate is created', 'success')
      return;

    case 'HCPCR_Doc':
      messagePopup('Jupyton Certificate', 'HCPCR Template Certificate is created', 'success')
      return;
    

    case 'any':
      messagePopup('Jupyton Certificate', 'Jupyton Certificate is created', 'success')
      return;

    default:
      return;
  }
};

const getFinalDataModel = (template, data) => {
  const convertToUnix = (dateTime) => {
    if (dateTime){
      let unixTime = new Date(dateTime).getTime() / 1000
      return unixTime
    }
  }

  const convertCourseNameToDocType = (courseName) => {
    let courseNameUpper = courseName.toUpperCase();
    switch (courseNameUpper) {
      case 'ADVANCE DIPLOMA IN CYBER SECURITY':
        return 'ADCS';
      case 'ADVANCE DIPLOMA IN SERVICE MANAGEMENT':
        return 'ADSM';
      case 'DIPLOMA IN INFOCOMM TECHNOLOGY':
        return 'DICT';
      case 'PROFESSIONAL DIPLOMA IN DIGITAL MARKETING AND CAMPAIGN STRATEGY':
        return 'PDDMCS';
      case 'POSTGRADUATE DIPLOMA IN DIGITAL STRATEGY LEADERSHIP AND INNOVATION':
        return 'PGDSLI';
      case 'PCR test':
        return 'HCPCR';
      default:
        return '';
    }
  }

  let cert = [];
  let errorRow = [];
  let wrongFormatRow = [];
  let emptyFields = [];
  let templateInputError = [];

  switch (template) {

    case 'ADCS_Doc':
      //submit credentials here
      for (let obj of data) {
        let transcriptData = []
        if (!(obj.studentId && obj.studentNRIC && obj.transcriptId && obj.studentEmail && obj.studentFirstName 
          && obj.studentLastName && obj.courseName)) {
            emptyFields.push((data.indexOf(obj) + 2))
        }
        else if (obj.modules.length !== obj.grades.length){
          errorRow.push((data.indexOf(obj) + 2))
        }
        else if (!obj.dob || !obj.completionDate){
          wrongFormatRow.push((data.indexOf(obj) + 2))
        }
        else{
          for(var i = 0; i < obj.modules.length; i++) {
            transcriptData.push({
              'moduleName': obj.modules[i].toString().trim(),
              'grade': obj.grades[i].toString().trim(),
            })
          }
        }

        let result = {
          "recipient":{
            "studentId": obj.studentId,
            "nric": obj.studentNRIC,
            "email": obj.studentEmail,
            "name": obj.studentFirstName,
            "lastName": obj.studentLastName,
            "courseName": obj.courseName,
            "dob": convertToUnix(obj.dob),
            "completionDate": convertToUnix(obj.completionDate),
          },
          "id": obj.transcriptId.toString(),
          "transcript": transcriptData,
        }
        cert.push(result);
      }
      let adcs = {
        "documents":cert
      }
      if(errorRow.length === 0 && wrongFormatRow.length === 0 && emptyFields.length === 0){
        return createDocService.createADCSCert(adcs);
      }
      else if(emptyFields.length > 0){
        messagePopup('Discrepancies Found', `Empty Fields at row [${emptyFields.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if(errorRow.length > 0){
        messagePopup('Discrepancies Found', `Modules and Grades mismatch at row [${errorRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (wrongFormatRow.length > 0){
        messagePopup('Discrepancies Found', `Invalid date time format at row [${wrongFormatRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else{
        messagePopup('', `Failed to process imported file`, 'error');
        return null;
      }

    case 'ADSM_Doc':
      //submit credentials here
      for (let obj of data) {
        let transcriptData = []
        if (!(obj.studentId && obj.studentNRIC && obj.transcriptId && obj.studentEmail && obj.studentFirstName 
          && obj.studentLastName && obj.courseName)) {
            emptyFields.push((data.indexOf(obj) + 2))
        }
        else if (obj.modules.length !== obj.grades.length){
          errorRow.push((data.indexOf(obj) + 2))
        }
        else if (!obj.dob || !obj.completionDate){
          wrongFormatRow.push((data.indexOf(obj) + 2))
        }
        else{
          for(var i = 0; i < obj.modules.length; i++) {
            transcriptData.push({
              'moduleName': obj.modules[i].toString().trim(),
              'grade': obj.grades[i].toString().trim(),
            })
          }
        }

        let result = {
          "recipient":{
            "studentId": obj.studentId,
            "nric": obj.studentNRIC,
            "email": obj.studentEmail,
            "name": obj.studentFirstName,
            "lastName": obj.studentLastName,
            "courseName": obj.courseName,
            "dob": convertToUnix(obj.dob),
            "completionDate": convertToUnix(obj.completionDate),
          },
          "id": obj.transcriptId.toString(),
          "transcript": transcriptData,
        }
        cert.push(result);
      }
      let adsm = {
        "documents":cert
      }

      if(errorRow.length === 0 && wrongFormatRow.length === 0 && emptyFields.length === 0){
        return createDocService.createADSMCert(adsm);
      }
      else if(emptyFields.length > 0){
        messagePopup('Discrepancies Found', `Empty Fields at row [${emptyFields.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if(errorRow.length > 0){
        messagePopup('Discrepancies Found', `Modules and Grades mismatch at row [${errorRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (wrongFormatRow.length > 0){
        messagePopup('Discrepancies Found', `Invalid date time format at row [${wrongFormatRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else{
        messagePopup('', `Failed to process imported file`, 'error');
        return null;
      }

    case 'DICT_Doc':
      //submit credentials here
      for (let obj of data) {
        let transcriptData = []
        if (!(obj.studentId && obj.studentNRIC && obj.transcriptId && obj.studentEmail && obj.studentFirstName 
          && obj.studentLastName && obj.courseName)) {
            emptyFields.push((data.indexOf(obj) + 2))
        }
        else if (obj.modules.length !== obj.grades.length){
          errorRow.push((data.indexOf(obj) + 2))
        }
        else if (!obj.dob || !obj.completionDate){
          wrongFormatRow.push((data.indexOf(obj) + 2))
        }
        else{
          for(var i = 0; i < obj.modules.length; i++) {
            transcriptData.push({
              'moduleName': obj.modules[i].toString().trim(),
              'grade': obj.grades[i].toString().trim(),
            })
          }
        }

        let result = {
          "recipient":{
            "studentId": obj.studentId,
            "nric": obj.studentNRIC,
            "email": obj.studentEmail,
            "name": obj.studentFirstName,
            "lastName": obj.studentLastName,
            "courseName": obj.courseName,
            "dob": convertToUnix(obj.dob),
            "completionDate": convertToUnix(obj.completionDate),
          },
          "id": obj.transcriptId.toString(),
          "transcript": transcriptData,
        }
        cert.push(result);
      }
      let dict = {
        "documents":cert
      }

      if(errorRow.length === 0 && wrongFormatRow.length === 0 && emptyFields.length === 0){
        return createDocService.createDICTCert(dict);
      }
      else if(emptyFields.length > 0){
        messagePopup('Discrepancies Found', `Empty Fields at row [${emptyFields.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if(errorRow.length > 0){
        messagePopup('Discrepancies Found', `Modules and Grades mismatch at row [${errorRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (wrongFormatRow.length > 0){
        messagePopup('Discrepancies Found', `Invalid date time format at row [${wrongFormatRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else{
        messagePopup('', `Failed to process imported file`, 'error');
        return null;
      }  

    case 'PDDMCS_Doc':
      //submit credentials here
      for (let obj of data) {
        let transcriptData = []
        if (!(obj.studentId && obj.studentNRIC && obj.transcriptId && obj.studentEmail && obj.studentFirstName 
          && obj.studentLastName && obj.courseName)) {
            emptyFields.push((data.indexOf(obj) + 2))
        }
        else if (obj.modules.length !== obj.grades.length){
          errorRow.push((data.indexOf(obj) + 2))
        }
        else if (!obj.dob || !obj.completionDate){
          wrongFormatRow.push((data.indexOf(obj) + 2))
        }
        else{
          for(var i = 0; i < obj.modules.length; i++) {
            transcriptData.push({
              'moduleName': obj.modules[i].toString().trim(),
              'grade': obj.grades[i].toString().trim(),
            })
          }
        }

        let result = {
          "recipient":{
            "studentId": obj.studentId,
            "nric": obj.studentNRIC,
            "email": obj.studentEmail,
            "name": obj.studentFirstName,
            "lastName": obj.studentLastName,
            "courseName": obj.courseName,
            "dob": convertToUnix(obj.dob),
            "completionDate": convertToUnix(obj.completionDate),
          },
          "id": obj.transcriptId.toString(),
          "transcript": transcriptData,
        }
        cert.push(result);
      }
      let pddmcs = {
        "documents":cert
      }

      if(errorRow.length === 0 && wrongFormatRow.length === 0 && emptyFields.length === 0){
        return createDocService.createPDDMCSCert(pddmcs);
      }
      else if(emptyFields.length > 0){
        messagePopup('Discrepancies Found', `Empty Fields at row [${emptyFields.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if(errorRow.length > 0){
        messagePopup('Discrepancies Found', `Modules and Grades mismatch at row [${errorRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (wrongFormatRow.length > 0){
        messagePopup('Discrepancies Found', `Invalid date time format at row [${wrongFormatRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else{
        messagePopup('', `Failed to process imported file`, 'error');
        return null;
      } 
      
    case 'PGDSLI_Doc':
      //submit credentials here
      for (let obj of data) {
        let transcriptData = []
        if (!(obj.studentId && obj.studentNRIC && obj.transcriptId && obj.studentEmail && obj.studentFirstName 
          && obj.studentLastName && obj.courseName)) {
            emptyFields.push((data.indexOf(obj) + 2))
        }
        else if (obj.modules.length !== obj.grades.length){
          errorRow.push((data.indexOf(obj) + 2))
        }
        else if (!obj.dob || !obj.completionDate){
          wrongFormatRow.push((data.indexOf(obj) + 2))
        }
        else{
          for(var i = 0; i < obj.modules.length; i++) {
            transcriptData.push({
              'moduleName': obj.modules[i].toString().trim(),
              'grade': obj.grades[i].toString().trim(),
            })
          }
        }

        let result = {
          "recipient":{
            "studentId": obj.studentId,
            "nric": obj.studentNRIC,
            "email": obj.studentEmail,
            "name": obj.studentFirstName,
            "lastName": obj.studentLastName,
            "courseName": obj.courseName,
            "dob": convertToUnix(obj.dob),
            "completionDate": convertToUnix(obj.completionDate),
          },
          "id": obj.transcriptId.toString(),
          "transcript": transcriptData,
        }
        cert.push(result);
      }
      let pgdsli = {
        "documents":cert
      }

      if(errorRow.length === 0 && wrongFormatRow.length === 0 && emptyFields.length === 0){
        return createDocService.createPGDSLICert(pgdsli);
      }
      else if(emptyFields.length > 0){
        messagePopup('Discrepancies Found', `Empty Fields at row [${emptyFields.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if(errorRow.length > 0){
        messagePopup('Discrepancies Found', `Modules and Grades mismatch at row [${errorRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (wrongFormatRow.length > 0){
        messagePopup('Discrepancies Found', `Invalid date time format at row [${wrongFormatRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else{
        messagePopup('', `Failed to process imported file`, 'error');
        return null;
      } 
    
    case 'TwoApprover_Doc':
      //submit credentials here
      for (let obj of data) {
        let transcriptData = []
        if (!(obj.studentId && obj.studentNRIC && obj.transcriptId && obj.studentEmail && obj.studentFirstName 
          && obj.studentLastName && obj.courseName && obj.approvers[0] && obj.approvers[1])) {
            emptyFields.push((data.indexOf(obj) + 2))
        }
        else if (obj.modules.length !== obj.grades.length){
          errorRow.push((data.indexOf(obj) + 2))
        }
        else if (!obj.dob || !obj.completionDate){
          wrongFormatRow.push((data.indexOf(obj) + 2))
        }
        else if (!convertCourseNameToDocType(obj.courseName)) {
          templateInputError.push(data.indexOf(obj) + 2)
        }
        else{
          for(var i = 0; i < obj.modules.length; i++) {
            transcriptData.push({
              'moduleName': obj.modules[i].toString().trim(),
              'grade': obj.grades[i].toString().trim(),
            })
          }
        }

        let result = {
          "recipient":{
            "studentId": obj.studentId,
            "nric": obj.studentNRIC,
            "email": obj.studentEmail,
            "name": obj.studentFirstName,
            "lastName": obj.studentLastName,
            "courseName": obj.courseName,
            "dob": convertToUnix(obj.dob),
            "completionDate": convertToUnix(obj.completionDate),
          },
          "id": obj.transcriptId.toString(),
          "transcript": transcriptData,
          "approvers": [
            {
              "email": obj.approvers[0]
            }, 
            {
              "email": obj.approvers[1]
            }
          ]
        }
        cert.push(result);
      }
      let twoApproverCertificates = {
        "documents":cert
      }

      if(errorRow.length === 0 && wrongFormatRow.length === 0 && emptyFields.length === 0){
        //console.log("Two Approver Certificates", twoApproverCertificates)
        return createDocService.createTwoApproverCertificates(twoApproverCertificates);
      }
      else if(emptyFields.length > 0){
        messagePopup('Discrepancies Found', `Empty Fields at row [${emptyFields.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if(errorRow.length > 0){
        messagePopup('Discrepancies Found', `Modules and Grades mismatch at row [${errorRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (wrongFormatRow.length > 0){
        messagePopup('Discrepancies Found', `Invalid date time format at row [${wrongFormatRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (templateInputError.length > 0){
        messagePopup('Discrepancies Found', `Invalid template option at row [${templateInputError.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else{
        messagePopup('', `Failed to process imported file`, 'error');
        return null;
      } 

    case 'HCPCR_Doc':
      //submit credentials here
      for (let obj of data) {

        console.log(data);
        let transcriptData = []
        if (!(obj.transcriptId && obj.patientId && obj.patientNRIC && obj.patientEmail && obj.patientFirstName && obj.patientLastName && obj.gender && obj.patientPPN && obj.nationally && obj.patientTKC && obj.patientTKN && obj.resultCode && obj.result && obj.performer && obj.identifier && obj.clinicName && obj.officeAdd && obj.officeNo && obj.webAdd && obj.labName && obj.labAdd && obj.labNo)) {
            emptyFields.push((data.indexOf(obj) + 2))
            console.log(obj.patientLastName);
        }
        else if (!obj.dob || !obj.collectedDate || !obj.effectiveDate){
          wrongFormatRow.push((data.indexOf(obj) + 2))
        }
        
        let result = {
        
            "id": "ffb1e61f-30ec-419c-9e0c-baa844d876b1",
            "name": "HealthCert",
            "validFrom": "2021-05-18T06:43:12.152Z",
            "fhirVersion": "4.0.1",
            "fhirBundle": {
              "resourceType": "Bundle",
              "type": "collection",        
              entry: [
                {
                  "resourceType": "Patient",
                  "extension": [
                    {
                      "url": "http://hl7.org/fhir/StructureDefinition/patient-nationality",
                      "code": { "text": obj.nationally }
                    }
                  ],
                  "identifier": [
                    {
                      "type": "PPN",
                      "value": obj.patientPPN
                    },
                    {
                      "type": { "text": "NRIC" },
                      "value": obj.patientNRIC
                    }
                  ],
                  "name": [{ "text": `${obj.patientFirstName} ${obj.patientLastName}` }],
                  "gender": obj.gender,
                  "birthDate": obj.dob,
                },
                {
                  "resourceType": "Specimen",
                  "type": {
                    "coding": [
                      {
                        "system": "http://snomed.info/sct",
                        "code": obj.patientTKC,
                        "display": obj.patientTKN
                      }
                    ]
                  },
                  "collection": { "collectedDateTime": obj.collectedDate }
                },          
                {
                  "resourceType": "Observation",
                  "identifier": [
                    {
                      "value": "123456789",
                      "type": "ACSN"
                    }
                  ],
                  "code": {
                    "coding": [
                      {
                        "system": "http://loinc.org",
                        "code": "94531-1",
                        "display": "Reverse-transcription-polymerase-chain-reaction-(rRT-PCR)-test"
                      }
                    ]
                  },
                  "valueCodeableConcept": {
                    "coding": [
                      {
                        "system": "http://snomed.info/sct",
                        "code": obj.resultCode,
                        "display": obj.result
                      }  
                    ]
                  },
                  "effectiveDateTime": obj.effectiveDate,
                  "status": "final",
                  "performer": { "name": [{ "text": obj.performer }] },
                  "qualification": [
                    {
                      "identifier": 'MCR-013-210614B',
                      "issuer": "MOH"
                    }
                  ]
                },
                {
                  "resourceType": "Organization",
                  "name": obj.clinicName,
                  "type": "Licensed Healthcare Provider",
                  "endpoint": {
                    "address": obj.webAdd
                  },    
                  "contact": {
                    "telecom": [
                      {
                        "system": "phone",
                        "value": obj.officeNo
                      }
                  ],
                    "address": {
                      "type": "physical",
                      "use": "work",
                      "text": obj.officeAdd
                    }
                  }
                },
                {
                  "resourceType": "Organization",
                  "name": obj.labName,
                  "type": "Accredited Laboratory",
                  "contact": {
                    "telecom": [
                      {
                        "system": "phone",
                        "value": obj.labNo
                      }
                    ],
                    "address": {
                      "type": "physical",
                      "use": "work",
                      "text": obj.labAdd
                    }
                  }
                }
              ]
            },
            "transcriptId": obj.transcriptId.toString(),
            "patientId": obj.patientId.toString(),
            "patientEmail": obj.patientEmail.toString(),
            "patientFirstName": obj.patientFirstName.toString(),
            "patientLastName": obj.patientLastName.toString(),
            "reference": "ffb1e61f-30ec-419c-9e0c-baa844d876b1",
            "title": "RRT-PCR TEST",
            "notarisedOn": "2021-05-21T06:29:14.216Z",
            "passportNumber": obj.patientPPN.toString(),
        };

        cert.push(result);

      }
      let HCPCR = {
        "documents":cert
      }
      console.log(JSON.stringify(HCPCR,null,2));
      if(errorRow.length === 0 && wrongFormatRow.length === 0 && emptyFields.length === 0){
        
        return createDocService.createHCPCRCert(HCPCR);
        
      }
      else if(emptyFields.length > 0){
        messagePopup('Discrepancies Found', `Empty Fields at row [${emptyFields.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if(errorRow.length > 0){
        messagePopup('Discrepancies Found', `Modules and Grades mismatch at row [${errorRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (wrongFormatRow.length > 0){
        messagePopup('Discrepancies Found', `Invalid date time format at row [${wrongFormatRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else{
        messagePopup('', `Failed to process imported file`, 'error');
        return null;
      }  
        
      case 'any':
      //submit credentials here
      for (let obj of data) {
        let transcriptData = []
        if (!(obj.studentId && obj.studentNRIC && obj.transcriptId && obj.studentEmail && obj.studentFirstName 
          && obj.studentLastName && obj.courseName)) {
            emptyFields.push((data.indexOf(obj) + 2))
        }
        else if (obj.modules.length !== obj.grades.length){
          errorRow.push((data.indexOf(obj) + 2))
        }
        else if (!obj.dob || !obj.completionDate){
          wrongFormatRow.push((data.indexOf(obj) + 2))
        }
        else if (!convertCourseNameToDocType(obj.courseName)) {
          templateInputError.push(data.indexOf(obj) + 2)
        }
        else{
          for(var i = 0; i < obj.modules.length; i++) {
            transcriptData.push({
              'moduleName': obj.modules[i].toString().trim(),
              'grade': obj.grades[i].toString().trim(),
            })
          }
        }

        let result = {
          "recipient":{
            "studentId": obj.studentId,
            "nric": obj.studentNRIC,
            "email": obj.studentEmail,
            "name": obj.studentFirstName,
            "lastName": obj.studentLastName,
            "courseName": obj.courseName,
            "dob": convertToUnix(obj.dob),
            "completionDate": convertToUnix(obj.completionDate),
          },
          "id": obj.transcriptId.toString(),
          "transcript": transcriptData,
          "docType": convertCourseNameToDocType(obj.courseName)
        }
        cert.push(result);
      }
      let certificates = {
        "documents":cert
      }

      if(errorRow.length === 0 && wrongFormatRow.length === 0 && emptyFields.length === 0){
        //console.log(JSON.stringify(certificates))
        return createDocService.createTVCertificates(certificates);
      }
      else if(emptyFields.length > 0){
        messagePopup('Discrepancies Found', `Empty Fields at row [${emptyFields.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if(errorRow.length > 0){
        messagePopup('Discrepancies Found', `Modules and Grades mismatch at row [${errorRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (wrongFormatRow.length > 0){
        messagePopup('Discrepancies Found', `Invalid date time format at row [${wrongFormatRow.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else if (templateInputError.length > 0){
        messagePopup('Discrepancies Found', `Invalid template option at row [${templateInputError.toString().replaceAll(',', ', ')}]`, 'warning');
        return null;
      }
      else{
        messagePopup('', `Failed to process imported file`, 'error');
        return null;
      } 
       
      default:
      return null;
  }
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
});

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
          <CloseIcon />
        </IconButton>
      ) : null}
      <Typography variant='h6'>{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


class ConfirmTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      activeStep: 5,
      loader: false,
      user: authService.getUserInfo(),
      isSucessful: false,
    };
  }

  createDocuments = async (formData) => {
    
    let response
    try {
      this.setState({ loader: true });
      response = await getFinalDataModel(this.props.template, formData);
      
      if(response && response.data) {
        this.props.onConfirmClick();
        successPopupMsg(this.props.template);
        this.setState({loader: false, isSucessful: true})
      }
      else{
        this.setState({ loader: false, isSucessful: false });
      }

    } catch (error) {
      this.setState({ loader: false, isSucessful: false });
      if (error.response && error.response.status === 403) {
        messagePopup('', 'Email already exist', 'error');
      }
      if (error.response && error.response.status === 400) {
        messagePopup('', 'Bad Request', 'error');
      }
      console.log('Error : ',error);
    }
  };

  handleConfirm = () => {
    this.createDocuments(this.props.formData)   
  };

  handleBack = () => {
    this.props.handleBack();
  };

  handleClose = () => {
    this.props.history.push('/Certificate');
    window.location.reload();
  };

  getDocumentType = () => {
    switch(this.props.template){
      case "DICT_Doc" :
        return "DICT - Jupyton Certificate"  
      case "ADSM_Doc" :
        return "ADSM - Jupyton Certificate"     
      case "ADCS_Doc" :
        return "ADCS - Jupyton Certificate"          
      case "PGDSLI_Doc" :
        return "PGDSLI - Jupyton Certificate"
      case "PDDMCS_Doc" :
        return "PDDMCS - Jupyton Certificate"     
      case 'any' :
        return "Multiple Templates - Jupyton Certificate"
      case 'TwoApprover_Doc' :
        return "Two Approvers Template - Jupyton Certificate"
      case 'HCPCR_Doc' :
        return "HCPCR - Jupyton Certificate"
      default :  
        return ""
    }
  }

  render() {

    return (
      <div>
        <BackdropLoader open={this.state.loader} />
        <div className='saleTempImgBox'>
          <h3>Review & Confirm</h3>
          <p>
            Document Name: <b>{this.getDocumentType()}</b>
          </p>
          <TVCertificateQuotation formData={this.props.formData} user={this.state.user}
            fileObj={this.props.fileObj} template={this.props.template} />
        </div>  
        <div className='salebottomAction'>
          {/* <Button onClick={this.handleBack} className='amendBtn'>
            AMEND
          </Button> */}
          {!this.state.isSucessful 
          && <Button
              onClick={this.handleBack}
              className="amendBtn"
              >
                BACK
              </Button>
          }
          {this.state.isSucessful 
            ? <Button onClick={this.handleClose} className='returnBtn'>
              Back to Certificates
            </Button> 
            : <Button onClick={this.handleConfirm} className='confirmBtn'>
              CONFIRM & CREATE
            </Button>
          }
        </div>
      </div>
    );
  }
}

export default ConfirmTemplate;
