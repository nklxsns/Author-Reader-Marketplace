const BookCard = ({ title, description, genre, publish_date, price, tags }) => {
  return (
    <div className="card col">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{genre}</h6>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <strong>Publish Date:</strong>{" "}
          {new Date(publish_date).toLocaleDateString()}
        </p>
        <p className="card-text">
          <strong>Price:</strong> ${price}
        </p>
        {tags && tags.length > 0 && (
          <p className="card-text">
            <strong>Tags:</strong> {tags.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
