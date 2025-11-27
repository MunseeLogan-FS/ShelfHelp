import { Button, Dialog, Portal, Text } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";

function BookModalHome({ isOpen, onClose, book }) {
  const handleFavorites = () => {
    const existingBooks =
      JSON.parse(localStorage.getItem("favoriteBooks")) || [];

    const updatedBooks = [...existingBooks, book];

    const alreadySaved = existingBooks.some(
      (savedBook) => savedBook.key === book.key
    );

    if (alreadySaved) {
      toaster.create({
        description: "Already saved to your Favorites",
        type: "info",
        duration: 2000,
        action: {
          label: "View",
          onClick: () => {
            window.location.href = "/mybooks";
          },
        },
      });

      return;
    }

    localStorage.setItem("favoriteBooks", JSON.stringify(updatedBooks));
    console.log("Book saved to favorites:", book);

    toaster.create({
      description: "Booked saved to your Favorites",
      type: "info",
      duration: 2000,
      action: {
        label: "View",
        onClick: () => {
          window.location.href = "/mybooks";
        },
      },
    });
  };

  const handleWishlist = () => {
    const existingBooks = JSON.parse(localStorage.getItem("wishList")) || [];

    const updatedBooks = [...existingBooks, book];

    const alreadySaved = existingBooks.some(
      (savedBook) => savedBook.key === book.key
    );

    if (alreadySaved) {
      toaster.create({
        description: "Already saved to your Wishlist",
        type: "info",
        duration: 2000,
        action: {
          label: "View",
          onClick: () => {
            window.location.href = "/mybooks";
          },
        },
      });

      return;
    }

    localStorage.setItem("wishList", JSON.stringify(updatedBooks));
    console.log("Book saved to library:", book);

    toaster.create({
      description: "Booked saved to your Wishlist",
      type: "info",
      duration: 2000,
      action: {
        label: "View",
        onClick: () => {
          window.location.href = "/mybooks";
        },
      },
    });
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
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                  alt={book.title}
                />
                <Text>Author(s): {book.authors[0].name}</Text>
                <Text>First Published: {book.first_publish_year}</Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleFavorites}>Add to Favorites</Button>
                <Button onClick={handleWishlist}>Add to Wishlist</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}

export default BookModalHome;
