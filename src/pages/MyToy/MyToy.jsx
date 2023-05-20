import React, { useEffect, useState } from 'react';

const MyToy = () => {
  const [myToys, setMyToys] = useState([]);
  const loggedInUserId = 'your-logged-in-user-id'; // Replace with the actual logged-in user ID

  useEffect(() => {
    // Fetch the toys added by the logged-in user
    const fetchMyToys = async () => {
      try {
        const response = await fetch(`/mytoys?userId=${loggedInUserId}`);
        const data = await response.json();
        setMyToys(data);
      } catch (error) {
        console.log('Error fetching my toys:', error);
      }
    };

    fetchMyToys();
  }, [loggedInUserId]);

  return (
    <div>
      <h1>My Toys</h1>
      {/* Display the toys in a tabular form or any other desired format */}
      {myToys.map((toy) => (
        <div key={toy._id}>
          {/* Display toy information here */}
        </div>
      ))}
    </div>
  );
};

export default MyToy;
