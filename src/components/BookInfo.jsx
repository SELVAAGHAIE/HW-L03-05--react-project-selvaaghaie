import { useParams, useNavigate } from "react-router";
import { useFetchBookByIdQuery, useRemoveBookMutation } from "../api/BooksApi";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useFetchBookByIdQuery(id);
  const [deleteBook] = useRemoveBookMutation();

  if (isLoading) return <p>Loading book details...</p>;
  if (error) return <p>Failed to fetch book details.</p>;

  const book = data?.data;

  const handleDelete = async () => {
    try {
      await deleteBook(id).unwrap();
      alert("Book deleted successfully.");
      navigate("/");
    } catch {
      alert("Failed to delete book.");
    }
  };

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Publication Year: {book.publicationYear}</p>
      <p>ISBN: {book.isbn}</p>

      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate(`/update/${id}`)}>Update</button>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default BookDetails;
