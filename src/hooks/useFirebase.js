import { projectFirestore } from "../firebase/config";
import { useEffect, useReducer, useState } from "react";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firesoreReducer = (state, action) => {
  switch (action.type) {
    // cases
    case "IS_PENDING":
      return { ...state, isPending: true };
    case "ADDED_DOCUMENT":
      return { ...state, isPending: false, document: action.payload };
    default:
      return state;
  }
}

const useFirebase = (collection) => {
  const [response, dispatch] = useReducer(firesoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = projectFirestore.collection(collection);

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await ref.add(doc);
      dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (error) {

    }

    ref.add(doc);
  }

  // delete from document 
  const deleteDocument = (id) => {

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response };
}

export default useFirebase;