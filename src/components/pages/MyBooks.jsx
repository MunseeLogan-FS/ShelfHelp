import { useEffect, useState } from "react";
import { Text, Heading } from "@chakra-ui/react";
import FavoriteModal from "../FavoriteModal";
import WishModal from "../WishModal";
import Slider from "react-slick";

function MyBooks() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isWishDialogOpen, setIsWishDialogOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("favoriteBooks") || "[]");
    setFavoriteBooks(books);
  }, []);

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("wishList") || "[]");
    setWishList(books);
  }, []);

  const refreshFavoriteBooks = () => {
    const books = JSON.parse(localStorage.getItem("favoriteBooks") || "[]");
    setFavoriteBooks(books);
  };

  const refreshWishBooks = () => {
    const books = JSON.parse(localStorage.getItem("wishList") || "[]");
    setWishList(books);
  };

  return (
    <div style={styles.container}>
      <Heading as="h2" style={styles.heading}>
        My Favorite Books
      </Heading>
      <div style={styles.featuredContainer}>
        {favoriteBooks.length > 3 ? (
          <Slider {...settings}>
            {favoriteBooks.map((book) => (
              <div key={book.key} style={styles.slide}>
                {(book.cover_id || book.cover_i) && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${
                      book.cover_id || book.cover_i
                    }-L.jpg`}
                    alt={book.title}
                    style={styles.featuredImage}
                    onClick={() => {
                      setSelectedBook(book);
                      setIsDialogOpen(true);
                    }}
                  />
                )}
              </div>
            ))}
          </Slider>
        ) : favoriteBooks.length <= 3 && favoriteBooks.length > 0 ? (
          <div style={styles.nonSlide}>
            {favoriteBooks.map((book) => (
              <div key={book.key} style={styles.slide}>
                {(book.cover_id || book.cover_i) && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${
                      book.cover_id || book.cover_i
                    }-L.jpg`}
                    alt={book.title}
                    style={styles.featuredImage}
                    onClick={() => {
                      setSelectedBook(book);
                      setIsDialogOpen(true);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <Text style={{ textAlign: "center" }}>
            No books saved to your Favorites yet.
          </Text>
        )}
      </div>
      <Heading as="h2" style={styles.heading}>
        My Wishlist
      </Heading>
      <div style={styles.featuredContainer}>
        {wishList.length > 3 ? (
          <Slider {...settings}>
            {wishList.map((book) => (
              <div key={book.key} style={styles.slide}>
                {(book.cover_id || book.cover_i) && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${
                      book.cover_id || book.cover_i
                    }-L.jpg`}
                    alt={book.title}
                    style={styles.featuredImage}
                    onClick={() => {
                      setSelectedBook(book);
                      setIsWishDialogOpen(true);
                    }}
                  />
                )}
              </div>
            ))}
          </Slider>
        ) : (
          //  : wishList.length <= 3 && wishList.length > 0 ? (
          //   <div style={styles.nonSlide}>
          //     {wishList.map((book) => (
          //       <div key={book.key} style={styles.slide}>
          //         <img
          //           src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          //           alt={book.title}
          //           style={styles.featuredImage}
          //           onClick={() => {
          //             setSelectedBook(book);
          //             setIsWishDialogOpen(true);
          //           }}
          //         />
          //       </div>
          //     ))}
          //   </div>
          // )
          <Text style={{ textAlign: "center" }}>
            No books saved to your Wishlist yet.
          </Text>
        )}
      </div>
      <FavoriteModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        book={selectedBook}
        onBookRemoved={refreshFavoriteBooks}
      />
      <WishModal
        isOpen={isWishDialogOpen}
        onClose={() => setIsWishDialogOpen(false)}
        book={selectedBook}
        onWishRemoved={refreshWishBooks}
        onWishMoved={refreshFavoriteBooks}
      />
    </div>
  );
}

export default MyBooks;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "white",
    fontSize: "2rem",
    marginBottom: "16px",
    fontWeight: "bold",
  },
  featuredContainer: {
    width: "95%",
    marginBottom: "32px",
    paddingBottom: "32px",
    borderBottom: "1px solid #fff",
  },
  featuredImage: {
    height: "35vh",
    width: "auto",
    borderRadius: "8px",
    margin: "0 auto",
    cursor: "pointer",
  },
  slide: {
    padding: "0 10px",
    boxSizing: "border-box",
    textAlign: "center",
  },
  nonSlide: {
    textAlign: "center",
    display: "flex",
    justifyContent: "space-around",
  },
};
