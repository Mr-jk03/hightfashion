import {
  Box,
  Button,
  createTheme,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
  ThemeProvider,
} from "@mui/material";
import React, { use, useEffect, useState, useRef, FC } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { orange } from "@mui/material/colors";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { GetcategoryList, getListBanner } from "../../config/apiFunction";
import { toast } from "react-toastify";
import BestSaler from "../BestSaler/BestSaler";

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

type Props = {
  isMobile: boolean;
};

const MainHome: FC<Props> = ({ isMobile }) => {
  const [open, setOpen] = React.useState(true);

  const [banner, setBanner] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);

  useEffect(() => {
    const getBannerList = async () => {
      const res: any = await getListBanner();
      if (res && !res.isError) {
        setBanner(res.banner);
      } else {
        toast.error("Lỗi lấy danh sách banner");
      }
    };
    getBannerList();
  }, []);

  useEffect(() => {
    const getCategoryList = async () => {
      const res: any = await GetcategoryList();
      if (res && !res.isError) {
        setCategory(res.data);
      }
    };
    getCategoryList();
  }, []);

  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        (1 - progress).toString()
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="container" style={{paddingBottom:'281px'}}>
      <div className="row">
        {!isMobile && (
          <div className="col-md-3">
            <Box sx={{ display: "flex" }}>
              <ThemeProvider
                theme={createTheme({
                  components: {
                    MuiListItemButton: {
                      defaultProps: {
                        disableTouchRipple: true,
                      },
                    },
                  },
                  palette: {
                    mode: "dark",
                    primary: { main: "rgb(102, 157, 246)" },
                    background: { paper: "rgb(243, 99, 10)" },
                  },
                })}
              >
                <Paper elevation={0} sx={{ maxWidth: 256 }}>
                  <FireNav component="nav" disablePadding>
                    <ListItemButton component="a" href="#customized-list">
                      <ListItemIcon sx={{ fontSize: 20 }}>🎗️</ListItemIcon>
                      <ListItemText
                        sx={{ my: 0 }}
                        primary="Danh mục"
                        primaryTypographyProps={{
                          fontSize: 20,
                          fontWeight: "medium",
                          letterSpacing: 0,
                        }}
                      />
                    </ListItemButton>
                    <Divider />
                    <Box
                      sx={[
                        open
                          ? {
                              bgcolor: "rgba(71, 98, 130, 0.2)",
                            }
                          : {
                              bgcolor: null,
                            },
                        open
                          ? {
                              pb: 2,
                            }
                          : {
                              pb: 0,
                            },
                      ]}
                    >
                      {category.map((item: any, index: number) => (
                        <ListItemButton
                          alignItems="flex-start"
                          onClick={() => setOpen(!open)}
                          sx={[
                            {
                              px: 3,
                              pt: 2.5,
                            },
                            open
                              ? {
                                  pb: 0,
                                }
                              : {
                                  pb: 2.5,
                                },
                            open
                              ? {
                                  "&:hover, &:focus": {
                                    "& svg": {
                                      opacity: 1,
                                    },
                                  },
                                }
                              : {
                                  "&:hover, &:focus": {
                                    "& svg": {
                                      opacity: 0,
                                    },
                                  },
                                },
                          ]}
                          key={index}
                        >
                          <ListItemText
                            primary={item.category_name}
                            primaryTypographyProps={{
                              fontSize: 15,
                              fontWeight: "medium",
                              lineHeight: "20px",
                              mb: "2px",
                            }}
                            secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                            secondaryTypographyProps={{
                              noWrap: true,
                              fontSize: 12,
                              lineHeight: "16px",
                              color: open
                                ? "rgba(0,0,0,0)"
                                : "rgba(255,255,255,0.5)",
                            }}
                            sx={{ my: 0 }}
                          />
                        </ListItemButton>
                      ))}
                    </Box>
                  </FireNav>
                </Paper>
              </ThemeProvider>
            </Box>
          </div>
        )}
        <div className="col-md-9 col-12 ">
          <div className="row">
            {!isMobile && (
              <>
                <div className="col-md-4">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      height: "45px",
                      width: "100%",
                      background: "#292929",
                    }}
                  >
                    <span style={{ color: "#fff" }}>
                      🌟 Đổi trả trong vòng 7 ngày
                    </span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      height: "45px",
                      width: "100%",
                      background: "#292929",
                    }}
                  >
                    <span style={{ color: "#fff" }}>
                      🌟 Khuyến mãi mùa thu lên đến 50%
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className="col-md-4 col-sm-12">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "45px", width: "100%", background: "#292929" }}
              >
                <span style={{ color: "#fff" }}>
                  🌟 Free ship với đơn trên 500k
                </span>
              </div>
            </div>
          </div>
          <div className="banner mt-2">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              {banner.map((item: any, index: number) => (
                <SwiperSlide key={index}>
                  <img src={item.link_banner} />
                </SwiperSlide>
              ))}

              <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-10 col-sm-12">
          <h2 style={{ borderLeft: "9px solid #e45d15", paddingLeft: "10px" }}>
            SẢN PHẨM BÁN CHẠY
          </h2>
        </div>
        {!isMobile && (
          <div className="col-md-2">
            <Button color="error" variant="outlined">
              Xem thêm
            </Button>
          </div>
        )}
      </div>
      <BestSaler />
    </div>
  );
};

export default MainHome;
