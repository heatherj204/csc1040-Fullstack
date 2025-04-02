import React, { useEffect } from 'react';
import { useParams } from 'react-router'
import CohortList from './CohortList';

export default function Degree() {
    const { degree } = useParams();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/degree/'+degree)
        .catch(error => console.error(error));
    });
    return (
            <CohortList degreeID={degree} />
    );
}
