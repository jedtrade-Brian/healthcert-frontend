import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, IconButton, Button } from "@material-ui/core";
import "./CreateDocument.css";
import DeleteIcon from "@material-ui/icons/Delete";

function DeliveryInfo(props) {
  const [inputList, setInputList] = useState(
    props.editableData
      ? props.editableData
      : [{ deliveryDesc: "", deliveryQty: "", deliveryUOM: "" }]
  );
  const [error, setError] = useState([{}]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    if (handleError(list)) {
      setInputList(list);
      const priceSum = inputList.reduce(
        (prev, next) => prev + +next.deliveryQty,
        0
      );
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
  };

  const handleError = allData => {
    const errors = [];
    const flags = [];
    for (const data of allData) {
      const error = {};
      error["deliveryDesc"] =
        data.deliveryDesc !== "" ? "" : "Please enter description";
      error["deliveryQty"] =
        data.deliveryQty !== ""
          ? !isNaN(data.deliveryQty)
            ? ""
            : "Quantity should be number only"
          : "Please enter quantity";
      error["deliveryUOM"] = data.deliveryUOM !== "" ? "" : "Please enter UOM";
      errors.push(error);
      flags.push(
        error.deliveryDesc !== "" ||
          error.deliveryQty !== "" ||
          error.deliveryUOM !== ""
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
        { deliveryDesc: "", deliveryQty: "", deliveryUOM: "" }
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
              <Grid item xs={3}>
                <TextField
                  name="deliveryDesc"
                  label="Description"
                  value={x.deliveryDesc}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].deliveryDesc
                      ? error[i].deliveryDesc
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="deliveryQty"
                  label="Quantity"
                  value={x.deliveryQty}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].deliveryQty ? error[i].deliveryQty : ""
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  name="deliveryUOM"
                  label="UOM"
                  value={x.deliveryUOM}
                  onChange={e => handleInputChange(e, i)}
                  style={{ width: "100%" }}
                  helperText={
                    error[i] && error[i].deliveryUOM ? error[i].deliveryUOM : ""
                  }
                />
              </Grid>
              <Grid item xs={2}>
                {inputList.length !== 1 && inputList.length - 1 !== i && (
                  <IconButton
                    onClick={() => handleRemoveClick(i)}
                    aria-label="delete"
                    className="deleteBtn"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}

                {inputList.length - 1 === i && (
                  <Button onClick={handleAddClick} className="addButton zoom">
                    +
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

export default DeliveryInfo;
