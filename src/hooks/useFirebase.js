import { projectFirestore } from "../firebase/config";
import { useReducer, useState } from "react";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firesoreReducer = (state, action) => {
  switch (action.type) {
    // cases
    default:
      return state;
  }
}

const useFirebase = (collection) => {
  const [response, dispatch] = useReducer(firesoreReducer, initialState);

  const ref = projectFirestore.collection(collection);

  // add a document
  const addDocument = (doc) => {

  }

  // delete from document 
  const deleteDocument = (id) => {

  }

  return { addDocument, deleteDocument, response };
}

export default useFirebase;