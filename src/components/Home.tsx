import React, { useEffect, useReducer, useRef, useState } from "react";
import Navbar from "./Navbar/Navbar";
import MainHome from "./MainHome/MainHome";
import BestSaler from "./BestSaler/BestSaler";
import { addQuestion, getUserInfo, selectProduct } from "../config/apiFunction";
import { toast } from "react-toastify";
import FormProducts from "./Male/FormProducts";
import Footer from "./Footer/Footer";
import UserInfo from "./UserInfo/UserInfo";
import OrderForm from "./OrderForm/OrderForm";
import StatusOrder from "../StatusOrder/StatusOrder";
import Accessory from "./Accessory/Accessory";
import { Button, Drawer, Backdrop, CircularProgress } from "@mui/material";
import { initMessageValue, MessageValue } from "../config/type";
import TypingDots from "./Customs/TypingDots";

const initState = { activeComponent: "MAINHOME" };

function reducer(state: { activeComponent: string }, action: { type: string }) {
  switch (action.type) {
    case "MAINHOME":
    case "MALEFORM":
    case "FEMALEFORM":
    case "USER":
    case "ORDER":
    case "ACCESSORY":
    case "DISCOUNT":
      return { activeComponent: action.type };
    default:
      return state;
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [dataForm, setDataForm] = useState<any>([]);

  const [statusCart, setStatusCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [showGreeting, setShowGreeting] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [messageValue, setMessageValue] =
    useState<MessageValue>(initMessageValue);
  const [messages, setMessages] = useState<string[]>([]);
  const [botAnswer, setBotAnswer] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  const handleOpenChatbot = () => {
    setOpen(true);
    setShowMessage(false);
    setShowGreeting(false);
    setTimeout(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowGreeting(true);
      }, 1000);
    }, 1000);
  };

  const handleSendMessage = async () => {
    try {
      if (inputValue.trim()) {
        const userMessage = inputValue;
        setMessageValue((prev: any) => ({
          ...prev,
          user: [userMessage],
        }));
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        const res = await addQuestion(userMessage);
        setShowBackDrop(false);
        setBotAnswer((prev) => [...prev, null]);
        setTimeout(() => {
          const answer =
            res?.reply?.replace(/\n/g, "<br />") || "Bot không có phản hồi";
          setBotAnswer((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = answer;
            return updated;
          });
          setMessageValue((prev: any) => ({
            ...prev,
            bot: [res?.reply],
          }));
          setShowBackDrop(true);
        }, 2000);
      }
    } catch (err) {
      toast.error("Lỗi liên quan đến Network");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      case "DISCOUNT":
        // fetchData(4, "Lỗi lấy danh sách sản phẩm nữ");
        break;
    }
  }, [state]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botAnswer]);

  return (
    <div className="home-position">
      <Navbar
        handleChangeItem={(val) => dispatch({ type: val })}
        statusCart={statusCart}
      />
      {state.activeComponent === "MAINHOME" && (
        <MainHome isMobile={isMobile} setStatusCart={setStatusCart} 
          handleChangeItem={(val) => dispatch({ type: val })}
        />
      )}
      {["MALEFORM", "FEMALEFORM", "DISCOUNT"].includes(
        state.activeComponent
      ) && (
        <FormProducts
          isMobile={isMobile}
          dataForm={dataForm}
          setStatusCart={setStatusCart}
          handleChangeItem={(val) => dispatch({ type: val })}
        />
      )}
      {state.activeComponent === "USER" && <UserInfo />}
      {state.activeComponent === "ORDER" && <OrderForm isMobile={isMobile} />}
      {state.activeComponent === "ACCESSORY" && (
        <Accessory isMobile={isMobile} />
      )}
      <Footer />

      <div
        style={{
          height: "75px",
          width: "75px",
          position: "fixed",
          right: "10px",
          bottom: "10px",
          cursor: "pointer",
        }}
        onClick={handleOpenChatbot}
      >
        <img
          src="/image/service.gif"
          style={{ height: "100%", width: "100%" }}
          alt="chatbot"
        />
      </div>
      {open && (
        <div className={`chatbot active`}>
          <div className="row">
            <div
              className="col-12"
              style={{
                height: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "10px",
              }}
            >
              <span
                style={{
                  fontFamily: "Roboto",
                  fontStyle: "italic",
                  color: "#fff",
                }}
              >
                Chat
              </span>
              <Button
                variant="contained"
                size="small"
                onClick={() => setOpen(false)}
              >
                X
              </Button>
            </div>

            <div
              className="col-12"
              style={{ height: "418px", padding: "12px", position: "relative" }}
            >
              <div
                style={{
                  height: "88%",
                  width: "100%",
                  backgroundColor: "#fff",
                  overflowY: "auto",
                  padding: "5px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {showMessage && (
                  <div
                    style={{
                      height: "auto",
                      width: "75%",
                      display: "grid",
                      gridTemplateColumns: "10% 70%",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "25px",
                        width: "25px",
                        borderRadius: "50%",
                        padding: "2px",
                        border: "1px solid #2193f1f6",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src="/image/service.gif"
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        backgroundColor: "#2193f1f6",
                        borderRadius: "5px",
                        padding: "5px",
                        fontSize: "15px",
                        color: "#fff",
                      }}
                    >
                      {!showGreeting ? (
                        <CircularProgress
                          size={20}
                          thickness={5}
                          sx={{ color: "#fff", marginLeft: "5px" }}
                        />
                      ) : (
                        <p
                          style={{
                            fontSize: "13px",
                            fontFamily: "roboto",
                            margin: 0,
                          }}
                        >
                          Chào bạn! Bạn cần mình tư vấn gì nào ?
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <React.Fragment key={idx}>
                    <div
                      style={{
                        textAlign: "right",
                        marginTop: "10px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: "#f1f1f1",
                          padding: "8px 12px",
                          borderRadius: "12px",
                          fontFamily: "roboto",
                          fontSize: "14px",
                          maxWidth: "75%",
                        }}
                      >
                        {msg}
                      </span>
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                        marginTop: "10px",
                      }}
                    >
                      <div
                        style={{
                          height: "auto",
                          width: "75%",
                          display: "grid",
                          gridTemplateColumns: "10% 70%",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            height: "25px",
                            width: "25px",
                            borderRadius: "50%",
                            padding: "2px",
                            border: "1px solid #2193f1f6",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src="/image/service.gif"
                            alt=""
                            style={{
                              height: "100%",
                              width: "100%",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            backgroundColor: "#2193f1f6",
                            borderRadius: "5px",
                            padding: "5px",
                            fontSize: "15px",
                            color: "#fff",
                          }}
                        >
                          {botAnswer[idx] ? (
                            <p
                              style={{
                                fontSize: "13px",
                                fontFamily: "roboto",
                                margin: 0,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: botAnswer[idx],
                              }}
                            />
                          ) : (
                            <TypingDots />
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div
                style={{
                  height: "10%",
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  marginTop: "7px",
                  display: "grid",
                  gridTemplateColumns: "75% 20%",
                  gap: "10px",
                  padding: "0px 5px",
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  style={{
                    height: "35px",
                    border: "none",
                    marginTop: "2px",
                    outline: "none",
                    fontFamily: "roboto",
                    fontSize: "15px",
                  }}
                />
                <Button
                  sx={{ height: "30px", marginTop: "5px" }}
                  size="small"
                  variant="outlined"
                  onClick={handleSendMessage}
                >
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
