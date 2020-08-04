import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  backToHome,
  productList,
  addtoCart,
} from "../containers/actions/userActions";
import HomeIcon from "@material-ui/icons/Home";
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';


import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserCart from "../components/UserCart";
import ProductStub from "../assets/StubJson";
import Grid from "@material-ui/core/Grid";
import { sendUserInformation } from "../containers/actions/userActions"


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),

    height: "50%",
  },
  title: {
    flexGrow: 1,
  },
}));

function PrimarySearchAppBar(props) {

  const handleChange = (event) => {
    let currency = event.target.value;
    console.log(currency, event.target.value)
    componentDidMount(currency)
  };

  function componentDidMount(currency) {
    fetch('https://api.exchangeratesapi.io/latest?base=' + currency)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          conversion(result, currency)
        },
      )

  }
  function conversion(result, currency) {
    let rates = result.rates

    let detail = props.user.add_details
    for (var i = 0; i < detail.length; i++) {
      console.log(detail[i])
      let price = parseFloat(detail[i].location)
      let curr = detail[i].notes
      let note = parseFloat(rates[curr])
      price = price * note
      detail[i].notes = currency
      detail[i].location = price.toFixed(3)
      console.log(price, curr, note, rates)

    }
    props.sendUserInformation(detail)

  }


  const classes = useStyles();

  return (
    <AppBar style={{ position: "fixed", backgroundColor: "steelblue" }}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          onClick={props.backToHome}
          color="inherit"
          aria-label="home">
          <HomeIcon />
        </IconButton>
        <Grid>
          <TextField
            style={{ width: "12rem" }}
            id="standard-select-currency"
            select
            label="Select"

            name="start"
            onChange={handleChange}
            helperText="Please select"
          >
            {ProductStub.map((option) => (
              <MenuItem

                key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <UserCart />
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  productList,
  addtoCart,
  backToHome,
  sendUserInformation,
})(withRouter(PrimarySearchAppBar));
