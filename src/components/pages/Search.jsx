import { Group, Input, IconButton, Button, HStack } from "@chakra-ui/react";
import { LuSearch, LuChevronLeft, LuChevronRight } from "react-icons/lu";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  const handleSearch = async (page = 1) => {
    if (!searchTerm) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      const parseData = searchTerm.replace(/\s+/g, "+");
      const offset = (page - 1) * resultsPerPage;
      const data = await FetchData(
        `search.json?q=${parseData}&limit=${resultsPerPage}&offset=${offset}`
      );
      console.log(data.docs);
      setBookData(data.docs);
      setTotalResults(data.numFound || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error("Search failed:", error);
      setBookData(null);
    }
    setIsLoading(false);
  };

  const handlePageChange = (newPage) => {
    handleSearch(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <div style={styles.container}>
      <Group attached w="full" maxW="md">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(1);
          }}
        />
        <IconButton
          aria-label="Search database"
          icon={<LuSearch />}
          onClick={() => handleSearch(1)}
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
                <div key={index} style={styles.bookCard}>
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
                  <Text textStyle="sm" style={styles.bookTitle}>
                    {book.title}
                  </Text>
                </div>
              ))
            ) : (
              <Text style={styles.noBooks}>
                No books found. Try a different search!
              </Text>
            )
          ) : (
            <Text style={styles.noBooks}>
              Search for a book to get started!
            </Text>
          )}
        </div>
      )}
      {bookData && bookData.length > 0 && totalPages > 1 && (
        <HStack spacing="4" mt="8" mb="4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            colorPalette="cyan"
            size="sm"
          >
            <LuChevronLeft /> Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            colorPalette="cyan"
            size="sm"
          >
            Next <LuChevronRight />
          </Button>
        </HStack>
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "1400px",
    marginTop: "2rem",
    padding: "0 16px",
  },
  bookCard: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  featuredImage: {
    width: "100%",
    aspectRatio: "2/3",
    borderRadius: "5px",
    cursor: "pointer",
    objectFit: "cover",
  },
  bookTitle: {
    textAlign: "center",
    fontSize: "0.9rem",
    lineHeight: "1.2",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  noBooks: {
    textAlign: "center",
    marginTop: "32px",
    fontSize: "1.2rem",
    gridColumn: "1 / -1",
  },
};
