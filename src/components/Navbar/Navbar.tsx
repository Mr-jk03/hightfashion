import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import { InputFilterEcagoModal } from "../../customMUI/InputFilter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import * as reducer from "../../features/redux/reducer";

import Menu from "../../Mobile/Menu";
import { Drawer } from "@mui/material";
import CartItems from "../CartItems/CartItems";
import {
  AddtoCart,
  DeleteItems,
  GetcartItems,
  getUserInfo,
  TotalItems,
} from "../../config/apiFunction";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type Props = {
  handleChangeItem: (value: string) => void;
  statusCart: boolean;
};

const Navbar: FC<Props> = ({ handleChangeItem, statusCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeFormLogin = () => {
    navigate("/login");
  };
  const [isLogin, setIsLogin] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  const [menuMobile, setMenuMobile] = useState(false);
  const [listCategories, setListCategories] = useState<any>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [user, setUser] = useState<any>();
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(false);
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleShowMenuMobile = () => {
    setMenuMobile(!menuMobile);
  };
  useEffect(() => {
    const resUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await getUserInfo(token);
        if (res) {
          setUser(res.result[0]);
          dispatch(reducer.action.authen(res.result[0]));
          const resCartItems: any = await GetcartItems(res.result[0].id);
          if (resCartItems) {
            setCartItems(resCartItems.data);
          } else {
            toast.error("Lỗi lấy thông tin giỏ hàng");
          }
        }
      } catch (error) {
        console.error("Lỗi liên quan đến network");
      }
    };
    resUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      const fetchTotalItems = async () => {
        try {
          const res: any = await TotalItems(user.id);
          if (res) {
            setTotalItems(res.total);
          } else {
            toast.error("Lỗi tổng số lượng sản phẩm");
          }
        } catch (err: any) {
          toast.error("Lỗi network");
        }
      };
      fetchTotalItems();
    }
  }, [user?.id]);
  useEffect(() => {
    if (statusCart && user?.id) {
      const fetchUpdatedCartInfo = async () => {
        try {
          const totalRes: any = await TotalItems(user.id);
          if (totalRes) {
            setTotalItems(totalRes.total);
          } else {
            toast.error("Lỗi tổng số lượng sản phẩm");
          }

          const cartRes: any = await GetcartItems(user.id);
          if (cartRes) {
            setCartItems(cartRes.data);
          } else {
            toast.error("Lỗi lấy thông tin giỏ hàng");
          }
        } catch (err: any) {
          toast.error("Lỗi network");
        }
      };
      fetchUpdatedCartInfo();
    }
  }, [statusCart]);
  const handleShowCartItems = async (value: boolean) => {
    setOpenDrawer(value);
  };
  const handleDeleteCartItems = async (i: any) => {
    handleShowCartItems(false);
    const result = await Swal.fire({
      title: "Xác nhận ?",
      icon: "warning",
      text: `Xóa sản phẩm ${i.product_name}`,
      showCancelButton: true,
      confirmButtonText: "Xóa",
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "##283593",
      cancelButtonText: "Hủy",
    });
    if (result.isConfirmed) {
      const res = await DeleteItems(i.id);
      if (res) {
        toast.success("Xóa sản phẩm thành công!");
        setCartItems((prevCart: any) =>
          prevCart.filter((item: any) => item.id !== i.id)
        );
        if (user?.id) {
          try {
            const resTotal: any = await TotalItems(user.id);
            if (resTotal) {
              setTotalItems(resTotal.total);
            } else {
              toast.error("Lỗi tổng số lượng sản phẩm");
            }
          } catch (err: any) {
            toast.error("Lỗi network");
          }
        }
      } else {
        toast.error("Lỗi xóa sản phẩm");
      }
    } else {
      handleShowCartItems(true);
    }
  };

  return (
    <>
      {isLogin && (
        <div
          style={{ width: "100%", height: "30px", backgroundColor: "#FF6E0D" }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-8 mt-1 d-flex justify-content-left align-items-center"
                style={{ height: "25px", fontSize: "12px", color: "#fff" }}
              >
                Chào mừng bạn đến với HightFashion
              </div>
              <div
                className="col-4 mt-1 d-flex justify-content-end align-items-center"
                style={{ height: "25px", fontSize: "12px", color: "#fff" }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={handleChangeFormLogin}
                >
                  Đăng nhập | Đăng kí
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="main-header"
        style={{ padding: "10px 0", marginBottom: "14px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-4 col-2 d-flex justify-content-left align-items-center">
              {isMobile ? (
                <div className="menu-position">
                  <MenuIcon onClick={handleShowMenuMobile} />
                  {menuMobile && (
                    <div
                      className={`menu-absolute ${menuMobile ? "active" : ""}`}
                      style={{ zIndex: "999" }}
                    >
                      <Menu
                        menuMobile={menuMobile}
                        handleChangeItem={handleChangeItem}
                        handleShowMenuMobile={handleShowMenuMobile}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="row">
                  <div className="col-3 d-flex justify-content-end align-items-center">
                    <CallIcon />
                  </div>
                  <div className="col-9 mt-3">
                    <span>Hotline:</span>
                    <p style={{ color: "#e45d15", fontWeight: "bold" }}>
                      1900 7788
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-sm-4 col-8">
              <img
                style={{ height: "100%", width: "100%" }}
                src="https://bizweb.dktcdn.net/100/311/013/themes/802137/assets/logo.png?1718007850853"
                alt=""
              />
            </div>
            <div className="col-sm-4 col-2 d-flex justify-content-end align-items-center">
              <div className="row" style={{ width: "374px" }}>
                {!isMobile && (
                  <div className="col-8 d-flex justify-content-end align-items-center">
                    {/* <InputFilterEcagoModal /> */}
                  </div>
                )}
                <div className="col-2 d-flex justify-content-end align-items-center">
                  <span
                    onClick={() => handleShowCartItems(true)}
                    style={{ cursor: "pointer", position: "relative" }}
                  >
                    <span className="totalItems">{totalItems}</span>
                    <ShoppingCartIcon />
                  </span>
                </div>
                {!isMobile && (
                  <div className="col-2 d-flex justify-content-end align-items-center">
                    <span
                      onClick={() => handleChangeItem("USER")}
                      style={{ cursor: "pointer" }}
                    >
                      <AccountCircleIcon />
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-12 col-xs-12 visible-xs">
              <InputFilterEcagoModal />
            </div>
          </div>
        </div>
        {!isMobile && (
          <div className="container mt-3 shadown">
            <div className="row">
              <div className="col-2">
                <p
                  onClick={() => handleChangeItem("MAINHOME")}
                  style={{ color: "#575454", cursor: "pointer" }}
                >
                  TRANG CHỦ
                </p>
              </div>

              <div
                style={{ textTransform: "uppercase", cursor: "pointer" }}
                className="col-2 text-center"
                onClick={() => handleChangeItem("MALEFORM")}
              >
                Nam
              </div>
              <div
                style={{ textTransform: "uppercase", cursor: "pointer" }}
                className="col-2 text-center"
                onClick={() => handleChangeItem("FEMALEFORM")}
              >
                Nữ
              </div>
              <div
                style={{ textTransform: "uppercase", cursor: "pointer" }}
                className="col-2 text-center"
                onClick={() => handleChangeItem("ACCESSORY")}
              >
                Phụ kiện
              </div>
              <div
                style={{ textTransform: "uppercase", cursor: "pointer" }}
                className="col-2 text-center"
                onClick={() =>handleChangeItem('ABOUT')}
              >
                Về chúng tôi
              </div>
              <div
                style={{ textTransform: "uppercase", cursor: "pointer" }}
                className="col-2 text-center"
              >
                Liên hệ
              </div>
            </div>
          </div>
        )}
      </div>
      <Drawer
        open={openDrawer}
        onClose={() => handleShowCartItems(false)}
        anchor="right"
      >
        <CartItems
          cartItems={cartItems}
          handleShowCartItems={handleShowCartItems}
          handleDeleteCartItems={handleDeleteCartItems}
          handleChangeItem={handleChangeItem}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
