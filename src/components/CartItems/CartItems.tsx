import { Button, Checkbox } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { red, teal } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { DeleteItems } from "../../config/apiFunction";
import { toast } from "react-toastify";
import * as reducer from "../../features/redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

type Props = {
  cartItems: any;
  handleShowCartItems: (value: boolean) => void;
  handleDeleteCartItems: (value: any) => void;
  handleChangeItem: (value: string) => void;
};

const CartItems: FC<Props> = ({
  cartItems,
  handleShowCartItems,
  handleDeleteCartItems,
  handleChangeItem,
}) => {
  const dispatch = useDispatch();
  const redux = useSelector((state: RootState) => state.auth);
  const dataFormAuth = redux.form.formData.formAuthentication;
  const handleBuyProductfromCart = (item: any) => {
    handleShowCartItems(false)
    handleChangeItem("ORDER");
    let obj = {
      user_id: dataFormAuth.user_id,
      id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image,
      description: item.description,
      price: item.price,
      stock_quantity: item.quantity,
      color: item.color,
      size: item.size,
    };
    dispatch(reducer.action.buyProduct(obj));
  };
  return (
    <div
      style={{
        width: "427px",
        height: "100%",
        overflowY: "auto",
        padding: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "7px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Giỏ hàng</span>
        <Button size="small" variant="text" sx={{ color: teal[200] }}>
          Clear All
        </Button>
        <Button
          variant="contained"
          onClick={() => handleShowCartItems(false)}
          sx={{ backgroundColor: red[500] }}
        >
          x
        </Button>
      </div>
      {cartItems?.map((i: any, index: number) => (
        <div className="cart-items mb-2" key={index}>
          <div className="list-cart-items" style={{ height: "100%" }}>
            <div className="">
              <img
                src={i?.product_image}
                alt="item"
                style={{
                  height: "117px",
                  width: "117px",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div className="">
              <div
                style={{
                  maxHeight: "35px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <p style={{ fontSize: "13px", fontWeight: "bold" }}>
                  {i?.product_name}
                </p>

                <span
                  onClick={() => handleDeleteCartItems(i)}
                  style={{ cursor: "pointer", width: "36px", height: "36px" }}
                >
                  <DeleteIcon fontSize="small" />
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px" }}>
                  Kích thước: <b>{i?.size}</b>
                </span>
                <span style={{ fontSize: "13px" }}>
                  Màu sắc: <b>{i?.color}</b>
                </span>
              </div>
              <span style={{ fontSize: "13px" }}>
                Số lượng: <b>{i?.quantity}</b>{" "}
              </span>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  Tổng:{" "}
                  <b>
                    {(i?.quantity || 0) * (i?.price || 0)}
                    <sup>đ</sup>
                  </b>
                </span>

                <Button
                  variant="contained"
                  sx={{ backgroundColor: red[500] }}
                  size="small"
                  onClick={() => handleBuyProductfromCart(i)}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
