import {
  Button,
  Checkbox,
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
import {
  addFavoritePrd,
  AddtoCart,
  getUserInfo,
} from "../../config/apiFunction";
import { sizeColor, SizeColor } from "./type/Type";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as reducer from "../../features/redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

type Props = {
  isMobile: boolean;
  dataForm?: any;
  setStatusCart: (value: boolean) => void;
  handleChangeItem: (value: string) => void;
};

const FormProducts: FC<Props> = ({
  isMobile,
  dataForm,
  setStatusCart,
  handleChangeItem,
}) => {
  const dispatch = useDispatch();
  const redux = useSelector((state: RootState) => state.auth);
  const dataFormAuth = redux.form.formData.formAuthentication;
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  const [valueDialog, setValueDiaLog] = useState<any>();
  const [imageDetail, setImageDetail] = useState<any>();
  const [pricePrd, setPricePrd] = useState();
  const [newPrice, setNewPrice] = useState<number>();
  const [statusPrd, setStatusPrd] = useState("");
  const [inputQuantity, setInputQuantity] = useState(1);
  const [colorProduct, setColorProduct] = useState<any>([]);
  const [sizeProduct, setSizeProduct] = useState<any>([]);

  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const [valueSelect, setValueSelect] = useState<SizeColor>(sizeColor);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleClose = () => {
    setOpen(false);
    setValueDiaLog("");
    setNewPrice(0);
    setActiveColor("");
    setActiveSize("");
    setValueSelect({ color: "", size: "" });
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

    const color = JSON.parse(item.color);
    setColorProduct(color);
    const size = JSON.parse(item.size);
    setSizeProduct(size);
  };
  useEffect(() => {
    const resUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await getUserInfo(token);
        setUserInfo(res.result[0]);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    resUser();
  }, []);

  const handleColorClick = (key: string, value: any) => {
    setValueSelect((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === "color") {
      setActiveColor(value);
    } else if (key === "size") {
      setActiveSize(value);
    }
  };

  const handleAddtocart = async () => {
    if (userInfo?.id == undefined) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm!");
    } else if (valueDialog?.id == undefined) {
      toast.error("Vui lòng chọn sản phẩm!");
    } else if (valueSelect.color === "" && valueSelect.size === "") {
      toast.error("Vui lòng chọn Màu sắc và kích thước!");
    } else {
      try {
        const res = await AddtoCart(
          userInfo?.id,
          valueDialog?.id,
          valueSelect?.color,
          valueSelect?.size,
          valueDialog?.brand,
          inputQuantity
        );
        if (res) {
          toast.success("Thêm sản phẩm thành công !");
          setStatusCart(true);
        } else {
          toast.error("Lỗi thêm sản phẩm !");
        }
      } catch (err: any) {
        toast.error(err);
      }
    }
  };
  const handleBuyProduct = (value: any) => {
    if (activeColor === "") {
      toast.error("Vui lòng chọn màu sắc cho sản phẩm !");
    } else if (activeSize === "") {
      toast.error("Vui lòng chọn kích thước cho sản phẩm !");
    } else {
      handleChangeItem("ORDER");
      const obj = {
        user_id: dataFormAuth.user_id,
        id: value.id,
        category_id: value.category_id,
        product_name: value.product_name,
        product_image: value.product_image,
        description: value.description,
        price: newPrice ? newPrice : value.price,
        stock_quantity: inputQuantity,
        color: activeColor,
        size: activeSize,
        brand: value.brand,
      };
      dispatch(reducer.action.buyProduct(obj));
    }
  };

  const handleAddFavoritePrd = async (value: any) => {
    try {
      const res: any = await addFavoritePrd(dataFormAuth.user_id, value.id);
      if (res) {
        toast.success(res.message);
      } else {
        toast.error("Lỗi không thêm được sản phẩm yêu thích");
      }
    } catch (err: any) {
      toast.error(err.errorMessage);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: "281px" }}>
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
                    onClick={() => handleOpenDialog(item)}
                  />
                  <div className="action-prd">
                    <div
                      style={{ height: "40px", width: "100%", padding: "3px" }}
                    >
                      <button
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          onClick={() => handleAddFavoritePrd(item)}
                          {...label}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                        />
                      </button>
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
                  Màu sắc:
                  {colorProduct.map((i: string, index: number) => (
                    <span
                      key={index}
                      className="text-color"
                      style={{
                        backgroundColor:
                          activeColor === i ? "rgb(234, 129, 49)" : "#fff",
                        color: activeColor === i ? "#fff" : "black",
                        marginRight: "10px",
                      }}
                      onClick={() => handleColorClick("color", i)}
                    >
                      {i}
                    </span>
                  ))}
                  Thương hiệu: <b>{valueDialog?.brand}</b>
                </div>
                <div className="col-12 mt-3">
                  Kích thước:
                  {sizeProduct.map((i: string, index: number) => (
                    <span
                      key={index}
                      className="text-color"
                      style={{
                        backgroundColor:
                          activeSize === i ? "rgb(20, 125, 231)" : "#fff",
                        color: activeSize === i ? "#fff" : "black",
                      }}
                      onClick={() => handleColorClick("size", i)}
                    >
                      {i.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div className="col-12 mt-3">
                  <span style={{ fontSize: "15px" }}>
                    Số lượng:
                    <div className="input-quantity">
                      <button
                        onClick={() => setInputQuantity((prev) => prev + 1)}
                      >
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
                      <button
                        onClick={() =>
                          setInputQuantity((prev) => Math.max(1, prev - 1))
                        }
                      >
                        <RemoveIcon />
                      </button>
                    </div>
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <div className="box-btn">
                    <button onClick={() => handleBuyProduct(valueDialog)}>
                      Mua hàng
                    </button>
                    <button onClick={handleAddtocart}>
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
