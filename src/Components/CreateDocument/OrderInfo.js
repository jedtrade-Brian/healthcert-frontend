import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, IconButton, Button } from "@material-ui/core";
import "./CreateDocument.css";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

function OrderInfo(props) {
  const [inputList, setInputList] = useState(
    props.editableData ? props.editableData : [{ subject: "", grade: "", courseCredit: "", courseCode: "", examDate: "", semester: "" }]
  );
  const [error, setError] = useState([{}]);

  useEffect(() => {
    if (props.orderInfo) {
      if (handleError(props.orderInfo)) {
        setInputList(props.orderInfo)
        // const priceSum = props.orderInfo.reduce(
        //   (prev, next) => parseFloat(prev + +next.itemAmt),
        //   0
        // );
        props.sendData(props.orderInfo);
        props.sendInfoError(false);
      } else {
        props.sendInfoError(true);
      }
    }
  }, [])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    if (handleError(list)) {
      setInputList(list);
      // const priceSum = inputList.reduce(
      //   (prev, next) => parseFloat(prev + +next.itemAmt),
      //   0
      // );
      //props.sendData(inputList, priceSum);
      props.sendData(inputList);
      props.sendInfoError(false);
    } else {
      props.sendInfoError(true);
    }
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    // const priceSum = list.reduce(
    //   (prev, next) => parseFloat(prev + +next.itemAmt),
    //   0
    // );
    // props.sendData(list, priceSum);
    props.sendData(list)
  };

  const handleError = allData => {
    const errors = [];
    const flags = [];
    for (const data of allData) {
      const error = {};
      error["subject"] =
        data.subject !== "" ? "" : "Please enter subject";
      error["grade"] =
        data.grade !== "" ? "" : "Please enter grade";
      error["courseCredit"] =
        data.courseCredit !== "" ? "" : "Please enter course credit";
      error["courseCode"] =
        data.courseCode !== "" ? "" : "Please enter course code";
        console.log("data.examDate", data.examDate)
      error["examDate"] =
        data.examDate !== "" ? "" : "Please enter exam date";
        error["semester"] =
        data.semester !== "" ? "" : "Please enter semester date";

      // error["semester"] =
      //   data.semester !== ""
      //     ? !isNaN(data.semester)
      //       ? ""
      //       : "Semester should be number only"
      //     : "Please enter semester number";
      errors.push(error);
      //flags.push(error.itemDesc !== "" || error.itemAmt !== "");
    }
    //console.log('flags:', flags);
    setError(errors);
    if (flags.includes(true)) {
      return false;
    } else {
      return true;
    }
  };

  const handleAddClick = () => {
    if (handleError(inputList)) {
      props.sendInfoError(true);
      setInputList([...inputList, { subject: "", grade: "", courseCredit: "", courseCode: "", examDate: "", semester: "" }]);
      setError([...error, {}]);
    }
  };

  return (
    <div className="orderInfo">
      {inputList.map((x, i) => {
        console.log("x.examDate",x.examDate)
        return (
          <div key={i}>
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <TextField
                  name="subject"
                  label="subject"
                  value={x.subject}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].subject ? error[i].subject : ""
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <FormControl >
                  <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="grade"
                    id="demo-simple-select"
                    value={x.grade}
                    onChange={e => handleInputChange(e, i)}
                    style={{ width: "100%" }}
                    helperText={
                      error[i] && error[i].grade ? error[i].grade : ""
                    }
                  >
                    <MenuItem value={'A'}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                  </Select>
                </FormControl>
                {/* <TextField
                  name="grade"
                  label="grade"
                  value={x.grade}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].grade ? error[i].grade : ""
                  }
                /> */}
              </Grid>
              <Grid item xs={5}>
                <TextField
                  name="courseCredit"
                  label="Course Credit"
                  value={x.courseCredit}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].courseCredit ? error[i].courseCredit : ""
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  name="courseCode"
                  label="Course Code"
                  value={x.courseCode}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].courseCode ? error[i].courseCode : ""
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  name="examDate"
                  label="Exam Date"
                  value={x.examDate}
                  type="datePicker"
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].examDate ? error[i].examDate : ""
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="semester"
                  value={x.semester}
                  label="semester"
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].semester !== "" ? error[i].semester : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                {inputList.length - 1 === i && (
                  <Button onClick={handleAddClick} className="addButton zoom">
                    <AddIcon fontSize="small" />
                  </Button>
                )}

                {inputList.length !== 1 && (
                  <Button
                    onClick={() => handleRemoveClick(i)}
                    aria-label="delete"
                    className="deleteBtn"
                    variant="contained"
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                )}
              </Grid>
            </Grid>
          </div>
        );
      })}

      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </div>
  );
}

export default OrderInfo;
