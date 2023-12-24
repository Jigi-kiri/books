import React, { createContext, useContext, useReducer } from "react";
import { BookProps } from "../../../@types";

const InitialData: BookProps[] = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    publicationYear: "2018",
    gener: "Human behaviour",
  },
  {
    id: 2,
    title: "IRON FLAME",
    author: "Rebecca Yarros",
    publicationYear: "2023",
    gener: "Novel",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    publicationYear: "2018",
    gener: "Human behaviour",
  },
  {
    id: 4,
    title: "IRON FLAME",
    author: "Rebecca Yarros",
    publicationYear: "2023",
    gener: "Novel",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    publicationYear: "2018",
    gener: "Human behaviour",
  },
  {
    id: 6,
    title: "IRON FLAME",
    author: "Rebecca Yarros",
    publicationYear: "2023",
    gener: "Novel",
  },
  {
    id: 7,
    title: "Atomic Habits",
    author: "James Clear",
    publicationYear: "2018",
    gener: "Human behaviour",
  },
  {
    id: 8,
    title: "IRON FLAME",
    author: "Rebecca Yarros",
    publicationYear: "2023",
    gener: "Novel",
  },
  {
    id: 9,
    title: "Atomic Habits",
    author: "James Clear",
    publicationYear: "2018",
    gener: "Human behaviour",
  },
  {
    id: 10,
    title: "IRON FLAME",
    author: "Rebecca Yarros",
    publicationYear: "2023",
    gener: "Novel",
  },
];

// Action Types
type Action =
  | { type: "ADD_BOOK"; payload: BookProps }
  | { type: "REMOVE_BOOK"; payload: number };

// Reducer Function
const bookReducer = (state: BookProps[], action: Action): BookProps[] => {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.payload];
    case "REMOVE_BOOK":
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};

const BookContext = createContext<
  | {
      books: BookProps[];
      addBook: (book: BookProps) => void;
      removeBook: (id: number) => void;
    }
  | undefined
>(undefined);

const BookProvider: React.FC<any> = ({ children }) => {
  const [books, dispatch] = useReducer(bookReducer, InitialData);

  const addBook = (book: BookProps) => {
    dispatch({ type: "ADD_BOOK", payload: book });
  };

  const removeBook = (bookId: number) => {
    dispatch({ type: "REMOVE_BOOK", payload: bookId });
  };

  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom Hook to use the Context
const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};

export { BookProvider, useBookContext };
