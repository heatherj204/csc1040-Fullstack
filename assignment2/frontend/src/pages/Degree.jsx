import React, { useEffect } from 'react';
import { useParams } from 'react-router'
import CohortList from '../components/CohortList';

export default function Degree() {
    const { degree } = useParams();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/degree/'+degree)
        .catch(error => {
        console.error(error)
        alert("Failed Fetch")
      });
    });
    return (
            <CohortList degreeID={degree} />
    );
}
