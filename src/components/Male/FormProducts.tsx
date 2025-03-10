import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";

type Props = {
  isMobile: boolean;
  dataForm?: any;
};

const FormProducts: FC<Props> = ({ isMobile, dataForm }) => {
  const [open, setOpen] = useState(false);
  const [valueDialog, setValueDiaLog] = useState<any>();
  const [imageDetail, setImageDetail] = useState<any>();
  const [pricePrd, setPricePrd] = useState();
  const [newPrice, setNewPrice] = useState<number>();
  const [statusPrd, setStatusPrd] = useState("");
  const [inputQuantity, setInputQuantity] = useState(1);
  const handleClose = () => {
    setOpen(false);
    setValueDiaLog("");
    setNewPrice(0);
  };
  const handleOpenDialog = (item: any) => {
    setOpen(true);
    setValueDiaLog(item);
    const imgDetail = item.additional_images
      ? item?.additional_images.split(" ")
      : [];
    setImageDetail(imgDetail);
    if (parseFloat(item?.discount) === 0) {
      setPricePrd(item.price);
      setNewPrice(0);
    } else {
      let discount = parseFloat(item?.discount) || 0;
      let newPrice = item?.price - discount * item?.price;
      setNewPrice(newPrice);
      setPricePrd(item.price);
    }
    if (item?.stock_quantity > 0) {
      setStatusPrd("Còn hàng");
    } else {
      setStatusPrd("Hết hàng");
    }
  };
  return (
    <div className="container" style={{paddingBottom:'281px'}}>
      <div className="row mt-3">
        <div className="col-md-10 col-sm-12">
          <h2 style={{ borderLeft: "9px solid #e45d15", paddingLeft: "10px" }}>
            {dataForm?.[0]?.category_name}
          </h2>
        </div>
        {!isMobile && (
          <div className="col-md-2">
            <Button color="error" variant="outlined">
              Xem thêm
            </Button>
          </div>
        )}
      </div>
      <div className="row">
        <div className="row mt-3">
          {dataForm?.map((item: any, index: number) => (
            <div className="col-md-3 col-6 mb-3" key={index}>
              <div className="product" style={{ cursor: "pointer" }}>
                <div
                  className="box-image"
                  style={{
                    height: "290px",
                    width: "100%",
                  }}
                >
                  <img
                    className="img-product"
                    src={item.product_image}
                    alt=""
                    style={{ height: "100%", width: "100%" }}
                  />
                  <div className="action-prd">
                    <div
                      style={{ height: "40px", width: "100%", padding: "3px" }}
                    >
                      <button onClick={() => handleOpenDialog(item)}>
                        <i className="bi bi-search"></i>
                      </button>
                    </div>
                    <div
                      style={{ height: "40px", width: "100%", padding: "3px" }}
                    >
                      <button>2</button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    height: "33px",
                    padding: "5px",
                  }}
                  className="row"
                >
                  {item.product_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        PaperProps={{
          sx: { width: 1020, height: 650 },
        }}
      >
        <DialogTitle>
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={handleClose}
              >
                x
              </Button>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="row" style={{ height: "100%", padding: "3px" }}>
            <div className="col-12 col-md-6 d-flex justify-content-around">
              <div
                className=""
                style={{
                  height: "80%",
                  width: "350px",
                  border: "1px solid gray",
                  padding: "5px",
                }}
              >
                <img
                  src={valueDialog?.product_image}
                  alt="Ảnh sản phẩm"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div
                className=""
                style={{
                  height: "100%",
                  width: "110px",
                  padding: "5px",
                }}
              >
                {imageDetail?.map((itemDt: any, index: number) => (
                  <div
                    style={{
                      height: "131px",
                      width: "100%",
                      padding: "3px",
                      border: "1px solid gray",
                      marginBottom: "5px",
                    }}
                    key={index}
                  >
                    <img
                      src={itemDt}
                      alt="Ảnh mô tả"
                      style={{
                        height: "100%",
                        width: "100%",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-12">
                  <strong>{valueDialog?.product_name}</strong>
                </div>
                <div className="col-12">
                  <span style={{ fontSize: "15px" }}>
                    Mã sản phẩm: {valueDialog?.id}
                  </span>
                </div>
                <div className="col-12">
                  {newPrice ? (
                    <div className="row-price">
                      <span
                        style={{
                          fontWeight: "700",
                          color: "#e45d15",
                          fontSize: "30px",
                        }}
                      >
                        Giá: {newPrice} <sup>đ</sup>
                      </span>
                      <del style={{ marginLeft: "10px", color: "gray" }}>
                        {pricePrd} <sup>đ</sup>
                      </del>
                    </div>
                  ) : (
                    <div>
                      <span
                        style={{
                          fontWeight: "700",
                          color: "#e45d15",
                          fontSize: "30px",
                        }}
                      >
                        Giá: {pricePrd} <sup>đ</sup>
                      </span>
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <span style={{ fontSize: "15px" }}>
                    Số lượng: {valueDialog?.stock_quantity}
                  </span>
                  <span className="status" style={{ fontSize: "15px" }}>
                    Tình trạng:{" "}
                    <span style={{ color: "rgb(238, 81, 9)" }}>
                      {statusPrd}
                    </span>
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <span style={{ fontSize: "15px" }}>Màu sắc:</span>
                </div>
                <div className="col-12 mt-3">
                  <span style={{ fontSize: "15px" }}>
                    Kích thước: <button>X</button> <button>X</button>{" "}
                    <button>X</button>
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <span style={{ fontSize: "15px" }}>
                    Số lượng:
                    <div className="input-quantity">
                      <button>
                        <AddIcon />
                      </button>
                      <input
                        type="number"
                        value={inputQuantity}
                        min={1}
                        onChange={(e) =>
                          setInputQuantity(Math.max(1, Number(e.target.value)))
                        }
                      />
                      <button>
                        <RemoveIcon />
                      </button>
                    </div>
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <div className="box-btn">
                    <button>Mua hàng</button>
                    <button>
                      <AddShoppingCartIcon /> Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <TextField
                    id=""
                    name=""
                    type="text"
                    label="Mô tả"
                    value={valueDialog?.description}
                    multiline
                    rows={3}
                    fullWidth
                    size="small"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormProducts;
