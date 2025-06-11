import { Button, Dialog, Portal, Text } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";

function WishModal({ isOpen, onClose, book, onWishRemoved, onWishMoved }) {
  const handleRemove = () => {
    const existingWishes = JSON.parse(localStorage.getItem("wishList")) || [];

    const checkWish = [...existingWishes, book];

    const alreadyWish = checkWish.some(
      (savedBook) => savedBook.key === book.key
    );

    if (alreadyWish) {
      const wishBooks = existingWishes.filter(
        (savedBook) => savedBook.key !== book.key
      );
      localStorage.setItem("wishList", JSON.stringify(wishBooks));
      console.log("Book removed from to Wishlist:", book);

      toaster.create({
        description: "book has been removed from your Wishlist",
        type: "info",
        duration: 2000,
      });

      onWishRemoved?.();
      onClose();

      return;
    }
  };

  const handleMove = () => {
    const existingWishes = JSON.parse(localStorage.getItem("wishList")) || [];
    const existingFavorites = JSON.parse(
      localStorage.getItem("favoriteBooks") || "[]"
    );

    const updatedWishes = existingWishes.filter(
      (savedBook) => savedBook.key !== book.key
    );
    const updatedFavorites = [...existingFavorites, book];

    localStorage.setItem("wishList", JSON.stringify(updatedWishes));
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
    console.log("Book moved to favorites:", book);
    toaster.create({
      description: "book has been moved to your Favorites",
      type: "info",
      duration: 2000,
    });

    onWishRemoved?.();
    onWishMoved?.();
    onClose();
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
                <Button onClick={handleMove}>Move to Favorite</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}

export default WishModal;
