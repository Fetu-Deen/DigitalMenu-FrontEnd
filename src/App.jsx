// import Header from "./Components/Header/Header";
// import FoodItem from "./Components/FoodItem/FoodItem";
// import menu from "./commonResource/Resources/data";
// import "../src/app.css";
// import Footer from "./Components/Footer/Footer";

// function App() {
//   return (
//     <>
//       <Header />
//       <div className="foods-container">
//         {menu.map(({ id, title, img, price, desc }) => {
//           return (
//             <FoodItem
//               key={id} // Use a unique identifier for better performance
//               foodName={title}
//               foodImage={img}
//               foodPrice={price}
//               foodDesc={desc}
//             />
//           );
//         })}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import FoodItem from "./Components/FoodItem/FoodItem";
import "../src/app.css";
import Footer from "./Components/Footer/Footer";

function App() {
  const [menu, setMenu] = useState([]); // State to hold menu items
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch menu items from the server
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if not OK
        }
        const data = await response.json();
        setMenu(data); // Set the fetched data to state
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMenuItems();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error handling
  }

  return (
    <>
      <Header />
      <div className="foods-container">
        {menu.map(({ id, title, img, price, description }) => {
          // Truncate the description to a maximum length of 290 characters
          const truncatedDescription =
            description.length > 290
              ? `${description.substring(0, 290)}...`
              : description;

          return (
            <FoodItem
              key={id} // Use a unique identifier for better performance
              foodName={title}
              foodImage={img}
              foodPrice={typeof price === "number" ? price : parseFloat(price)} // Ensure price is a number
              foodDesc={truncatedDescription} // Pass the truncated description
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default App;
