import React, { createContext, useContext, useReducer } from "react";
import { BookProps } from "../../../@types";

// Action Types
type Action =
  | { type: "ADD_BOOK"; payload: BookProps }
  | { type: "UPDATE_BOOK"; payload: BookProps }
  | { type: "REMOVE_BOOK"; payload: number };

const bookReducer = (state: BookProps[], action: Action): BookProps[] => {
  switch (action.type) {
    case "ADD_BOOK":
      const lastIndex = state[state.length - 1].id;
      action.payload.id = lastIndex + 1;
      const updatedState = [...state, action.payload];
      localStorage.setItem("books", JSON.stringify(updatedState));
      return updatedState;
    case "UPDATE_BOOK":
      const updatedStateUpdate = state.map((book) =>
        book.id === action.payload.id ? { ...book, ...action.payload } : book
      );
      localStorage.setItem("books", JSON.stringify(updatedStateUpdate));
      return updatedStateUpdate;
    case "REMOVE_BOOK":
      const bookStateData = state.filter((book) => book.id !== action.payload);
      localStorage.setItem("books", JSON.stringify(bookStateData));
      return bookStateData;
    default:
      return state;
  }
};

const BookContext = createContext<
  | {
      books: BookProps[];
      addBook: (book: BookProps) => void;
      updateBook: (book: BookProps) => void;
      removeBook: (id: number) => void;
    }
  | undefined
>(undefined);

const BookProvider: React.FC<any> = ({ children }) => {
  const initialData: BookProps[] = JSON.parse(
    localStorage.getItem("books") as any
  );
  const [books, dispatch] = useReducer(bookReducer, initialData);

  const addBook = (book: BookProps) => {
    dispatch({ type: "ADD_BOOK", payload: book });
  };

  const updateBook = (book: BookProps) => {
    dispatch({ type: "UPDATE_BOOK", payload: book });
  };

  const removeBook = (bookId: number) => {
    dispatch({ type: "REMOVE_BOOK", payload: bookId });
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, removeBook }}>
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
