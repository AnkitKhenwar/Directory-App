import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { GET_ALL_COUNTRIES, GET_TIME } from "../../API/endPoints";
import BasicSelect from "../../components/Select/Select";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import moment from "moment-timezone";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the plugin
import PostPopup from "../../components/PostPopup/PostPopup";
dayjs.extend(utc); // Use the plugin

function UserDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const userList = JSON.parse(localStorage.getItem("users"));
  const allPosts = JSON.parse(localStorage.getItem("posts"));
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [isPlay, setIsPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [isPopupOpen, setPopupOpen] = useState({
    isPopupOpen: false,
    id: null,
    title: "",
    content: "",
  });

  useEffect(() => {
    (async () => {
      const data = await fetch(GET_ALL_COUNTRIES);
      const list = await data.json();
      setCountries(list);
      setCountry(list[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetch(GET_TIME + "/" + country);
        const timeObj = await data.json();
        if (timeObj && timeObj.utc_datetime && timeObj.utc_offset) {
          setIsPlay(true);
          const localTimeWithOffset = moment(timeObj.utc_datetime)
            .utcOffset(timeObj.utc_offset)
            .format("HH:mm:ss");
          setCurrentTime(localTimeWithOffset);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [country]);

  useEffect(() => {
    let intervalId;
    if (isPlay) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newDate = moment(prevTime, "HH:mm:ss")
            .add(1, "seconds")
            .format("HH:mm:ss");

          return newDate;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlay, currentTime]);

  const userData = userList?.find((user) => String(user.id) === id);
  const userPosts = allPosts?.filter((post) => String(post.userId) === id);

  const handleChange = (e) => {
    setIsPlay(false);
    setCountry(e.target.value);
  };
  return (
    <Box sx={{ padding: "20px 20px" }}>
      {countries?.length > 0 ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              "@media (max-width:448px)": {
                flexDirection: "column",
              },
            }}
          >
            <Box
              sx={{
                "@media (max-width:448px)": {
                  width: "100%",
                  textAlign: "left",
                },
              }}
            >
              <IconButton onClick={() => navigate("/")}>
                <ArrowBackIcon />
              </IconButton>
              
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                "@media (max-width:448px)": {
                  flexDirection: "column-reverse",
                },
              }}
            >
              <Box>
                <BasicSelect
                  countries={countries}
                  handleChange={handleChange}
                  country={country}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "@media (max-width:448px)": {
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  },
                }}
              >
                <Box
                  sx={{
                    height: "50px",
                    width: "100px",
                    backgroundColor: "black",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                  }}
                >
                  <h3>{currentTime}</h3>
                </Box>
                <Box ml={2} pl={1}>
                  
                  <Button   sx={{
                    height: "50px",
                    width: "110px",
                    backgroundColor: "blue",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    fontWeight:700
                  }} onClick={() => {
                      setIsPlay((prev) => !prev);
                    }} variant="contained" endIcon={<IconButton sx={{color:"white"}}
                    
                  >
                    {isPlay ? <PauseIcon /> : <PlayCircleIcon />}
                  </IconButton>}>
                  {isPlay ? "Pause" :"Start" }
      </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <h1 style={{ textAlign: "center" }}>Profile Page</h1>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              border: "1px solid black",
              borderRadius: "8px",
              minWidth: 0, // Prevent the box from expanding past the viewport width
              rowGap: "30px",
              backgroundColor: "#0DECE8",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                "@media (max-width:431px)": {
                  flexDirection: "column",
                  rowGap: "10px",
                },
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  minWidth: 0,
                  overflow: "hidden",
                  wordWrap: "break-word",
                }}
              >
                <Typography fontWeight={600} noWrap={false}>
                  {"Name : " + userData?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  flexShrink: 1,
                  minWidth: 0,
                  overflow: "hidden",
                  wordWrap: "break-word",
                }}
              >
                <Typography fontWeight={600} noWrap={false}>
                  {`Address : ${userData?.address?.street}, ${userData?.address?.suite}, ${userData?.address?.city}, ${userData?.address?.zipcode}`}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                "@media (max-width:431px)": {
                  flexDirection: "column",
                  rowGap: "10px",
                },
              }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  minWidth: 0,
                  overflow: "hidden",
                  wordWrap: "break-word",
                }}
              >
                <Typography fontWeight={600} noWrap={false}>
                  {"Username : " +
                    userData?.username +
                    " | " +
                    " Catch Phrase :" +
                    userData?.company?.catchPhrase}
                </Typography>
              </Box>
              <Box
                sx={{
                  flexShrink: 1,
                  minWidth: 0,
                  overflow: "hidden",
                  wordWrap: "break-word",
                }}
              >
                <Typography fontWeight={600} noWrap={false}>
                  {"Email : " +
                    userData?.email +
                    " | " +
                    "Phone : " +
                    userData?.phone}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box mt={5}>
            <Grid container spacing={2}>
              {userPosts?.map((post, i) => (
                <Grid
                  item
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => {
                    setPopupOpen({
                      isPopupOpen: true,
                      id: i,
                      title: post.title,
                      content: post.body,
                    });
                  }}
                >
                  <PostCard title={post.title} content={post.body} />
                </Grid>
              ))}
            </Grid>
            {isPopupOpen.isPopupOpen && (
              <PostPopup
                title={isPopupOpen.title}
                content={isPopupOpen.content}
                isPopupOpen
                setPopupOpen={setPopupOpen}
              />
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default UserDetail;
