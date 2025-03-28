import React from "react";

const ChangePass = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="changs-title">
          <h3>Đổi mật khẩu</h3>
          <span>
            Để đảm bảo thông tin, vui lòng không chia sẻ mật khẩu cho người khác
          </span>
        </div>
        <div className="main-chance">
          <div className="col-xl-12 mg-line">
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-3 d1">
                <span>Mật khẩu hiện tại</span>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-6 d1">
                <input type="text" />
              </div>
              <div className="col-xl-5 col-lg-3 col-md-3 d1">
                <a>quên mật khẩu ?</a>
              </div>
            </div>
          </div>
          <div className="col-xl-12 mg-line">
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-3 d1">
                <span>Mật khẩu mới</span>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-6 d1">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="col-xl-12 mg-line">
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-3 d1">
                <span>Xác nhận mật khẩu</span>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-6 d1">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="col-xl-12 mg-line">
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-3 d1"></div>
              <div className="col-xl-5 col-lg-6 col-md-6 d1">
                <button>Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
