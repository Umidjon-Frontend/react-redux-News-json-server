import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../hook/useHttp";
import { v4 } from "uuid";
import { newsCreated } from "../redux/actions";

function NewsAddForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const { request } = useHttp();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newNews = { id: v4(), name, description, category };
    request("http://localhost:3001/news", "POST", JSON.stringify(newNews))
      .then((res) => console.log(res))
      .then(dispatch(newsCreated(newNews)))
      .catch((e) => console.log(e));

    setName("");
    setDescription("");
    setCategory("");
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Name for new News
        </label>
        <input
          type="text"
          required
          name="name"
          className="form-control"
          id="name"
          placeholder="What is name of news?"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Describtion
        </label>
        <textarea
          style={{ height: "120px" }}
          type="text"
          required
          name="name"
          className="form-control"
          id="text"
          placeholder="What is your news about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Choose category of news
        </label>
        <select
          required
          className="form-select"
          id="category"
          name="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option>News About...</option>
          <option value="hot news">Hot news</option>
          <option value="sport news">Sport news</option>
          <option value="world news">World news</option>
        </select>
      </div>
      <button className="btn shadow-lg text-light btn-dark">Create News</button>
    </form>
  );
}

export default NewsAddForm;
