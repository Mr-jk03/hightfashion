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
      <div className="row">
        <div className="col-4">
          <img src="" alt="Phụ kiện" />
        </div>
        <div className="col-8"></div>
      </div>
    </div>
  );
};

export default Accessory;
