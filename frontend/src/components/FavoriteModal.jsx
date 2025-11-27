import { Button, Dialog, Portal, Text } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";

function FavoriteModal({ isOpen, onClose, book, onBookRemoved }) {
  const handleRemove = () => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favoriteBooks")) || [];

    const checkFavorite = [...existingFavorites, book];

    const alreadyFavorite = checkFavorite.some(
      (savedBook) => savedBook.key === book.key
    );

    if (alreadyFavorite) {
      const favoriteBooks = existingFavorites.filter(
        (savedBook) => savedBook.key !== book.key
      );
      localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
      console.log("Book removed from to favorites:", book);

      toaster.create({
        description: "book has been removed from your Favorites",
        type: "info",
        duration: 2000,
      });

      onBookRemoved?.();
      onClose();

      return;
    }
  };

  if (!book) return null;

  return (
    <div>
      <Dialog.Root
        open={isOpen}
        onOpenChange={onClose}
        size="xl"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bg="cyan.900" color="white">
              <Dialog.Header>
                <Dialog.Title>{book.title}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {(book.cover_id || book.cover_i) && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${
                      book.cover_id || book.cover_i
                    }-L.jpg`}
                    alt={book.title}
                  />
                )}
                <Text>Author(s): {book.author_name}</Text>
                <Text>First Published: {book.first_publish_year}</Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleRemove}>Remove Book</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}

export default FavoriteModal;
