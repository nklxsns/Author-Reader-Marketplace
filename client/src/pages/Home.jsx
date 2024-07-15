import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:5000/book/all");
      setBooks(response.data);
    }

    fetchData();
  }, []);

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 p-3">
      {books.map((book, index) => (
        <div key={index} className="p-3">
          <BookCard {...book} />
        </div>
      ))}
    </div>
  );
};

export default Home;
