import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getListFavoriteProduct } from "../../../config/apiFunction";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const FavoriteProducts = () => {
  const user_id = useSelector((state: RootState) => state).auth.form.formData
    .formAuthentication.user_id;
  const [dataFavorite, setDatFavorite] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getListFavoriteProduct(user_id);
        if (res) {
          setDatFavorite(res.data);
        }
      } catch (err: any) {
        toast.error("Lỗi liên quan đến netWork");
      }
    };
    getData();
  }, []);
  return (
    <div className="row" style={{ height: "150px", margin: "0 auto" }}>
      {dataFavorite.length > 0 ? (
        <div
          className="col-2"
          style={{
            margin: "auto 0",
            border: "1px solid gray",
            borderRadius: "5px",
          }}
        >
          <img
            style={{ height: "auto", width: "100%" }}
            src=""
            alt=""
          />
        </div>
      ) : (
        <div className="col-12 d-flex justify-content-center align-items-center">
          <p>Không có sản phẩm yêu thích</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteProducts;
