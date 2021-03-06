import { useEffect, useState } from 'react';
import getData from '../helpers/getData';
import { useHistory } from 'react-router-dom';

export default function useCenterSpaces(centerId) {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    let history = useHistory();

    useEffect(() => {
        setLoading(true);
        getData('/api/search/space', { id_centro: centerId })
            .then((data) => {
                setResults(data.results);
                setLoading(false);
            })
            .catch((error) => {
                history.replace('/nomatch');
            });
    }, [centerId, history]);

    return [loading, results];
}
