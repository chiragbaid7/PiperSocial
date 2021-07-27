import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Commments({ id }) {
  const classes = useStyles();
const user_id = localStorage.getItem("user_id");
  const [comments, commentstate] = useState([]);
  const [comment, mycommentstate] = useState("");

  const postcomment = async function (e) {
    e.preventDefault();
    const body = { comment };
    try {
      const response = await axios.post(
        `https://pipersocial.herokuapp.com/api/me/posts/${id}/comments`,
        body
      );
      getcomments();
    } catch (error) {}
  };
  const getcomments = async function () {
    try {
      const response = await axios.get(
        `https://pipersocial.herokuapp.com/api/posts/${id}/comments`,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      commentstate([...response.data.comments]);
    } catch (error) {}
  };
  const deletecomments = async function (id) {
    try {
      await axios.delete(`https://pipersocial.herokuapp.com/api/me/comments/${id}`);
      for (let index in comments) {
        const comment = comments[index];
        if (comment.comment_id === id) {
          comments.splice(index, 1);
          commentstate([...comments]);
          return;
        }
      }
    } catch (error) {
      return <div>{error.response.data} </div>;
    }
  };
  useEffect(() => {
    getcomments();
  }, []);
  return (
    <>
      <form>
        <input
          type="text"
          name="comment"
          onChange={({ target }) => mycommentstate(target.value)}
          placeholder="Add a comment"
        />
        <Button
          onClick={postcomment}
          type="submit"
          variant="contained"
          color="primary"
        >
          post
        </Button>
      </form>
      {comments.map((comment) => (
        <List className={classes.root} key={comment.comment_id}>
          <Link
                to={{
                  pathname: `/home/profile/${comment.name}`,
                  state: { user_id: comment.user_id },
                }}
              >
                {comment.name}
              </Link>
              {console.log(comment.user_id)}
          {user_id == comment.user_id && (
            <IconButton
              aria-label="delete"
              className={classes.margin}
              onClick={() => deletecomments(comment.comment_id)}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Typography variant="body2" color="textSecondary" component="p">
            {dayjs(comment.created_at).fromNow()}
          </Typography>
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.comment}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      ))}
    </>
  );
}
