import React from "react";
import { Link } from "react-router";
import { useFetchBooksQuery } from "../api/BooksApi";
import styles from "./BookOverview.module.css";

const BookList = () => {
  const { data, error, isLoading } = useFetchBooksQuery();

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Failed to fetch books, please try again later.</p>;

  return (
    <div className={styles.container}>
      <h1>Books</h1>
      <ul>
        {data?.data?.map((book) => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Year: {book.publicationYear}</p>
            <Link to={`/books/${book._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;