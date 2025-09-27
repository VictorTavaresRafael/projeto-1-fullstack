import { createContext, useContext, useState, useEffect, useRef } from "react";

const CharactersContext = createContext();
export const useCharacters = () => useContext(CharactersContext);

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);

  const calcPagination = (count, pageSize) => {
    setTotalPages(Math.ceil(count / pageSize));
  };

  const getCharacters = async (search) => {
    try {
      setLoading(true);

      if (search && search.length > 0) {
        const params = `?search=${search}${page === 1 ? "" : `&page=${page}`}`;
        const response = await fetch(`https://swapi.py4e.com/api/people/${params}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCharacters(data.results);
        calcPagination(data.count, data.results.length);
      } else {
        let url = "https://swapi.py4e.com/api/people/";
        if (page > 1) {
          url = `https://swapi.py4e.com/api/people/?page=${page}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCharacters(data.results);
        if (page === 1) {
          calcPagination(data.count, data.results.length);
        }
      }
    } catch (error) {
      console.error("Falha ao buscar personagens:", error);
      setCharacters([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  
  const handleSearch = (value) => {
    setPage(1); // sempre volta pra primeira página
    setSearch(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      getCharacters(value);
    }, 1000);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };


  useEffect(() => {
    getCharacters(search);
  }, [page]);

  return (
    <CharactersContext.Provider
      value={{
        characters,
        selectedCharacter,
        setSelectedCharacter,
        page,
        setPage,
        search,
        setSearch: handleSearch, 
        totalPages,
        loading,
        handlePageChange,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};