import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import { GET_ALL_POST, GET_USER_LIST } from "../../API/endPoints";
import { useNavigate } from "react-router-dom";

const postBoxStyle = {
  padding: "40px 70px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};
const headingBoxStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "5rem",
};

function Directory() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const userData = userList?.map((user) => ({
    id: user.id,
    name: user.name,
    count: allPost?.filter((post) => post.userId === user.id).length,
  }));

  useEffect(() => {
    (async () => {
      const listPromise = await fetch(GET_USER_LIST);
      const postPromise = await fetch(GET_ALL_POST);
      const [lists, posts] = await Promise.all([
        listPromise.json(),
        postPromise.json(),
      ]);
      localStorage.setItem("users", JSON.stringify(lists));
      localStorage.setItem("posts", JSON.stringify(posts));
      setAllPost(posts);
      setUserList(lists);
    })();
  }, []);

  return (
    <Box>
      {userData?.length > 0 ? (
        <Box>
          <Box sx={headingBoxStyle}>
            <h1>Directory</h1>
          </Box>
          <Box sx={postBoxStyle}>
            {userData.map((user) => (
              <Box
                key={user.id}
                onClick={() => navigate(`/user-detail/${user.id}`)}
              >
                <UserCard userName={user.name} postCount={user.count} />
              </Box>
            ))}
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

export default Directory;
