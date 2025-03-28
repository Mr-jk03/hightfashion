import React, { useEffect, useReducer, useState } from "react";
import { getUserInfo, uploadAvata } from "../../config/apiFunction";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import { blue } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { orange } from "@mui/material/colors";
import { pink } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ChangePass from "./ChangePass/ChangePass";
import * as reducer from "../../features/redux/reducer";
import { useDispatch } from "react-redux";

const UserInfo = () => {
  const actionLogout = useDispatch();
  const [user, setUser] = useState<any>();
  const [showUlMenu, setshowUlMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const resUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await getUserInfo(token);
        setUser(res.result[0]);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    resUser();
  }, []);
  const initialState = { activeComponent: "MY_ACCOUNT" };

  const menuReducer = (state: any, action: any) => {
    switch (action.type) {
      case "MY_ACCOUNT":
        return { activeComponent: "MY_ACCOUNT" };
      case "ORDERS":
        return { activeComponent: "ORDERS" };
      case "NOTIFICATIONS":
        return { activeComponent: "NOTIFICATIONS" };
      case "VOUCHERS":
        return { activeComponent: "VOUCHERS" };
      case "FAVORITES":
        return { activeComponent: "FAVORITES" };
      case "CHANGE_PASS":
        return { activeComponent: "CHANGE_PASS" };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(menuReducer, initialState);
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Vui lòng chọn ảnh!");
      return;
    }

    const formData = new FormData();
    formData.append("avata", file);
    formData.append("id", user?.id); // ID user cần cập nhật avatar

    try {
      const res = await uploadAvata(formData);
      toast.success(res.message);
      setUser((prev: any) => ({ ...prev, avata: res.avatar })); // Cập nhật avatar mới
    } catch (error: any) {
      toast.error("Lỗi khi load ảnh", error);
    }
  };
  const handleShowMenu = () => {
    setshowUlMenu(!showUlMenu);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Xác nhận Đăng xuất",
      icon: "warning",
      showCancelButton: true,
      text: "Bạn có chắc chắn đăng xuất không ?",
      confirmButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
    });
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      actionLogout(reducer.action.logout());
      navigate("/login");
    }
  };

  return (
    <div className="main-logged" style={{ paddingBottom: "381px" }}>
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-4">
            <div className="avt-us-logged">
              <div className="avt-img">
                <img
                  src={user?.avata || "/default-avatar.png"}
                  alt="Avatar"
                  style={{ borderRadius: "14%", boxShadow: "1px 2px 3px gray" }}
                />
              </div>
              <button>
                <CreateIcon fontSize="small" />
                Sửa hồ sơ
              </button>
            </div>
            <div className="ul-menu-us-lg">
              <ul>
                <li className="li-cha-us" onClick={handleShowMenu}>
                  {/* <FaUserAlt className="FaUserAlt" /> */}
                  <AccountCircleIcon
                    fontSize="small"
                    sx={{ color: blue[500] }}
                  />
                  <span>Tài khoản của tôi</span>
                  {showUlMenu && (
                    <ul className="li-con-us">
                      <li>
                        <span onClick={() => dispatch({ type: "MY_ACCOUNT" })}>
                          Hồ Sơ
                        </span>
                      </li>
                      <li>
                        <span onClick={() => dispatch({ type: "CHANGE_PASS" })}>
                          Đổi mật khẩu
                        </span>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="li-cha-us">
                  <ContentPasteIcon
                    fontSize="small"
                    sx={{ color: blue[300] }}
                  />
                  <span onClick={() => dispatch({ type: "ORDERS" })}>
                    Đơn mua
                  </span>
                </li>
                <li className="li-cha-us">
                  <NotificationsActiveIcon
                    fontSize="small"
                    sx={{ color: red[600] }}
                  />
                  <span onClick={() => dispatch({ type: "NOTIFICATIONS" })}>
                    Thông báo
                  </span>
                </li>
                <li className="li-cha-us">
                  <ConfirmationNumberIcon
                    fontSize="small"
                    sx={{ color: orange[900] }}
                  />
                  <span onClick={() => dispatch({ type: "VOUCHERS" })}>
                    Kho VouCher
                  </span>
                </li>
                <li className="li-cha-us">
                  <FavoriteIcon fontSize="small" sx={{ color: pink[500] }} />
                  <span onClick={() => dispatch({ type: "FAVORITES" })}>
                    Sản phẩm yêu thích
                  </span>
                </li>
                <li className="li-cha-us">
                  <LogoutIcon fontSize="small" sx={{ color: grey[500] }} />
                  <span onClick={handleLogout}>Đăng xuất</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-8">
            {state.activeComponent === "MY_ACCOUNT" && (
              <div className="row right-body">
                <div className="col-xl-12">
                  <h3>Hồ sơ của tôi</h3>
                </div>
                <div className="col-12 col-md-8 info-left">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Tên Đăng Nhập
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={user?.email}
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Tên"
                      readOnly
                      value={user?.full_name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      readOnly
                      value={user?.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Số Điện Thoại
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={user?.phone}
                      placeholder="Số điện thoại"
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Giới tính
                    </label>
                    <div className="gender">
                      <span>Nam</span>
                      <input type="radio" name="gender" value="male"></input>
                      <span>Nữ</span>
                      <input type="radio" name="gender" value="female"></input>
                      <span>Khác</span>
                      <input type="radio" name="gender" value="other"></input>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Ngày sinh
                    </label>
                    <input
                      type="date"
                      className="date"
                      value={user?.birthday}
                    />
                  </div>
                  <button className="btn-save-infor">Lưu</button>
                </div>
                <div className="col-12 col-md-4 text-center form-avt">
                  <div className="box-avt">
                    <img
                      src={user?.avata || "/default-avatar.png"}
                      alt="Avatar"
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor="choosse-file"
                      style={{
                        fontSize: "14px",
                        margin: "7px",
                        cursor: "pointer",
                      }}
                    >
                      Chọn ảnh
                    </label>
                    <input
                      id="choosse-file"
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <button onClick={handleUpload}>Tải lên</button>
                  </div>
                </div>
              </div>
            )}
            <div className="row menureducer">
              {state.activeComponent === "ORDERS" && "1"}
              {state.activeComponent === "NOTIFICATIONS" && "2"}
              {state.activeComponent === "VOUCHERS" && "3"}
              {state.activeComponent === "FAVORITES" && "4"}
              {state.activeComponent === "CHANGE_PASS" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
