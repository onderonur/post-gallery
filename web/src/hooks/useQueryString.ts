import queryString from "query-string";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryString = () => {
  const location = useLocation();
  const { search } = location;
  const searchParams = useMemo(() => queryString.parse(search), [search]);
  return searchParams;
};

export default useQueryString;
