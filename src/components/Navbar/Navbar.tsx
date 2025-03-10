import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import { InputFilterEcagoModal } from "../../customMUI/InputFilter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";

import Menu from "../../Mobile/Menu";

type Props = {
  handleChangeItem: (value: string) => void;
};

const Navbar: FC<Props> = ({ handleChangeItem }) => {
  const navigate = useNavigate();
  const handleChangeFormLogin = () => {
    navigate("/login");
  };
  const [isLogin, setIsLogin] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);
  const [menuMobile, setMenuMobile] = useState(false);
  const [listCategories, setListCategories] = useState<any>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(false);
    } else {
      navigate("/");
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
      <div className="main-header" style={{ padding: "10px 0" }}>
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
              />
            </div>
            <div className="col-sm-4 col-2 d-flex justify-content-end align-items-center">
              <div className="row">
                {!isMobile && (
                  <div className="col-8 d-flex justify-content-end align-items-center">
                    <InputFilterEcagoModal />
                  </div>
                )}
                <div className="col-2 d-flex justify-content-end align-items-center">
                  <ShoppingCartIcon />
                </div>
                {!isMobile && (
                  <div className="col-2 d-flex justify-content-end align-items-center">
                    <AccountCircleIcon />
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
          <div className="container mt-3">
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
              >
                Phụ kiện
              </div>
              <div
                style={{ textTransform: "uppercase", cursor: "pointer" }}
                className="col-2 text-center"
              >
                Khuyến mãi
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
    </>
  );
};

export default Navbar;
