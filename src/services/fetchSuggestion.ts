const fetchSuggestion = () =>
  fetch("api/suggestion", {
    cache: "no-store",
  }).then((res) => res.json());

export default fetchSuggestion;
