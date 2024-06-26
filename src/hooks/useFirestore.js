import { projectFirestore, timestamp } from "../firebase/config";
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
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return { isPending: false, document: action.payload, success: true, error: null };
    case "DELETE_DOCUMENT":
      return {isPending: false, document: null, success: false, error: null };
    case "ERROR":
      return {isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
}

const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firesoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = projectFirestore.collection(collection);

  // dispatching if not Cancelled i.e if the component which is using this hook is still mounted.
  const dispatchIfNotCancelled = (action) => {
    if(!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({...doc, createdAt});
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument })
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message})
    }

  }

  // delete from document 
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();

      dispatchIfNotCancelled({type: "DELETE_DOCUMENT" });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete document"})
    }

  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response };
}

export {useFirestore};