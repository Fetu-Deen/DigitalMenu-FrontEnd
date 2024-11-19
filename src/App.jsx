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

//App.jsx

import React, { useEffect, useState, useRef } from "react";
import Header from "./Components/Header/Header";
import FoodItem from "./Components/FoodItem/FoodItem";
import "../src/app.css";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const API_URL = "http://localhost:3001/api/menu";
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const foodItemRefs = useRef([]); // References to food items for scroll animations

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setMenu(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();

    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("owner") === "true") {
      setIsOwner(true);
    }
  }, []);

  // Scroll animation
  useEffect(() => {
    // Add `hidden` class to all food items initially
    foodItemRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add("hidden");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("hidden");
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1, // Trigger animation when 10% of the item is visible
      }
    );

    foodItemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Cleanup observer on component unmount
    return () => {
      foodItemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [menu]);

  if (loading) {
    return (
      <div className="loader">
        <div className="loader-square"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchMenuItems}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="foods-container">
        {menu.map(({ id, title, img, price, description }, index) => (
          <div
            key={id}
            className="food-item"
            ref={(el) => (foodItemRefs.current[index] = el)} // Attach refs dynamically
          >
            <FoodItemWithToggle
              foodName={title}
              foodImage={img}
              foodPrice={typeof price === "number" ? price : parseFloat(price)}
              foodDesc={description}
            />
            {isOwner && (
              <Link to={`/edit/${id}`}>
                <button className="edit-button">Edit</button>
              </Link>
            )}
          </div>
        ))}
      </div>
      <Footer />
      <Routes>
        <Route
          path="/edit/:id"
          element={<EditMenu onUpdate={fetchMenuItems} />}
        />
      </Routes>
    </>
  );
}

// New Component: FoodItemWithToggle
function FoodItemWithToggle({ foodName, foodImage, foodPrice, foodDesc }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const isLongDescription = foodDesc.length > 290;
  const displayedDescription = showFullDescription
    ? foodDesc
    : `${foodDesc.substring(0, 290)}...`;

  return (
    <div className="food-item">
      <h3>{foodName}</h3>
      <img src={foodImage} alt={`${foodName}`} className="food-image" />
      <p className="food-price">${foodPrice.toFixed(2)}</p> {/* Price Tag */}
      <p className="description">
        {isLongDescription ? displayedDescription : foodDesc}
      </p>
      {isLongDescription && (
        <button onClick={toggleDescription} className="toggle-desc-button">
          {showFullDescription ? "Show Less" : "See More Details"}
        </button>
      )}
    </div>
  );
}


// Edit Menu Component for updating menu item details
function EditMenu({ onUpdate }) {
  const [price, setPrice] = useState(""); // State to manage price input
  const [secretKey, setSecretKey] = useState(SECRET_KEY); // Use the secret key here
  const [foodName, setFoodName] = useState(""); // State to store food name
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
      setFoodName(response.data.title); // Set food name state with fetched item's title
    } catch (error) {
      console.error(error); // Log any errors encountered during fetching specific item details
    }
  };

  // Function to handle updating the menu item when button is clicked
  const handleUpdateItem = async () => {
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      alert("Please enter a valid positive price."); // Validate that price is entered and is a positive number
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, {
        price,
        secret: secretKey, // Include secret key in the request body
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
      <h2>Editing "{foodName}" Menu Item</h2>{" "}
      {/* Dynamically displaying the food item name */}
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
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handleUpdateItem}>Update</button>{" "}
        {/* Button to trigger update, repositioned to be directly under the inputs */}
      </div>
    </div>
  );
}

export default App; // Export App component as default export for usage in other files.

//USER ROUTE: http://localhost:5174/api/menu
// OWNER ROUTE: http://localhost:5174/edit/1?owner=true

// UPDATES...
//2. Does anyone able to know the OWNER route after the app is deployed by just analyzing the code snippets, especially someone who can navigate to the console section? If so how can I hide that using the .env ?
// // Fetch menu items on component mount and check if user is an owner
// useEffect(() => {
//   fetchMenuItems(); // Call fetchMenuItems here
//   // Check if user is an owner (this could be replaced with actual authentication logic)
//   const queryParams = new URLSearchParams(window.location.search);
//   //provides the query string part of the URL (everything after the ?)
//   if (queryParams.get("owner") === "true") {
//     setIsOwner(true);
//   }
// }, []);

// 3. Regarding the description:
// If the characters exceeds 290 char, it will be truncated...there should be some way to see all the description with sth like "See more details" button on it, then it will be displayed easily in the same page malet new ✅✅ Done this one
//4 But there uneven heights for each items? Correct that foa better experience

//FINALLY
//You need to divide your app.jsx into multiple components and pages if needed for a better readability and neatness
