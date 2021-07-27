import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: "20px",
    margin: "auto",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  bottom: {
    color: "red",
    textalign: "left",
    paddingleft: "3%",
    paddingtop: "2%",
    paddingbottom: "2%",
  },
});

export default function Posts() {
  function routehome() {
    history.push("/");
  }
  const getallusers = async function () {
    try {
      const response = await axios.get("https://pipersocial.herokuapp.com/api/me/users");
      userstate([...response.data.users]);
    } catch (error) {}
  };
  const getallfriends = async function () {
    try {
      const response = await axios.get(
        "https://pipersocial.herokuapp.com/api/me/users/follow"
      );
      const friends_list = response.data.data.friends_id;

      for (let friend_id of friends_list) {
        friends[friend_id] = true;
        friendstate({ ...friends });
      }
    } catch (error) {
      if (error.response === undefined) {
        return;
      }
      if (error.response.status === 403) {
        history.push("/");
      }
    }
  };
  const follow = async function (id) {
    if (friends[id] === true) {
      //unfollow
      const response = await axios.delete(
        `https://pipersocial.herokuapp.com/api/me/users/${id}/follow`
      );
      friends[id] = false;
      friendstate({ ...friends });
    } else {
      //follow
      const response = await axios.put(
        `https://pipersocial.herokuapp.com/api/me/users/${id}/follow`
      );
      friends[id] = true;
      friendstate({ ...friends });
    }
  };
  const history = useHistory();
  dayjs.extend(relativeTime);
  const classes = useStyles();
  useEffect(() => {
    getallusers();
    getallfriends();
  }, []);
  const [users, userstate] = useState([]);
  const [friends, friendstate] = useState({});
  return (
    <div>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={routehome}
            >
              home
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>{" "}
      {users.map((user) => (
        <Card className={classes.root} key={user.user_id}>
          <CardContent>
            <Link
              to={{
                pathname: `/home/profile/${user.name}`,
                state: { user_id: user.user_id },
              }}
            >
              {user.name}
            </Link>
          </CardContent>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              follow(user.user_id);
            }}
          >
            {friends[user.user_id] === true ? "UNFOLLOW" : "FOLLOW"}
          </Button>
        </Card>
      ))}
    </div>
  );
}
