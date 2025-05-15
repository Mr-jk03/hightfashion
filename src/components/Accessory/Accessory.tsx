import { Button } from "@mui/material";
import React, { FC } from "react";

type Props = {
  isMobile: any;
};

const Accessory: FC<Props> = ({ isMobile }) => {
  return (
    <div className="container" style={{ paddingBottom: "281px" }}>
      <div className="row mt-3">
        <div
          className="col-md-10 col-sm-12"
          style={{ borderLeft: "9px solid #e45d15", paddingLeft: "10px" }}
        >
          <h2>PHỤ KIỆN</h2>
          <span>Các loại phụ kiện đi cùng với trang phục của bạn!</span>
        </div>
        {!isMobile && (
          <div className="col-md-2">
            <Button color="error" variant="outlined">
              Xem thêm
            </Button>
          </div>
        )}
      </div>
      <div
        className="row"
        style={{
          height: "450px",
        }}
      >
        <div className="col-4">
          <img
            src="https://longbeachpearl.com/wp-content/uploads/2023/12/trang-suc-nu-1.png"
            alt="Phụ kiện"
            style={{
              height: "auto",
              width: "100%",
            }}
          />
        </div>
        <div className="col-8 parentGrid">
          <div>
            <div className="parentGrid2">
              <div className="childdrent">
                <img
                  style={{
                    height: "100%",
                    width: "60%",
                  }}
                  src="https://longbeachpearl.com/wp-content/uploads/2023/12/trang-suc-nu-1.png"
                  alt=""
                />
              </div>
              <div className="childrent2">
                <p
                  style={{
                    fontFamily: "roboto",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Tên sản phẩm
                </p>
                <div
                  style={{
                    display: "grid",
                    fontFamily: "roboto",
                  }}
                >
                  <span style={{ color: "#ff5a00", fontWeight: "bold" }}>
                    320.000 <sup>đ</sup>
                  </span>
                  <span style={{ cursor: "pointer" }}>Xem chi tiết</span>
                </div>
              </div>
            </div>
            <div className="parentGrid2">
              <div className="childdrent">
                <img
                  style={{
                    height: "100%",
                    width: "60%",
                  }}
                  src="https://longbeachpearl.com/wp-content/uploads/2023/12/trang-suc-nu-1.png"
                  alt=""
                />
              </div>
              <div className="childrent2">
                <p
                  style={{
                    fontFamily: "roboto",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Tên sản phẩm
                </p>
                <div
                  style={{
                    display: "grid",
                    fontFamily: "roboto",
                  }}
                >
                  <span style={{ color: "#ff5a00", fontWeight: "bold" }}>
                    320.000 <sup>đ</sup>
                  </span>
                  <span style={{ cursor: "pointer" }}>Xem chi tiết</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessory;
