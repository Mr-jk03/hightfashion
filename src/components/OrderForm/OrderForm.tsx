import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import * as reducer from "../../features/redux/reducer";
import { toast } from "react-toastify";
import {
  apihuyen,
  apiTinhThanh,
  apixa,
  createOrder,
  getUserInfo,
  payOnVNPay,
} from "../../config/apiFunction";
import { address, ADDRESS } from "../Male/type/Type";
import Fireworks from "fireworks-js";

type Props = {
  isMobile: boolean;
};

const OrderForm: FC<Props> = ({ isMobile }) => {
  const redux = useSelector((state: RootState) => state.auth);
  const dataForm = redux.form.formData.formBuyProducts || [];
  const dataFormAuth = redux.form.formData.formAuthentication;
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [province, setProvince] = useState<any>([]);
  const [selectedProvince, setSelectedProvince] = useState(Number || undefined);
  const [district, setDistrict] = useState<any>([]);
  const [selectedDistrict, setSelectedDistrict] = useState(Number || undefined);
  const [commune, setCommune] = useState<any>([]);
  const [selectedCommune, setSelectedCommune] = useState(Number || undefined);
  const [payMethod, setPaymethod] = useState("");
  const [btnType, setBtnType] = useState(false);
  const [valueAddress, setValueAddress] = useState<ADDRESS>(address);
  const [detailAddress, setDetailAddress] = useState("");
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const showFireworks = () => {
    const container = document.getElementById("fireworks-container");
    if (container) {
      const fireworks = new Fireworks(container);
      fireworks.start();
      setTimeout(() => {
        fireworks.stop();
      }, 5000); // Dừng sau 5 giây
    }
  };

  useEffect(() => {
    const total = dataForm.reduce(
      (sum: any, product: any) => sum + product.price * product.stock_quantity,
      0
    );
    setTotalPrice(total);
  }, [dataForm]);

  const handleRemoveItem = (id: any) => {
    dispatch(reducer.action.deleteItemOrder(id));
  };

  useEffect(() => {
    const resData = async () => {
      try {
        const res: any = await apiTinhThanh();
        if (res) {
          setProvince(res.data);
        }
      } catch (err: any) {
        toast.error("Lỗi lấy dữ liệu tỉnh thành!");
      }
    };
    resData();
  }, []);

  const handleOnChangeProvince = (event: any) => {
    setSelectedProvince(event.target.value);
  };

  useEffect(() => {
    const District = async () => {
      try {
        const res: any = await apihuyen(selectedProvince);
        if (res) {
          setDistrict(res.data);
        }
      } catch (err: any) {
        toast.error("Lỗi lấy dữ liệu huyện !");
      }
    };
    District();
  }, [selectedProvince]);

  useEffect(() => {
    const Commune = async () => {
      try {
        const res: any = await apixa(selectedDistrict);
        if (res) {
          setCommune(res.data);
        }
      } catch (err: any) {
        toast.error("Lỗi lấy dữ liệu xã !");
      }
    };
    Commune();
  }, [selectedDistrict]);

  useEffect(() => {
    if (payMethod === "0" || payMethod === "") {
      setBtnType(false);
    } else if (payMethod === "1") {
      setBtnType(true);
    }
  }, [payMethod]);

  const handleOnclickAddress = (key: string, value: string) => {
    setValueAddress((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleOrder = async () => {
    if (dataForm.length < 1) {
      toast.error("Chưa có sản phẩm, Vui lòng chọn sản phẩm !");
      return;
    }
    if (!dataFormAuth.user_id) {
      toast.error("Vui lòng đăng nhập để đặt hàng !");
      return;
    }
    if (payMethod === "") {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }
    if (detailAddress === "") {
      toast.error("Vui lòng điền địa chỉ đề xuất");
      return;
    }
    if (
      valueAddress.province === "" &&
      valueAddress.district === "" &&
      valueAddress.commune === ""
    ) {
      toast.error("Vui lòng điền các thông tin tỉnh / huyện / xã");
      return;
    }

    try {
      const address = `${valueAddress.commune}, ${valueAddress.district}, ${valueAddress.province}`;
      const obj = {
        user_id: dataFormAuth.user_id,
        payment_method: payMethod,
        address: address,
        detail_address: detailAddress,
        totalPrice: totalPrice,
        items: dataForm.map((product: any) => ({
          product_id: product.id,
          product_image: product.product_image,
          color: product.color,
          size: product.size,
          quantity: product.stock_quantity,
          price: product.price,
          brand: product.brand,
        })),
      };
      if (obj.payment_method === "0") {
        const res: any = await createOrder(obj);
        if (res) {
          toast.success("Chúc mừng 🎉🎉🎉 đặt đơn hàng thành công");
          setIsOrderSuccess(true);
          showFireworks();
        } else {
          toast.error("Lỗi khi đặt đơn hàng");
        }
      } else if (obj.payment_method === "1" && totalPrice !== 0) {
        const objVN = {
          orderId: dataForm?.map((prd: any) => prd.id).join(","),
          amount: totalPrice,
          userId: dataFormAuth.user_id,
        };
        payOnVNPay(obj)
          .then((res: any) => {
            if (res) {
              window.open(res.paymentUrl, "_blank");
              dispatch(reducer.action.addlistModel(obj));
            } else {
              toast.error("Lỗi thanh toán đơn hàng !");
            }
          })
          .catch((err: any) => {
            toast.error(err);
          });
      }
    } catch (err: any) {
      toast.error("Lỗi network khi đặt hàng");
    }
  };

  return (
    <div className="main-body-cart" style={{ paddingBottom: "281px" }}>
      <div className="container">
        {isOrderSuccess && (
          <div id="fireworks-container" className="fireworks-container"></div>
        )}
        <div className="row tb-head">
          <div className="col-xl-5 col-lg-4">Sản phẩm</div>
          <div className="col-xl-1 col-lg-1">Đơn giá</div>
          <div className="col-xl-1 col-lg-1">Kích thước</div>
          <div className="col-xl-1 col-lg-1">Số lượng</div>
          <div className="col-xl-1 col-lg-1">Thương hiệu</div>
          <div className="col-xl-1 col-lg-1">Màu sắc</div>
          <div className="col-xl-1 col-lg-2">Thành tiền</div>
          <div className="col-xl-1 col-lg-2">Thao tác</div>
        </div>

        {dataForm.map((product: any, index: number) => (
          <div className="row tb-body" key={index}>
            <div className="col-xl-5 col-lg-4">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-2 col-sm-2 col-4 tb-body-img">
                  <img src={product.product_image} alt={product.product_name} />
                </div>
                <div className="col-xl-9 col-lg-8 col-md-10 col-sm-10 col-8 tb-body-text">
                  <span>{product.product_name}</span>
                </div>
              </div>
            </div>
            <div className="col-xl-1 col-lg-1">
              {product.price.toLocaleString()} đ
            </div>
            <div className="col-xl-1 col-lg-1">
              {product.size.toUpperCase()}
            </div>
            <div className="col-xl-1 col-lg-1">
              <div className="quantity-input">{product.stock_quantity}</div>
            </div>
            <div className="col-xl-1 col-lg-1">
              <div className="quantity-input">{product.brand}</div>
            </div>
            <div className="col-xl-1 col-lg-1">{product.color}</div>
            <div className="col-xl-1 col-lg-2 tt">
              {(product.price * product.stock_quantity).toLocaleString()} đ
            </div>
            <div className="col-xl-1 col-lg-2 btn-delete-cart">
              <button onClick={() => handleRemoveItem(product.id)}>Xoá</button>
            </div>
          </div>
        ))}

        <div className="row total-price-cart">
          <div className="col-xl-6 col-lg-6"></div>
          <div className="col-xl-6 col-lg-6">
            <div className="span-total">
              <span>Tổng tiền hàng</span>
              <span>{totalPrice.toLocaleString()} đ</span>
            </div>
            <div className="span-total">
              <span>Giảm giá sản phẩm</span>
              <span>-00 đ</span>
            </div>
            <div className="span-total">
              <span>Khuyến mãi</span>
              <span>0%</span>
            </div>
            <div className="span-total">
              <span>Phí vận chuyển</span>
              <span>-00 đ</span>
            </div>
            <div className="span-total-price">
              <span>TỔNG</span>
              <span>{totalPrice.toLocaleString()} đ</span>
            </div>
          </div>
        </div>

        <div className="row transport">
          <div className="col-xl-12 transport-title">
            <span>THÔNG TIN VẬN CHUYỂN</span>
          </div>
          <div className="col-xl-4 col-lg-4 input-np">
            <input
              value={dataFormAuth.full_name}
              readOnly
              type="text"
              placeholder="Họ tên"
            />
          </div>
          <div className="col-xl-4 col-lg-4 input-np">
            <input
              value={dataFormAuth.phone}
              readOnly
              type="text"
              placeholder="SĐT"
            />
          </div>
          <div className="col-xl-4 col-lg-4" style={{ height: "45px" }}>
            <select
              className="type-method"
              style={{
                height: "100%",
                width: "100%",
                padding: "5px",
                border: "1px solid #bbbaba",
                borderRadius: "5px",
                outline: "none",
              }}
              value={payMethod}
              onChange={(e: any) => setPaymethod(e.target.value)}
            >
              <option value="">-- Phương thức thanh toán --</option>
              <option value="0">Thanh toán khi nhận hàng</option>
              <option value="1">Thanh toán bằng ví VnPay</option>
            </select>
          </div>
          <div className="col-xl-12 tp-address">
            <textarea
              value={detailAddress}
              onChange={(e: any) => setDetailAddress(e.target.value)}
              placeholder="Địa chỉ nhận hàng đề xuất"
            ></textarea>
          </div>
          <div className="col-xl-4 col-lg-4 tp-select">
            <select
              value={selectedProvince}
              onChange={(e) => {
                const selectedId: any = e.target.value;
                const selectedItem = province.find(
                  (item: any) => item.id === selectedId
                );
                handleOnclickAddress("province", selectedItem?.name || "");
                setSelectedProvince(selectedId);
              }}
            >
              <option value="">-- Chọn tỉnh --</option>
              {province.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 tp-select">
            <select
              value={selectedDistrict}
              onChange={(e) => {
                const selectedId: any = e.target.value;
                const selectedItem = district.find(
                  (item: any) => item.id === selectedId
                );
                handleOnclickAddress("district", selectedItem?.name || "");
                setSelectedDistrict(selectedId);
              }}
            >
              <option value="">-- Chọn huyện --</option>
              {district.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-xl-4 col-lg-4 tp-select">
            <select
              value={selectedCommune}
              onChange={(e) => {
                const selectedId: any = e.target.value;
                const selectedItem = commune.find(
                  (item: any) => item.id === selectedId
                );
                handleOnclickAddress("commune", selectedItem?.name || "");
                setSelectedCommune(selectedId);
              }}
            >
              <option value="">-- Chọn xã --</option>
              {commune.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-xl-12 tp-buton">
            {btnType ? (
              <button onClick={handleOrder}>Thanh toán</button>
            ) : (
              <button onClick={handleOrder}>Đặt hàng</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
