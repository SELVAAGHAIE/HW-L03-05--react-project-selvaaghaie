import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchBookByIdQuery, useEditBookMutation } from "../api/BooksApi";

const EditBook = ({ setEditing }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchBookByIdQuery(id);
  const [updateBook, { isLoading: updating }] = useEditBookMutation();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    year: "",
    isbn: "",
  });

  useEffect(() => {
    if (data?.data) {
      const { title, author, publicationYear, isbn } = data.data;
      setBookData({ title, author, year: publicationYear, isbn });
    }
  }, [data]);

  const handleChange = (e) =>
    setBookData({ ...bookData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook({
        id,
        title: bookData.title,
        author: bookData.author,
        publicationYear: bookData.year,
        isbn: bookData.isbn,
      }).unwrap();
      alert("Book updated!");
      if (setEditing) setEditing(false);
      navigate(`/books/${id}`);
    } catch (err) {
      console.error("Update failed", err);
      alert("Error updating book.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading book.</p>;

  return (
    <div>
      <div>
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          {["title", "author", "year", "isbn"].map((field, i) => (
            <div key={i}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={bookData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={() => setEditing && setEditing(false)}
            >
              Cancel
            </button>
            <button type="submit" disabled={updating}>
              {updating ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
