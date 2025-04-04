import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import StudentList from '../components/StudentList';
import Heading from '../components/Heading';

export default function ModuleStudent() {
    const { code } = useParams();
    const [students, setstudent] = useState([]);
    const Modurl = 'http://127.0.0.1:8000/api/module/'+code;

    useEffect(() => {
        fetch(Modurl)
        .then(response => response.json())
        .then(json => {
            json.delivered_to.forEach(del => {
                const code = del.split('/')
                getStudent(code[code.length - 2])
            });
            console.log(json)
        })
        .catch(error => console.error(error));
    }, []);

    function getStudent(cohort) {
        if (!cohort) return null;
        fetch('http://127.0.0.1:8000/api/student?cohort='+cohort)
            .then(response => response.json())
            .then(json => {
                setstudent(prev => {
                    return [...prev,...json]
                })
            })
        };

    return(
        <>
            <Heading primary={'Students taking:'} secondary={code}/>
            <StudentList filteredStudents={students}/>
        </>
    );
}