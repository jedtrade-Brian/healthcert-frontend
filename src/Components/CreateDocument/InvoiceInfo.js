import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, IconButton, Button } from "@material-ui/core";
import "./CreateDocument.css";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

function InvoiceInfo(props) {
  const [inputList, setInputList] = useState(
    props.editableData
      ? props.editableData
      : [
          {
            serialNo: "",
            invDesc: "",
            invQty: "",
            unitPrice: "",
            productAmt: ""
          }
        ]
  );
  const [error, setError] = useState([{}]);

  useEffect(()=>{
    if(props.orderInfo) {
      if(handleError(props.orderInfo)){
        setInputList(props.orderInfo)
        const priceSum = props.orderInfo.reduce((prev, next) => {
          return prev + +(next.invQty * next.unitPrice);
        }, 0);
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
      const priceSum = inputList.reduce((prev, next) => {
        return prev + +(next.invQty * next.unitPrice);
      }, 0);
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
    const priceSum = list.reduce((prev, next) => {
      return prev + +(next.invQty * next.unitPrice);
    }, 0);
    props.sendData(list, priceSum);
  };

  const handleError = allData => {
    const errors = [];
    const flags = [];
    for (const data of allData) {
      const error = {};
      error["serialNo"] = data.serialNo !== "" ? "" : "Please enter serial no";
      error["invDesc"] =
        data.invDesc !== "" ? "" : "Please enter inv description";
      error["invQty"] = data.invQty !== "" ? "" : "Please enter inv quantity ";
      error["unitPrice"] =
        data.unitPrice !== ""
          ? !isNaN(data.unitPrice)
            ? ""
            : "Unit price should be number only"
          : "Please enter unit price";
      error["productAmt"] =
        data.productAmt !== "" ? "" : "Please enter product amount";
      errors.push(error);
      flags.push(
        error.serialNo !== "" ||
          error.invDesc !== "" ||
          error.invQty !== "" ||
          error.unitPrice !== "" ||
          error.productAmt !== ""
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
          invDesc: "",
          invQty: "",
          unitPrice: "",
          productAmt: ""
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
                  name="invDesc"
                  label="Inv Description"
                  value={x.invDesc}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].invDesc ? error[i].invDesc : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="invQty"
                  label="Inv Quantity"
                  value={x.invQty}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].invQty ? error[i].invQty : ""
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  name="unitPrice"
                  label="Unit Price"
                  value={x.unitPrice}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].unitPrice ? error[i].unitPrice : ""
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="productAmt"
                  label="Product Amount"
                  value={x.productAmt}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].productAmt ? error[i].productAmt : ""
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

export default InvoiceInfo;
