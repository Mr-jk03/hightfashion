import React, { useState } from "react";
import "../../css/style.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { LoginUser, RegisterAPI } from "../../config/apiFunction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<any>();
  const [passWord, setPassword] = useState<any>();
  const [formRegister, setFormRegister] = useState(false);
  const [email, setEmail] = useState<any>();
  const [passWordRes, setPasswordRes] = useState<any>();
  const [fullName, setFullname] = useState<any>();
  const [phoneNumber, setPhoneNumber] = useState<any>();

  const handleOpenRegisterForm = () => {
    setFormRegister(true);
  };
  const [error, setError] = useState(false);
  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleOnchange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    setError(!validateEmail(value) && value !== "");
  };

  const handleRegidter = () => {
    const regisData = async () => {
      try {
        const res: any = await RegisterAPI(
          fullName,
          email,
          passWordRes,
          phoneNumber
        );
        if (res && !res.isError) {
          toast.success(res.message);
          setFormRegister(false);
          setEmail("");
          setPasswordRes("");
          setFullname("");
          setPhoneNumber("");
        }
      } catch (error: any) {
        toast.error("Vui lòng nhập đầy đủ thông tin");
      }
    };
    regisData();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  
  const handleLogin = () => {
    if (!formRegister) {
      const login = async () => {
        try {
          const res: any = await LoginUser(userName, passWord);
          if (res && !res.isError) {
            toast.success("Chào mừng !");
            navigate("/");
            localStorage.setItem("token", res.token);
            setUserName("");
            setPassword("");
          }
        } catch (err: any) {
          toast.error("Tài khoản không tồn tại!");
        }
      };
      login();
    } else {
      setFormRegister(false);
    }
  };
  return (
    <div className="content">
      <div className="container">
        <div className="row direction">
          <div className="col-sm-12 col-md-6">
            {!formRegister ? (
              <div>
                <div className="mb-4">
                  <h3>
                    Đăng nhập<strong></strong>
                  </h3>
                  <p className="mb-4">
                    Chào mừng bạn đến với HightFashion Website
                  </p>
                </div>
                <div className="form-group first">
                  <label htmlFor="username">Tài khoản</label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="form-control"
                    id="username"
                  />
                </div>
                <div className="form-group last mb-4">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    value={passWord}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
                <div className="d-flex mb-3 align-items-center">
                  <label className="control control--checkbox mb-0">
                    <span className="caption">Lưu</span>
                    <input type="checkbox" />
                    <div className="control__indicator"></div>
                  </label>
                  <span className="ml-auto" style={{ marginLeft: "10px" }}>
                    <a href="#" className="forgot-pass">
                      Quên mật khẩu
                    </a>
                  </span>
                </div>
              </div>
            ) : (
              <div className="row mb-4">
                <div className="">
                  <h3>
                    Đăng kí tài khoản<strong></strong>
                  </h3>
                  <p className="">
                    Điền thông tin bên dưới để đăng kí tài khoản
                  </p>
                </div>
                <div className="col-12 mb-4 form-group first">
                  <TextField
                    id="outlined-password-input"
                    label="Email"
                    type="email"
                    autoComplete="current-password"
                    fullWidth
                    size="small"
                    value={email}
                    onChange={handleOnchange}
                    error={error}
                    helperText={
                      error ? "Vui lòng nhập đúng định dạng email" : ""
                    }
                  />
                </div>
                <div className="col-12 mb-4 form-group first">
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="text"
                    autoComplete="current-password"
                    fullWidth
                    size="small"
                    value={passWordRes}
                    onChange={(e) => setPasswordRes(e.target.value)}
                  />
                </div>
                <div className="col-12 mb-4 form-group first">
                  <TextField
                    id="outlined-password-input"
                    label="Họ tên"
                    type="text"
                    autoComplete="current-password"
                    fullWidth
                    size="small"
                    value={fullName}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="col-12 form-group first">
                  <TextField
                    id="outlined-password-input"
                    label="Điện thoại"
                    type="text"
                    autoComplete="current-password"
                    fullWidth
                    size="small"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Button variant="contained" onClick={handleLogin}>
                  {!formRegister ? "Đăng nhập" : "Quay lại"}
                </Button>
                {formRegister && (
                  <Button
                    variant="contained"
                    sx={{ marginLeft: "10px" }}
                    onClick={handleRegidter}
                  >
                    Đăng kí
                  </Button>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                {!formRegister && (
                  <p
                    className="text-center"
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={handleOpenRegisterForm}
                  >
                    Đăng kí
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <img
              src="https://www.jarvis-legal.com/wp-content/uploads/2020/05/undraw_file_sync_ot38.svg"
              alt="Image"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
