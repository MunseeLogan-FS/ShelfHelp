import { Group, Input, IconButton } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import { FetchData } from "../utils/fetchData";
import BookModal from "../BookModal";
import defaultBook from "../../assets/defaultBook.png";

function Search() {
  const [bookData, setBookData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      const parseData = searchTerm.replace(/\s+/g, "+");
      const data = await FetchData(`search.json?q=${parseData}&limit=10`);
      console.log(data.docs);
      setBookData(data.docs);
    } catch (error) {
      console.error("Search failed:", error);
      setBookData(null);
    }
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <Group attached w="full" maxW="md">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <IconButton
          aria-label="Search database"
          icon={<LuSearch />}
          onClick={handleSearch}
          colorPalette="cyan"
        >
          <LuSearch />
        </IconButton>
      </Group>

      {isLoading ? (
        <VStack style={{ marginTop: "16px" }}>
          <Spinner />
          <Text>Searching...</Text>
        </VStack>
      ) : (
        <div style={styles.results}>
          {hasSearched ? (
            bookData && bookData.length > 0 ? (
              bookData.map((book, index) => (
                <div key={index}>
                  <img
                    src={
                      book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                        : defaultBook
                    }
                    alt={book.title}
                    style={styles.featuredImage}
                    onClick={() => {
                      setSelectedBook(book);
                      setIsDialogOpen(true);
                    }}
                  />
                  <Text textStyle="xl">{book.title}</Text>
                </div>
              ))
            ) : (
              <Text>No books found. Try a different search!</Text>
            )
          ) : (
            <Text>Search for a book to get started!</Text>
          )}
        </div>
      )}
      <BookModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        book={selectedBook}
      />
    </div>
  );
}

export default Search;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    minHeight: "100vh",
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
  },
  results: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "space-around",

    width: "100%",
    marginTop: "16px",
  },
  featuredImage: {
    height: "35vh",
    width: "20vh",
    borderRadius: "8px",
    margin: "0 8px",

    cursor: "pointer",
  },
};
