import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { useDispatch,useSelector } from "react-redux";
import {getBooks} from '../reducks/users/selectors'
import { push } from "connected-react-router";
import BookCardList from "../components/Books/BookCardList"
import '../assets/style.css'

const List = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const books = getBooks(selector);

  return (
    <>
      <div className="wrapper">
        <div>
          <IconButton
            onClick={() => {
              dispatch(push("/"));
            }}
          >
            <ArrowLeftIcon />
          </IconButton>
        </div>
        <div className="center">
          <h2>You have read {books.length} books ever</h2>
        </div>
      </div>
      <div>
        <BookCardList />
      </div>
    </>
  );
};

export default List;
