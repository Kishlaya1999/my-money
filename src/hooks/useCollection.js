 import { projectFirestore } from "../firebase/config";
 import { useEffect, useRef, useState } from "react";
 
 const useCollection = (collection, _query) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    // since _query is an array so everytime is has diffrent refrence value so it leads to a infinite render to avoid this situation we are using useRef hook
    const query = useRef(_query).current;

    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        if(query) {
            ref = ref.where(...query);
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id});
            })

            setDocuments(results);
            setError(null);
        }, (error) => {
            setError("could not fetch the data")
        } )
    }, [collection, query])

    return {documents, error}
 }

 export {useCollection};