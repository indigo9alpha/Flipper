import React from "react";
import {useSelector} from 'react-redux'
import {getBooks} from '../../reducks/users/selectors'
import BookCard from './BookCard'
import '../../assets/style.css'

const BookCardList = () => {
  const selector = useSelector(state => state)
  const books = getBooks(selector)
  return (
    <div className="section-wrapper">
        {books.length > 0 && (
          books.map((book,index) => (
            <BookCard key={index} book={book} />
          ))
        )}
    </div>
  );
};

export default BookCardList;
