import React, { useEffect } from "react";
import { useHttp } from "../hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import Error from "./Error";
import classNames from "classnames";
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} from "../redux/actions";

function NewsFilter() {
  const { filters, filterLoadingStatus, activeFilter } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filter")
      .then((data) => dispatch(filtersFetched(data)))
      .catch((err) => dispatch(filtersFetchingError(err)));
  }, []);

  if (filterLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filterLoadingStatus === "error") {
    return <Error />;
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h4 className="text-center mt5">News doesn't exists</h4>;
    }

    return arr.map(({ name, className, label }) => {
      const btnClasses = classNames("btn", className, {
        active: name === activeFilter,
      });
      return (
        <button
          key={name}
          id={name}
          className={btnClasses}
          onClick={() => dispatch(activeFilterChanged(name))}
        >
          {label}
        </button>
      );
    });
  };

  const elements = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">filter by category</p>
        <div className="btn-group">{elements}</div>
      </div>
    </div>
  );
}

export default NewsFilter;
