const initialState = {
  news: [],
  newsLoadingStatus: "uma",
  filters: [],
  filterLoadingStatus: "uma",
  activeFilter: "all",
  filteredNews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEWS_FETCHING":
      return {
        ...state,
        newsLoadingStatus: "loading",
      };
    case "NEWS_FETCHED":
      return {
        ...state,
        news: action.payload,
        filteredNews:
          state.activeFilter === "all"
            ? action.payload
            : action.payload.filter((s) => s.category === state.activeFilter),
        newsLoadingStatus: "uma",
      };
    case "NEWS_FETCHING_ERROR":
      return {
        ...state,
        newsLoadingStatus: "error",
      };
    case "NEWS_CREATED":
      const newsCreatedNewsList = [...state.news, action.payload];
      return {
        ...state,
        news: newsCreatedNewsList,
        filteredNews:
          state.activeFilter === "all"
            ? newsCreatedNewsList
            : newsCreatedNewsList.filter(
                (s) => s.category === state.activeFilter
              ),
      };
    case "FILTERS_FETCHING":
      return {
        ...state,
        filterLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filterLoadingStatus: "uma",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filterLoadingStatus: "error",
      };
    case "ACTIVE_FILTER_CHANGED":
      return {
        ...state,
        activeFilter: action.payload,
        filteredNews:
          action.payload === "all"
            ? state.news
            : state.news.filter((s) => s.category === action.payload),
      };
    case "DELETE_NEWS":
      const newNews = state.news.filter((s) => s.id !== action.payload);
      return {
        ...state,
        news: newNews,
        filteredNews:
          state.activeFilter === "all"
            ? newNews
            : newNews.filter((s) => s.category === state.activeFilter),
      };
    default:
      return state;
  }
};

export default reducer;
