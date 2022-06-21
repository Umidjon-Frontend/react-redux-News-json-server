import React from "react";
import NewsList from "./NewsList";
import NewsAddForm from "./NewsAddForm";
import NewsFilter from "./NewsFilter";

function Main() {
  return (
    <div className="content">
      <NewsList />
      <div className="content__page">
        <NewsAddForm />
        <NewsFilter />
      </div>
    </div>
  );
}

export default Main;
