import React, { useEffect, useState, useRef } from "react";
import Header from "./Components/Header/Header";
import FoodItem from "./Components/FoodItem/FoodItem";
import "../src/app.css";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3001/api/menu";

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // State to track the currently previewed image
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
      { threshold: 0.1 }
    );

    foodItemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      foodItemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [menu]);

  const closeModal = () => setPreviewImage(null); // Close the modal by setting the preview image to null

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
              onImageClick={() => setPreviewImage(img)} // Set the preview image when clicked
            />
            {isOwner && (
              <Link to={`/edit/${id}`}>
                <button className="edit-button">Edit</button>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Full-Screen Modal */}
      {previewImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img
              src={previewImage}
              alt="Full Preview"
              className="modal-image"
            />
          </div>
        </div>
      )}

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

function FoodItemWithToggle({ foodName, foodImage, foodPrice, foodDesc }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false); // Track image loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const openModal = () => setIsModalOpen(true); // Open modal
  const closeModal = () => setIsModalOpen(false); // Close modal

  const isLongDescription = foodDesc.length > 290;
  const displayedDescription = showFullDescription
    ? foodDesc
    : `${foodDesc.substring(0, 290)}...`;

  return (
    <div className="food-item">
      <h3>{foodName}</h3>
      <div className="image-wrapper" onClick={openModal}>
        {!imageLoaded && <div className="placeholder">Loading...</div>}{" "}
        {/* Placeholder */}
        <img
          src={foodImage}
          alt={`${foodName}`}
          className={`food-image ${imageLoaded ? "loaded" : "loading"}`} // Add loading class
          loading="lazy"
          onLoad={() => setImageLoaded(true)} // Set to true when loaded
        />
      </div>
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

function EditMenu({ onUpdate }) {
  const [price, setPrice] = useState("");
  const [foodName, setFoodName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItem();
  }, [id]);

  const fetchMenuItem = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setPrice(response.data.price);
      setFoodName(response.data.title);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateItem = async () => {
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      alert("Please enter a valid positive price.");
      return;
    }

    const secretKey = prompt("Please enter your secret key:"); // Prompt the owner to enter the secret key

    try {
      // Send the price and secret key in the PUT request body
      await axios.put(`${API_URL}/${id}`, {
        price,
        secret: secretKey, // Include the secret key
      });
      alert("Menu item updated successfully!");
      onUpdate();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Failed to update menu item.");
    }
  };

  return (
    <div>
      <h2>Editing "{foodName}" Menu Item</h2>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="New Price"
        aria-label="New Price"
      />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handleUpdateItem}>Update</button>
      </div>
    </div>
  );
}

export default App;

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
// If the characters exceeds 290 char, it will be truncated...there should be some way to see all the description with sth like "See more details" button on it, then it will be displayed easily in the same page malet new ✅✅ this one is now Done
//4 But there're uneven heights for each items? Correct that for a better experience

//FINALLY
//You need to divide your app.jsx into multiple components and pages if needed for a better readability and neatness

// Better Exp for Mobile size:
// Of course! Let’s tackle the features one by one. Let me know which one you’d like to start with, or if you want me to suggest an order. Here’s a quick list of the features we can add to your app:

// Features to be Added for a Better Mobile UX
// **************************************************
// 1. Collapsible Navigation Bar (Hamburger Menu).
// 2. Sticky Header or Footer for better navigation.✅ A simple up-arrow button is enough.
// 3. Optimized Food Item Cards (Stack content, add a More Info button).
// 4. Swipe Gestures for Food Item Actions.
// 5. Full-Screen Image Preview on tap. ✅
// 6. Lazy Loading for Images.✅
// 7. Larger, Tappable Action Buttons.

// EACH:
// 1. Collapsible Navigation Bar
// Why? Save screen space and reduce clutter.
// Solution: Add a responsive hamburger menu for navigation.
// Example: Use libraries like React-Burger-Menu or custom CSS.
// 2. Sticky Header/Footer
// Why? Makes it easier to navigate without scrolling back to the top.
// Solution: Add a sticky header with the app name/logo and a floating action button for quick navigation.
// 3. Card Optimization for Food Items
// Why? On small screens, tall cards can look awkward.
// Solution:
// Stack title, price, and description vertically.
// Add a button like "More Info" that expands to show the full description when tapped.
// 4. Swipe Gestures for Actions
// Why? Touch-based gestures are natural for mobile users.
// Solution: Allow swipe left/right gestures on food items for quick actions like Edit (if owner) or Add to Favorites.
// 5. Full-Screen Image Preview
// Why? Clicking small images to view larger is common for mobile users.
// Solution: Clicking an image opens it in a full-screen modal for a closer look.
// 6. Progressive Loading for Faster UX
// Why? Mobile connections may be slower.
// Solution: Use lazy-loading for images to load only when they're in the viewport.
// 7. Add Mobile-Friendly Action Buttons
// Why? Buttons that are too small frustrate mobile users.
// Solution: Use larger, well-spaced buttons with tappable areas.

// ***********************************************************************
// Features to Remove or Simplify for Mobile UX
// 1. Overloaded Animations/Transitions
// Why? Excessive animations can cause lag on slower devices.
// Solution: Use subtle hover or scroll effects, but avoid animations that affect performance.
// 2. Edit Options Displayed for Every Item
// Why? If an owner is editing frequently, mobile users may find this cluttered.
// Solution: Consolidate editing into a single "Edit Menu" button and use a pop-up or modal interface.
// 3. Long Descriptions in Card View
// Why? Cards with lengthy descriptions take up too much screen space.
// Solution: Keep descriptions short and add a "See More" option for detailed views.
// 4. Full Header/Menu Visibility on Scroll
// Why? Headers and menus can consume valuable screen space.
// Solution: Use auto-hide headers that reappear when scrolling up.
