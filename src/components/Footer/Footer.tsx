import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        height: "200px",
        width: "100%",
        backgroundColor: "#000",
      }}
      className="home-footer"
    >
      <div className="container h-100">
        <div className="row h-100 p-3">
          <div className="col-md-3 col-12">
            <span style={{ color: "#fff" }}>
              <h5>Về chúng tôi</h5>
              <ul>
                <li>Giới thiệu cửa hàng</li>
                <li>Tuyển dụng</li>
                <li>Hệ thống cửa hàng</li>
                <li>Liên hệ</li>
              </ul>
            </span>
          </div>
          <div className="col-md-3 col-12">
            <span style={{ color: "#fff" }}>
              <h5>Chính sách</h5>
              <ul>
                <li>Chính sách đổi trả</li>
                <li>Chính sách bảo mật</li>
                <li>Chính sách vận chuyển</li>
                <li>Hướng dẫn mua hàng</li>
              </ul>
            </span>
          </div>
          <div className="col-md-3 col-12">
            <span style={{ color: "#fff" }}>
              <h5>Hỗ trợ khách hàng</h5>
              <ul>
                <li>Hướng dẫn chọn size</li>
                <li>Kiểm tra đơn hàng</li>
                <li>Phương thức thanh toán</li>
                <li>Câu hỏi thường gặp</li>
              </ul>
            </span>
          </div>
          <div className="col-md-3 col-12">
            <span style={{ color: "#fff" }}>
              <h5>Liên hệ</h5>
              <ul>
                <li>Địa chỉ: 123 Phúc Diễn, Bắc Từ Liêm, Hà Nội</li>
                <li>Hotline: 0987 654 321</li>
                <li>Email: cskh@tenweb.vn</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
