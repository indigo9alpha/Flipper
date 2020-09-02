import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UI-kit";
import { HomeHeader } from "../components/Header";
import "../assets/style.css";
import { getUserId, getPages, getBooks } from "../reducks/users/selectors";
import { searchAndSetBook } from "../reducks/users/operations";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const Pages = getPages(selector);
  const books = getBooks(selector);



  const [bookCode, setBookCode] = useState("");

  const inputBookCode = useCallback((event) => {
    setBookCode(event.target.value);
  }, []);

  console.log("render!!:    " + uid, Pages, books);

  return (
    <>
      <div className="wrapper">
        <div>
          <p>You have read</p>
        </div>
        <div className="header">
          <HomeHeader />
        </div>
      </div>
      <div>
        <h2>{Pages}</h2>
        <p>pages ever</p>
      </div>
      <div>
        <TextInput
          fullWidth={false}
          label={"enter code"}
          multiline={false}
          rows={1}
          value={bookCode}
          type={"number"}
          onChange={inputBookCode}
        />
      </div>
      <div>
        <PrimaryButton
          label={"firebase"}
          onClick={() => {
            dispatch(searchAndSetBook(bookCode));
          }}
        />
      </div>
    </>
  );
};

export default Home;
