import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import '../assets/style.css'

const List = () => {
  const dispatch = useDispatch()

  return (
    <>
    <div className="wrapper">
      <div>
        <IconButton onClick={() => {
          dispatch(push('/'))
        }}>
          <ArrowLeftIcon />
        </IconButton>
      </div>
      <div className="center">
        <h2>You have read 36 books ever</h2>
      </div>
    </div>
    </>
  )
};

export default List;
