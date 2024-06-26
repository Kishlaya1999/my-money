 import { projectFirestore } from "../firebase/config";
 import { useEffect, useState } from "react";
 
 const useCollection = (collection) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ref = projectFirestore.collection(collection);

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
    }, [collection])

    return {documents, error}
 }

 export {useCollection};