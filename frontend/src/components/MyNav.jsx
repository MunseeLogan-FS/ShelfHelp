import React from "react";
import { Link as RouteLink, useLocation } from "react-router";
import { Tabs } from "@chakra-ui/react";
import "./MyNav.css";

const MyNav = () => {
  const location = useLocation();

  const routeToTab = {
    "/home": "home",
    "/search": "search",
    "/mybooks": "books",
  };

  const currentTab = routeToTab[location.pathname] || "home";

  return (
    <div className="nav">
      <h1 className="head">ShelfHelp</h1>
      <div className="tabs">
        <Tabs.Root value={currentTab}>
          <Tabs.List>
            <Tabs.Trigger value="home" asChild>
              <RouteLink to="/home">Home</RouteLink>
            </Tabs.Trigger>
            <Tabs.Trigger value="search" asChild>
              <RouteLink to="/search">Search</RouteLink>
            </Tabs.Trigger>
            <Tabs.Trigger value="books" asChild>
              <RouteLink to="/mybooks">Books</RouteLink>
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>
      {/* leaving out for now waiting for more backend functionality */}
      <div className="avatar"></div>
    </div>
  );
};
export default MyNav;
