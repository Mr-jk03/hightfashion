import React from "react";

const About = () => {
  return (
    <div className="container" style={{ paddingBottom: "281px" }}>
      <div className="row" style={{ height: "400px" }}>
        <div
          className="col-md-3 col-12 p-3"
          style={{
            height: "100%",
          }}
        >
          <img
            src="https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2015/05/nhan-vien-ban-hang-thoi-trang.jpg"
            alt=""
            style={{
              height: "325px",
              width: "100%",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="col-md-9 col-12 p-3">
          <h5>Về chúng tôi !</h5>
          <p style={{ fontFamily: "roboto" }}>
            Chúng tôi là thương hiệu thời trang cao cấp, nơi phong cách gặp gỡ
            đẳng cấp. Với sứ mệnh mang đến cho khách hàng những trải nghiệm mua
            sắm tinh tế và thời thượng, mỗi sản phẩm tại cửa hàng không chỉ là
            một món đồ thời trang, mà còn là biểu tượng của sự tự tin, sang
            trọng và cá tính riêng biệt. Từ những thiết kế tối giản mang vẻ đẹp
            hiện đại, đến các bộ sưu tập lấy cảm hứng từ xu hướng quốc tế –
            chúng tôi luôn cập nhật và sáng tạo để đáp ứng gu thẩm mỹ của những
            tín đồ thời trang đích thực. Chúng tôi cam kết: Chất lượng hàng đầu:
            Chọn lọc kỹ lưỡng từ chất liệu đến đường may. Thiết kế độc quyền: Đa
            dạng phong cách, đề cao bản sắc cá nhân. Dịch vụ chuyên nghiệp: Hỗ
            trợ tận tâm, giao hàng nhanh chóng và an toàn. Hãy đồng hành cùng
            chúng tôi để khẳng định dấu ấn riêng qua từng bộ trang phục.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
