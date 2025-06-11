import { FetchData } from "../utils/fetchData";
import { useEffect, useState } from "react";
import { Spinner, Text, VStack, Heading } from "@chakra-ui/react";
import BookModalHome from "../BookModalHome";

function Home() {
  const [bookData, setBookData] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function loadBook() {
      // const cachedBooks = localStorage.getItem("cachedBookData");

      // if (cachedBooks) {
      //   setBookData(JSON.parse(cachedBooks));
      //   return;
      // }

      try {
        const data = await FetchData(
          "subjects/fantasy.json?sort=rating&lang=en&limit=20"
        );
        console.log(data);
        const books = data.works;

        // const randomSelections = Array.from({ length: 6 }, () => {
        //   const randIndex = Math.floor(Math.random() * books.length);
        //   return books[randIndex];
        // });

        setBookData(books);
        // localStorage.setItem("cachedBookData", JSON.stringify(books));
      } catch (error) {
        console.error("Failed to load book data:", error);
      }
    }

    loadBook();
  }, []);

  if (!bookData)
    return (
      <VStack colorPalette="teal">
        <Spinner />
        <Text>Loading...</Text>
      </VStack>
    );
  return (
    <div style={styles.container}>
      <Heading as="h2" style={styles.heading}>
        Featured
      </Heading>
      <div style={styles.featuredContainer}>
        <img
          src={`https://covers.openlibrary.org/b/id/${bookData[0].cover_id}-L.jpg`}
          alt={bookData[0].title}
          style={styles.featuredImage}
          onClick={() => {
            setSelectedBook(bookData[0]);
            setIsDialogOpen(true);
          }}
        />

        <img
          src={`https://covers.openlibrary.org/b/id/${bookData[1].cover_id}-L.jpg`}
          alt={bookData[1].title}
          style={styles.featuredImage}
          onClick={() => {
            setSelectedBook(bookData[1]);
            setIsDialogOpen(true);
          }}
        />

        <img
          src={`https://covers.openlibrary.org/b/id/${bookData[2].cover_id}-L.jpg`}
          alt={bookData[2].title}
          style={styles.featuredImage}
          onClick={() => {
            setSelectedBook(bookData[2]);
            setIsDialogOpen(true);
          }}
        />
      </div>
      <Heading as="h2" style={styles.heading}>
        Suggested
      </Heading>
      <div style={styles.featuredContainer}>
        <img
          src={`https://covers.openlibrary.org/b/id/${bookData[3].cover_id}-L.jpg`}
          alt={bookData[3].title}
          style={styles.featuredImage}
          onClick={() => {
            setSelectedBook(bookData[3]);
            setIsDialogOpen(true);
          }}
        />

        <img
          src={`https://covers.openlibrary.org/b/id/${bookData[4].cover_id}-L.jpg`}
          alt={bookData[4].title}
          style={styles.featuredImage}
          onClick={() => {
            setSelectedBook(bookData[4]);
            setIsDialogOpen(true);
          }}
        />

        <img
          src={`https://covers.openlibrary.org/b/id/${bookData[5].cover_id}-L.jpg`}
          alt={bookData[5].title}
          style={styles.featuredImage}
          onClick={() => {
            setSelectedBook(bookData[5]);
            setIsDialogOpen(true);
          }}
        />
      </div>
      <BookModalHome
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        book={selectedBook}
      />
    </div>
  );
}

export default Home;

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
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: "16px",
    borderBottom: "1px solid #fff",
    paddingBottom: "16px",
  },
  featuredImage: {
    height: "35vh",
    borderRadius: "8px",
    margin: "0 8px",
    cursor: "pointer",
  },
};
