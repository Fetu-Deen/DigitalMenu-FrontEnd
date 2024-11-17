// import React, { useEffect, useState } from "react";
// import Header from "./Components/Header/Header";
// import FoodItem from "./Components/FoodItem/FoodItem";
// import "../src/app.css";
// import Footer from "./Components/Footer/Footer";

// function App() {
//   const [menu, setMenu] = useState([]); // State to hold menu items
//   const [loading, setLoading] = useState(true); // State to manage loading state
//   const [error, setError] = useState(null); // State to handle errors

//   // Fetch menu items from the server
//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/menu");
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if not OK
//         }
//         const data = await response.json();
//         setMenu(data); // Set the fetched data to state
//       } catch (error) {
//         setError(error.message); // Handle error
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchMenuItems();
//   }, []); // Empty dependency array means this effect runs once on mount

//   if (loading) {
//     return <div>Loading...</div>; // Loading state
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Error handling
//   }

//   return (
//     <>
//       <Header />
//       <div className="foods-container">
//         {menu.map(({ id, title, img, price, description }) => {
//           // Truncate the description to a maximum length of 290 characters
//           const truncatedDescription =
//             description.length > 290
//               ? `${description.substring(0, 290)}...`
//               : description;

//           return (
//             <FoodItem
//               key={id} // Use a unique identifier for better performance
//               foodName={title}
//               foodImage={img}
//               foodPrice={typeof price === "number" ? price : parseFloat(price)} // Ensure price is a number
//               foodDesc={truncatedDescription} // Pass the truncated description
//             />
//           );
//         })}
//       </div>
//       <Footer />
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import FoodItem from "./Components/FoodItem/FoodItem";
import "../src/app.css";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom"; // Import necessary hooks
import axios from "axios"; // Import Axios for making HTTP requests

const API_URL = "http://localhost:3001/api/menu"; // Define the base URL for the API
const SECRET_KEY = "moonlight"; // Hardcoded secret key for demonstration (avoid in production)

function App() {
  const [menu, setMenu] = useState([]); // State to hold menu items
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const [isOwner, setIsOwner] = useState(false); // State to determine if the user is an owner

  // Function to fetch menu items from the server
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setMenu(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch menu items on component mount and check if user is an owner
  useEffect(() => {
    fetchMenuItems(); // Call fetchMenuItems here

    // Check if user is an owner (this could be replaced with actual authentication logic)
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("owner") === "true") {
      setIsOwner(true);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="foods-container">
        {menu.map(({ id, title, img, price, description }) => {
          const truncatedDescription =
            description.length > 290
              ? `${description.substring(0, 290)}...`
              : description;

          return (
            <div key={id}>
              <FoodItem
                foodName={title}
                foodImage={img}
                foodPrice={
                  typeof price === "number" ? price : parseFloat(price)
                }
                foodDesc={truncatedDescription}
              />
              {/* Conditionally render Edit button only for owners */}
              {isOwner && (
                <Link to={`/edit/${id}`}>
                  <button>Edit</button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <Footer />

      {/* Define Routes for navigation */}
      <Routes>
        <Route
          path="/edit/:id"
          element={<EditMenu onUpdate={fetchMenuItems} />}
        />{" "}
        {/* Edit route */}
      </Routes>
    </>
  );
}

// Edit Menu Component for updating menu item details
function EditMenu({ onUpdate }) {
  const [price, setPrice] = useState(""); // State for price input
  const [secretKey, setSecretKey] = useState(SECRET_KEY); // Use the secret key here
  const { id } = useParams(); // Get ID from route parameters
  const navigate = useNavigate(); // Initialize navigate function for programmatic navigation

  useEffect(() => {
    fetchMenuItem(); // Fetch menu item details when component mounts or ID changes
  }, [id]);

  // Function to fetch specific menu item details by ID
  const fetchMenuItem = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`); // Make GET request for specific item by ID
      setPrice(response.data.price); // Set price state with fetched item's price
      // No need to set imageUrl since we're removing it
    } catch (error) {
      console.error(error); // Log any errors encountered during fetching specific item details
    }
  };

  // Function to handle updating the menu item when button is clicked
  const handleUpdateItem = async () => {
    if (!price || isNaN(price)) {
      alert("Please enter a valid price."); // Validate that price is entered and is a number
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, {
        price,
        secret: secretKey, // Include secret key in the request body
        // No need to include image_url here
      });
      alert("Menu item updated successfully!");
      onUpdate(); // Refresh menu items in parent component after update
      navigate("/"); // Navigate back to the main menu page after updating
    } catch (error) {
      console.error(error);
      alert("Failed to update menu item.");
    }
  };

  return (
    <div>
      <h2>Edit Menu Item</h2>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="New Price"
        aria-label="New Price" /* Accessibility label */
      />
      <input
        type="text"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        placeholder="Enter Secret Key"
        aria-label="Secret Key" /* Accessibility label */
      />
      <button onClick={handleUpdateItem}>Update</button>{" "}
      {/* Button to trigger update */}
    </div>
  );
}

export default App; // Export App component as default export for usage in other files.

//USER ROUTE: http://localhost:5174/api/menu
// OWNER ROUTE: http://localhost:5174/edit/1?owner=true