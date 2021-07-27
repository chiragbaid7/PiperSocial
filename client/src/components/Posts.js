import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import Comments from "./Comments";
import dayjs from "dayjs";
import { Link, useHistory } from "react-router-dom";
var relativeTime = require("dayjs/plugin/relativeTime");

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
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
  image: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function Posts({ posts }) {
  const history = useHistory();
  const [post_id, post_id_state] = useState({});
  const [post, addpoststate] = useState("");
  const [postsstate, changepoststate] = useState(posts);
  const [likes, likesstate] = useState({});
  const [image, set_image] = useState(null);
  const [error, errorstate] = useState(null);
  dayjs.extend(relativeTime);
  const classes = useStyles();
  const user_id = localStorage.getItem("user_id");
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
      errorstate(error.response.data.message);
    }
  };
  const postimage = async function (e) {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("file", image);
      const response = await axios.post(
        `https://pipersocial.herokuapp.com/api/me/posts`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      errorstate(null);
    } catch (error) {
      errorstate(error.response.data.message);
    }
  };
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
  const handlelike = async function (id) {
    try {
      let user_liked = false;
      if (likes[id] === undefined) {
        const posts_likes = await axios.get(
          `https://pipersocial.herokuapp.com/api/posts/${id}/likes`
        );
        const users = posts_likes.data.users;
        for (let index in users) {
          const post_likes = users[index];
          if (post_likes.user_id == user_id) {
            user_liked = true;
          }
        }
      }
      if (user_liked || likes[id] === true) {
        const response = await axios.delete(
          `https://pipersocial.herokuapp.com/api/me/posts/${id}/likes`,
          { withCredentials: true, credentials: "include" }
        );
        for (let index in postsstate) {
          const post = postsstate[index];
          if (post.post_id === id) {
            post.likes_count -= 1;
            break;
          }
        }
        changepoststate([...postsstate]);
        likes[id] = false;
        likesstate({ ...likes });
      } else {
        const response = await axios.put(
          `https://pipersocial.herokuapp.com/api/me/posts/${id}/likes`,
          { withCredentials: true, credentials: "include" }
        );

        for (let index in postsstate) {
          const post = postsstate[index];
          if (post.post_id === id) {
            post.likes_count += 1;
            break;
          }
        }
        changepoststate([...postsstate]);
        likes[id] = true;
        likesstate({ ...likes });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div>
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
            onClick={handlesubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            post text
          </Button>
        </form>

        <Typography variant="h5" gutterBottom>
          Or
        </Typography>
        <form
          className={classes.image}
          onSubmit={(e) => {
            postimage(e);
          }}
        >
          <input
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={({ target }) => set_image(target.files[0])}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
              Upload image
            </IconButton>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      {error && <h4 style={{ color: "red" }}>{error}</h4>}
      <div>
        {postsstate.map((post) => (
          <Card className={classes.root} key={post.post_id}>
            <CardContent>
              <Link
                to={{
                  pathname: `/home/profile/${post.name}`,
                  state: { user_id: post.user_id },
                }}
              >
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
              <IconButton
                aria-label="add to favorites"
                onClick={() => handlelike(post.post_id)}
              >
                {post.likes_count}
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>{" "}
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
            </CardActions>
            {post_id.id === post.post_id && <Comments id={post_id.id} />}
          </Card>
        ))}
      </div>
    </>
  );
}
