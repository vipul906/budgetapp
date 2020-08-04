import React, { Component } from "react";
import Appbar from "./Appbar";

import ProductStub from "../assets/StubJson";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addtoCart, productList } from "../containers/actions/userActions";

import Header from "../components/Header";





class Dashboard extends Component {
  state = {
    newProductList: ProductStub,
    anchorEl: null,
    person: [],
  };
  ITEM_HEIGHT = 48;


  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };


  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  deleteFromCart = (product) => {
    console.log("d");
    let usercart = this.props.user.user_cart;
    let productlist = this.props.user.not_add_into_cart;
    let index = usercart.indexOf(product);
    usercart.splice(index, 1);
    let tmp = parseFloat(this.props.user.total_cost);
    tmp = tmp - product.price;
    tmp = tmp.toFixed(2);

    this.props.addtoCart([usercart, tmp]);


    productlist.push(product);
    this.props.fetchDashboardData(productlist);
    let updatedList = this.props.user.product_list;
    updatedList.push(product);
    this.props.productList(updatedList);
  };

  render() {

    return (
      <div>
        <div style={{ height: "5rem" }}>
          <Appbar />
        </div>
        <Header />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  productList,
  addtoCart,
})(withRouter(Dashboard));
