import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import {
   getProduct,
   addProduct,
   editProduct,
   deleteProduct,
} from "../src/redux/action/action";
import { connect } from "react-redux";

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         id: 0,
         productName: "",
         productCategory: "",
      };
   }

   static propTypes = {
      products: PropTypes.array.isRequired,
      getProduct: PropTypes.func.isRequired,
      addProduct: PropTypes.func.isRequired,
      editProduct: PropTypes.func.isRequired,
      deleteProduct: PropTypes.func.isRequired,
   };

   componentDidMount() {
      this.props.getProduct();
   }

   submitData = () => {
      if (
         this.state.productName &&
         this.state.productCategory &&
         !this.state.id
      ) {
         const newProduct = {
            id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
            productName: this.state.productName,
            productCategory: this.state.productCategory,
         };

         this.props.addProduct(newProduct);
      } else if (
         this.state.productName &&
         this.state.productCategory &&
         this.state.id
      ) {
         const updatedDetails = {
            id: this.state.id,
            productName: this.state.productName,
            productCategory: this.state.productCategory,
         };

         this.props.editProduct(updatedDetails);
      } else {
         alert("Enter Product Details.");
      }

      this.clearData();
   };

   editDetails = (data) => {
      this.setState({
         id: data.id,
         productName: data.productName,
         productCategory: data.productCategory,
      });
   };

   deleteProduct = (id) => {
      this.clearData();
      if (window.confirm("Are you sure?")) {
         this.props.deleteProduct(id);
      }
   };

   handleNameChange = (e) => {
      this.setState({
         productName: e.target.value,
      });
   };

   handleDepartmentChange = (e) => {
      this.setState({
         productCategory: e.target.value,
      });
   };

   clearData = () => {
      this.setState({
         id: 0,
         productName: "",
         productCategory: "",
      });
   };

   render() {
      return (
         <div className="App">
            <p className="App-intro">
               <div className="leftsection">
                  Product Name :{" "}
                  <input
                     onChange={this.handleNameChange}
                     value={this.state.productName}
                     type="text"
                     placeholder="Product Name"
                  />{" "}
                  <br />
                  Product Category :{" "}
                  <input
                     onChange={this.handleDepartmentChange}
                     value={this.state.productCategory}
                     type="text"
                     placeholder="Product Category"
                  />
                  <br />
                  {this.state.id ? (
                     <button onClick={this.submitData}>UPDATE</button>
                  ) : (
                     <button onClick={this.submitData}>ADD</button>
                  )}{" "}
                  <button onClick={this.clearData}>CLEAR</button>
               </div>
               <div className="rightsection">
                  <table>
                     <thead>
                        <tr>
                           <th>ID</th>
                           <th>Name</th>
                           <th>Product Category</th>
                           <th>Action(s)</th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.props.products &&
                           this.props.products.map((data, index) => {
                              return (
                                 <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{data.productName}</td>
                                    <td>{data.productCategory}</td>
                                    <td>
                                       <button
                                          onClick={() => this.editDetails(data)}
                                       >
                                          EDIT
                                       </button>{" "}
                                       <button
                                          onClick={() =>
                                             this.deleteProduct(data.id)
                                          }
                                       >
                                          DELETE
                                       </button>{" "}
                                    </td>
                                 </tr>
                              );
                           })}
                     </tbody>
                  </table>
               </div>
            </p>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   products: state.products,
});

export default connect(mapStateToProps, {
   getProduct,
   addProduct,
   editProduct,
   deleteProduct,
})(App);
