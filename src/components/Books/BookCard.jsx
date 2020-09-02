import React from "react";
import "../../assets/style.css";
import icon from '../../assets/icons/delete-icon.png'

const BookCard = (props) => {
  return (
    <div className="book-card">
      <div className={"book-card-image"}>
        <img src={props.book.image} alt="No Data" width="100%" height="100%" />
      </div>
      {/* <div className={"book-card-delete"} onClick={() => {
        console.log(props.index)
      }}>
        <img src={icon} alt="No Data"/>
      </div> */}
    </div>
  );
};

export default BookCard;
