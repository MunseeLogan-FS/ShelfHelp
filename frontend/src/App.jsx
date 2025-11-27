import React from "react";
import MyNav from "./components/MyNav";
import { Route, Routes } from "react-router";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import MyBooks from "./components/pages/MyBooks";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main style={styles.app}>
      <Toaster />

      <MyNav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mybooks" element={<MyBooks />} />
      </Routes>
    </main>
  );
}

export default App;

const styles = {
  app: {
    backgroundColor: "#1A365D",
    minHeight: "100vh",
  },
};
