import React, { useState, useEffect } from 'react';

function Apisomething() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
      console.log({data})
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default Apisomething;

// import React, { useState, useEffect } from 'react';

// function Apisomething() {
//   const [course, setcourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/api/degree/');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const json = await response.json();
//         setcourse(json);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       {course ? <pre>{JSON.stringify(course, null, 2)}</pre> : <p>No data available.</p>}
//     </div>
//   );
// }

// export default Apisomething;
