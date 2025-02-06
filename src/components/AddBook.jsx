import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAddBookMutation } from "../api/BooksApi";
import styles from "./AddBook.module.css";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [isbn, setIsbn] = useState("");
  const navigate = useNavigate();

  const [createBook, { isLoading }] = useAddBookMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook({
        title,
        author,
        publicationYear: parseInt(publicationYear),
        isbn,
      }).unwrap();

      alert("Book created successfully!");
      navigate("/");
    } catch {
      alert("Failed to create book.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label>Publication Year</label>
        <input
          type="number"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          required
        />

        <label>ISBN</label>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;