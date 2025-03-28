import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createOrder, getUrlVnPay } from "../config/apiFunction";
import { toast } from "react-toastify";

const StatusOrder = () => {
  const location = useLocation();
  const [statusPay, setStatusPay] = useState(false);
  useEffect(() => {
    const resData = queryString.parse(location.search);
    if (resData.vnp_ResponseCode === "00") {
      setStatusPay(true);
      const queryStringWithoutQuestionMark = location.search.slice(1);
      getUrlVnPay(queryStringWithoutQuestionMark)
        .then((res: any) => {
          toast.success("Chúc mừng! thanh toán thành công!");
        })
        .catch((error: any) => {
          toast.error("Lỗi cập nhật đơn hàng!");
          console.error(error);
        });
    } else if (resData.vnp_TransactionStatus === "02") {
      setStatusPay(false);
    }
  }, [location.search]);

  return (
    <>
      {statusPay ? (
        <div style={{ height: "100vh", width: "100%" }}>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#25AE88",
            }}
          >
            HIGHT FASHION PAY SUCCESS !
          </h1>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 50 50"
            xmlSpace="preserve"
            fill="#000000"
            style={{ height: "90vh", width: "100%" }}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <circle
                style={{ fill: "#25AE88" }}
                cx="25"
                cy="25"
                r="22"
              ></circle>
              <polyline
                style={{
                  fill: "none",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 10,
                }}
                points="38,15 22,33 12,25"
              ></polyline>
            </g>
          </svg>
        </div>
      ) : (
        <div style={{ height: "100vh", width: "100%" }}>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#D75A4A",
            }}
          >
            HIGHT FASHION PAY ERROR !
          </h1>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 50 50"
            xmlSpace="preserve"
            fill="#000000"
            style={{ height: "90vh", width: "100%" }}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <circle
                style={{ fill: "#D75A4A" }}
                cx="25"
                cy="25"
                r="22"
              ></circle>
              <polyline
                style={{
                  fill: "none",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 10,
                }}
                points="16,34 25,25 34,16"
              ></polyline>
              <polyline
                style={{
                  fill: "none",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 10,
                }}
                points="16,16 25,25 34,34"
              ></polyline>
            </g>
          </svg>
        </div>
      )}
    </>
  );
};

export default StatusOrder;
