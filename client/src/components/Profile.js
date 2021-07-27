import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useHistory, useLocation } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

import { useState, useEffect } from "react";
import Comments from "./Comments";
import axios from "axios";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    marginTop: "20px",
    margin: "auto",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Profile() {
  const classes = useStyles();
  dayjs.extend(relativeTime);
  const history = useHistory();
  function routehome() {
    history.push("/");
  }
  const [userposts, userspoststate] = useState([]);
  const [noposts, no_post_state] = useState(false);
  const [post, addpoststate] = useState("");
  const [post_id, post_id_state] = useState({});
  const [friend, friend_state] = useState(true);
  const location = useLocation();
  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
  const fetchposts = async function () {
    const response = await axios.get(`https://pipersocial.herokuapp.com/api/me/posts`, {
      withCredentials: true,
      credentials: "include",
    });
    if (response.data.posts === undefined) {
      no_post_state(true);
    } else {
      userspoststate([...response.data.posts]);
    }
  };
  const fetch_users_posts = async function (user_id) {
    const response = await axios.get(
      `https://pipersocial.herokuapp.com/api/users/${user_id}/posts`
    );
    if (response.data.posts === undefined) {
      no_post_state(true);
    } else {
      userspoststate([...response.data.posts]);
    }
    friend_state(false);
  };
  useEffect(() => {
    if (location.state) {
      const user_id = location.state.user_id;
      fetch_users_posts(user_id);
    } else {
      fetchposts();
      friend_state(true);
    }
  }, []);

  const handlesubmit = async function (e) {
    const body = { post };
    try {
      e.preventDefault();
      const response = await axios.post(
        `https://pipersocial.herokuapp.com/api/me/posts`,
        body,
        { withCredentials: true, credentials: "include" }
      );
      history.push("/");
    } catch (error) {
      console.log(error.response);
    }
  };
  const deletepost = async function (id) {
    try {
      const res = await axios.delete(
        `https://pipersocial.herokuapp.com/api/me/posts/${id}`
      );
      for (let index in userposts) {
        const post = userposts[index];
        if (post.post_id === id) {
          userposts.splice(index, 1);
          userspoststate([...userposts]);
          return;
        }
      }
    } catch (error) {}
  };
  return (
    <>
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
      <form>
        {" "}
        <TextField
          margin="normal"
          required
          fullWidth
          name="post"
          label="What's on your mind"
          type="string"
          id="post"
          size="medium"
          onChange={({ target }) => addpoststate(target.value)}
        />
        <Button
          type="submit"
          onClick={handlesubmit}
          variant="contained"
          color="primary"
        >
          post
        </Button>
      </form>
      {noposts === true ? (
        <h1>No posts uploaded</h1>
      ) : (
        <div>
          {userposts.map((post) => (
            <Card className={classes.root} key={post.post_id}>
              <CardContent>
                <Link href="#" variant="body1">
                  {post.name}
                </Link>
                {validURL(post.post) ? (
                  <img
                    src={`${post.post}`}
                    alt="aa"
                    width="300px"
                    height="200px"
                  ></img>
                ) : (
                  <Typography variant="h6" gutterBottom>
                    {post.post}
                  </Typography>
                )}
                <Typography variant="body2" color="textSecondary" component="p">
                  {dayjs(post.created_at).fromNow()}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  {post.likes_count}
                  <FavoriteIcon />
                </IconButton>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    if (post_id.id === post.post_id) {
                      delete post_id.id;
                      post_id_state({ ...post_id });
                    } else {
                      post_id_state({ id: post.post_id });
                    }
                  }}
                >
                  comments
                </Button>

                {friend && (
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    onClick={() => deletepost(post.post_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </CardActions>

              {post_id.id === post.post_id && <Comments id={post_id.id} />}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
