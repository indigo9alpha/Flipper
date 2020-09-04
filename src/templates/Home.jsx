import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, TextInput } from "../components/UI-kit";
import { HomeHeader } from "../components/Header";
import "../assets/style.css";
import {getPages} from "../reducks/users/selectors";
import { searchAndSetBook } from "../reducks/users/operations";
import CountUp from "react-countup";

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const pages = getPages(selector);

  const [bookCode, setBookCode] = useState("");
  
  const inputBookCode = useCallback((event) => {
    setBookCode(event.target.value);
  }, []);


  return (
    <>
    <section className="">
      <div className="flex">
        <div className="you-have-read">
          <p>You have read</p>
        </div>
        <div className="header-right">
          <HomeHeader />
        </div>
      </div>
      <div className="pages-number">
        <CountUp end={pages} duration={2} delay={0} />
      </div>
      <div className="pages-ever">
        <p>pages ever</p>
      </div>

      <div className="input-and-button">
        <div>
          <TextInput
            fullWidth={true}
            label={"enter ISBN code"}
            multiline={false}
            rows={1}
            value={bookCode}
            type={"number"}
            onChange={inputBookCode}
          />
        </div>
        <div className="module-spacer--medium" />
        <div className="text-center">
          <PrimaryButton
            label={"READ!"}
            onClick={() => {
              dispatch(searchAndSetBook(bookCode));
              setBookCode("")
            }}
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;
