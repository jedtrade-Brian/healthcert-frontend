import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, IconButton, Button } from "@material-ui/core";
import "./CreateDocument.css";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

function PaymentInfo(props) {
  const [inputList, setInputList] = useState(
    props.editableData
      ? props.editableData
      : [
          {
            serialNo: "",
            claimDesc: "",
            contAmt: "",
            prevClaim: "",
            currClaim: "",
            accumClaim: "",
            balanceAmt: ""
          }
        ]
  );
  const [error, setError] = useState([{}]);

  useEffect(()=>{
    if(props.orderInfo) {
      if(handleError(props.orderInfo)){
        setInputList(props.orderInfo)
        // let priceSum = 0;
        // for (const item of props.orderInfo) {
        //   priceSum += +item.currClaim
        // }
        const priceSum = props.orderInfo.reduce(
          (prev, next) => parseFloat(prev + +next.currClaim),
          0
        );
        props.sendData(props.orderInfo, priceSum);
        props.sendInfoError(false);
      } else {
        props.sendInfoError(true);
      }     
    }
  },[])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    if (handleError(list)) {
      setInputList(list);
      // let priceSum = 0;
      // for (const item of inputList) {
      //   priceSum += +item.currClaim
      // }
      const priceSum = inputList.reduce(
        (prev, next) => parseFloat(prev + +next.currClaim),
        0
      );
      // const priceSum = inputList.reduce(
      //   (prev, next) => prev + +next.balanceAmt,
      //   0
      // );
      props.sendData(inputList, priceSum);
      props.sendInfoError(false);
    } else {
      props.sendInfoError(true);
    }
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    const priceSum = list.reduce(
      (prev, next) => parseFloat(prev + +next.currClaim),
      0
    );
    props.sendData(list, priceSum);
  };

  const handleError = allData => {
    const errors = [];
    const flags = [];
    for (const data of allData) {
      const error = {};
      error["serialNo"] = data.serialNo !== "" ? "" : "Please enter serial no";
      error["claimDesc"] =
        data.claimDesc !== "" ? "" : "Please enter claim description";
      error["contAmt"] = data.contAmt !== "" ? "" : "Please enter cont amount ";
      error["prevClaim"] =
        data.prevClaim !== "" ? "" : "Please enter previous claim";
      error["currClaim"] =
        data.currClaim !== "" ? "" : "Please enter inv current claim";
      error["accumClaim"] =
        data.accumClaim !== "" ? "" : "Please enter accumlated claim ";
      error["balanceAmt"] =
        data.balanceAmt !== ""
          ? !isNaN(data.balanceAmt)
            ? ""
            : "Balance amount should be number only"
          : "Please enter balance amount";
      errors.push(error);
      flags.push(
        error.serialNo !== "" ||
          error.claimDesc !== "" ||
          error.contAmt !== "" ||
          error.prevClaim !== "" ||
          error.currClaim !== "" ||
          error.accumClaim !== "" ||
          error.balanceAmt !== ""
      );
    }
    // console.log('flags:', flags);
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
      setInputList([
        ...inputList,
        {
          serialNo: "",
          claimDesc: "",
          contAmt: "",
          prevClaim: "",
          currClaim: "",
          accumClaim: "",
          balanceAmt: ""
        }
      ]);
      setError([...error, {}]);
    }
  };

  return (
    <div className="orderInfo">
      {inputList.map((x, i) => {
        return (
          <div key={i}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  name="serialNo"
                  label="Serial No"
                  value={x.serialNo}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].serialNo ? error[i].serialNo : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="claimDesc"
                  label="Claim Description"
                  value={x.claimDesc}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].claimDesc ? error[i].claimDesc : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="contAmt"
                  label="Contract Amount S$"
                  value={x.contAmt}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].contAmt ? error[i].contAmt : ""
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  name="prevClaim"
                  label="Previous Claim S$"
                  value={x.prevClaim}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].prevClaim ? error[i].prevClaim : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="currClaim"
                  label="Current Claim S$ (Approved)"
                  value={x.currClaim}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].currClaim ? error[i].currClaim : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="accumClaim"
                  label="Accumlated Claim S$"
                  value={x.accumClaim}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].accumClaim ? error[i].accumClaim : ""
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  name="balanceAmt"
                  label="Balance Amount S$"
                  value={x.balanceAmt}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].balanceAmt ? error[i].balanceAmt : ""
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

export default PaymentInfo;
