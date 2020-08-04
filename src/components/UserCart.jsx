import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddBoxIcon from '@material-ui/icons/AddBox';
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { sendUserInformation } from "../containers/actions/userActions"
import MenuItem from '@material-ui/core/MenuItem';
import ProductStub from "../assets/StubJson"


import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


import {
  IconButton,
  Grid,

} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";

import {
  addtoCart,
  fetchDashboardData,
  productList,
} from "../containers/actions/userActions";

const currencies = [
  {
    label: 'Income',
    name: 'Income',
  },
  {
    label: 'Expenses',
    name: 'Expenses'
  },
];
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),

  },
}));



function UserBox(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [start, setCurrency] = React.useState('EUR');
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };



  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  };

  function handleClick(e) {
    e.preventDefault();
    let dict = {};
    dict['start'] = e.target.start.value;
    dict['description'] = e.target.description.value;
    dict['location'] = e.target.location.value;
    dict['title'] = e.target.title.value;
    dict['notes'] = e.target.notes.value;

    let userdetail = props.user.add_details;
    userdetail.push(dict)

    props.sendUserInformation(userdetail)

    console.log(props.detail)
    console.log(e.target.title.value);
    console.log(e.target.notes.value);


    console.log(e.target.start.value);
    console.log(e.target.description.value);
    console.log(e.target.location.value);
    console.log(props.user.user_detail)
    setOpen(false);

  }
  const classes = useStyles();


  return (
    <div style={{ marginLeft: "auto" }}>
      <IconButton
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClickOpen("paper")}>
        {" "}
        <Badge
          badgeContent={props.user.user_cart && props.user.user_cart.length}
          color="secondary">
          <AddBoxIcon />
        </Badge>
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title">
        <DialogTitle>ADD BUDGET</DialogTitle>
        <FormControl className={classes.margin}>
          <form onSubmit={handleClick}>
            <Grid>

              <Grid style={{ marginTop: "2rem", marginLeft: "2rem" }}>
                <TextField
                  style={{ width: "15rem" }}
                  id="standard-select-currency"
                  select
                  label="Select"
                  value={start}

                  name="start"
                  onChange={handleChange}
                  helperText="Please select"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>


              </Grid>
              <Grid>

                <TextField
                  style={{ width: "6rem", marginTop: "2rem" }}
                  id="standard-select-currency"
                  select
                  label="Select"

                  name="notes"
                // onChange={handleChange}
                // helperText="Please select"
                >
                  {ProductStub.map((option) => (
                    <MenuItem

                      key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>





                <TextField
                  className={classes.margin}
                  style={{
                    marginTop: "2rem",
                    marginLeft: "2rem",
                    width: "10rem"
                  }}
                  id="input-with-icon-textfield"
                  name="location"
                  label="Value"
                  placeholder="0.00"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid>
                <TextField
                  className={classes.margin}
                  style={{
                    marginTop: "2rem",
                    marginLeft: "2rem",
                    width: "15rem"
                  }}
                  id="input-with-icon-textfield"
                  name="description"
                  label="Add Description"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <DialogActions >
              <Button onClick={handleClose} color="primary">
                Cancel
          </Button>
              <Button type="submit" variant="contained" color="primary">Save</Button>

            </DialogActions>
          </form>
        </FormControl>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  addtoCart,
  fetchDashboardData,
  sendUserInformation,
  productList,
})(withRouter(UserBox));
