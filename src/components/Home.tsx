import React, { useEffect, useReducer, useState } from "react";
import Navbar from "./Navbar/Navbar";
import MainHome from "./MainHome/MainHome";
import BestSaler from "./BestSaler/BestSaler";
import { getUserInfo, selectProduct } from "../config/apiFunction";
import { toast } from "react-toastify";
import FormProducts from "./Male/FormProducts";
import Footer from "./Footer/Footer";
import UserInfo from "./UserInfo/UserInfo";
import OrderForm from "./OrderForm/OrderForm";
import StatusOrder from "../StatusOrder/StatusOrder";

const initState = { activeComponent: "MAINHOME" };

function reducer(state: { activeComponent: string }, action: { type: string }) {
  switch (action.type) {
    case "MAINHOME":
    case "MALEFORM":
    case "FEMALEFORM":
    case "USER":
    case "ORDER":
    case "ORDERSTT":
      return { activeComponent: action.type };
    default:
      return state;
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [dataForm, setDataForm] = useState<any>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [statusCart, setStatusCart] = useState(false);
  const handleChangeItem = (value: string) => {
    dispatch({ type: value });
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async (categoryId: number, errorMessage: string) => {
      try {
        const res: any = await selectProduct(categoryId);
        if (res) {
          setDataForm(res.data);
        } else {
          toast.error(errorMessage);
        }
      } catch (err: any) {
        toast.error("Lỗi network");
      }
    };

    switch (state.activeComponent) {
      case "MAINHOME":
        setDataForm([]);
        break;
      case "MALEFORM":
        fetchData(3, "Lỗi lấy danh sách sản phẩm nam");
        break;
      case "FEMALEFORM":
        fetchData(4, "Lỗi lấy danh sách sản phẩm nữ");
        break;
      case "USER":
        break;
      case "ORDERSTT":
        break
      default:
        break;
    }
  }, [state]);

  return (
    <div className="home-position">
      <Navbar handleChangeItem={handleChangeItem} statusCart={statusCart}/>
      {state.activeComponent === "MAINHOME" && <MainHome isMobile={isMobile} />}
      {["MALEFORM", "FEMALEFORM"].includes(state.activeComponent) && (
        <FormProducts isMobile={isMobile} dataForm={dataForm} setStatusCart={setStatusCart} handleChangeItem={handleChangeItem}/>
      )}
      {state.activeComponent === "USER" && <UserInfo />}
      {state.activeComponent === "ORDER" && <OrderForm isMobile={isMobile}/>}
      {state.activeComponent === "ORDERSTT" && <StatusOrder />}
      <Footer />
    </div>
  );
};

export default Home;
