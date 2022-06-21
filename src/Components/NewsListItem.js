import React from "react";

function NewsListItem({ id, name, description, category, onDeleteNews }) {
  let colorBg;
  switch (category) {
    case "sport news":
      colorBg = "bg-primary text-white";
      break;
    case "hot news":
      colorBg = "bg-danger  text-white";
      break;
    case "world news":
      colorBg = "bg-secondary text-white";
      break;
    default:
      colorBg = "bg-info text-white";
      break;
  }
  return (
    <li className={`card mb-2 ${colorBg}`}>
      <div className="card-header close-pos">
        <b>{name}</b>
        <span className="close" onClick={onDeleteNews}>X</span>
      </div>
      <div className="card-body">{description}</div>
    </li>
  );
}

export default NewsListItem;
