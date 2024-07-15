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
    <div className="row row-cols-3">
      {books.map((book, index) => (
        <div key={index} className="">
          <BookCard {...book} />
        </div>
      ))}
    </div>
  );
};

export default Home;
