import React, { useEffect, useState, useRef } from "react";
import Header from "./Components/Header/Header";
import FoodItem from "./Components/FoodItem/FoodItem";
import "../src/app.css";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Define the API URL to fetch menu data from the server
// const API_URL = "http://localhost:3001/api/menu";
const API_URL = "https://server.moonlight-menu.com/api/menu"; //after the server deployed, on cPanel

function App() {
  // State variables
  const [menu, setMenu] = useState([]); // Stores the menu items fetched from the server
  const [loading, setLoading] = useState(true); // Tracks the loading state
  const [error, setError] = useState(null); // Stores any errors from fetching data
  const [isOwner, setIsOwner] = useState(false); // Determines if the current user is the owner
  const [previewImage, setPreviewImage] = useState(null); // Holds the image for the full-screen modal preview
  const [newFoodItem, setNewFoodItem] = useState({
    title: "",
    price: "",
    description: "",
    img: null,
  }); // Stores new item input data

  const foodItemRefs = useRef([]); // References to food items for scroll animations

  // Fetch menu items from the API
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(API_URL); // Make GET request to fetch menu data
      setMenu(response.data); // Store the fetched menu data in state
    } catch (error) {
      setError(error.message); // Save any error messages
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  // Initial setup: fetch menu items and check if the user is the owner
  useEffect(() => {
    fetchMenuItems();

    // Check the query parameter in the URL to determine if the user is the owner
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("owner") === "true") {
      setIsOwner(true);
    }
  }, []);

  // Scroll animations using IntersectionObserver
  useEffect(() => {
    // Initially hide all food items
    foodItemRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add("hidden");
      }
    });

    // Set up the observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("hidden"); // Reveal the item
            entry.target.classList.add("visible"); // Add animation class
          }
        });
      },
      { threshold: 0.1 } // Trigger the animation when 10% of the element is visible
    );

    // Attach observer to each food item
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

  // Function to close the modal by clearing the preview image state
  const closeModal = () => setPreviewImage(null);

  // Handle form input changes for new menu item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFoodItem((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload for new menu item
  const handleImageChange = (e) => {
    setNewFoodItem((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  // Handle adding a new food item
  const handleAddItem = async (e) => {
    e.preventDefault();

    const { title, price, description, img } = newFoodItem;

    // Prompt the owner for the secret key
    const secretKey = prompt("Please enter your secret key:");
    if (!secretKey) {
      alert("Secret key is required.");
      return;
    }

    if (!title || !price || !description || !img) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("img", img);
    formData.append("secret", secretKey); // Add the secret key to the form data

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("New menu item added!");
      fetchMenuItems(); // Refresh menu after adding the item
    } catch (error) {
      console.error(error);
      alert("Failed to add new item. Please check your secret key.");
    }
  };

  // Render a loading spinner if data is being fetched
  if (loading) {
    return (
      <div className="loader">
        <div className="loader-square"></div>
      </div>
    );
  }

  // Render an error message and retry button if data fetch fails
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
      {/* Display the list of food items */}
      <div className="foods-container">
        {menu.map(({ id, title, img, price, description }, index) => (
          <div
            key={id}
            className="food-item"
            ref={(el) => (foodItemRefs.current[index] = el)} // Assign a unique reference for animations
          >
            <FoodItemWithToggle
              foodName={title}
              foodImage={img}
              foodPrice={typeof price === "number" ? price : parseFloat(price)}
              foodDesc={description}
              id={id} // Pass the food item's ID to the component
              fetchMenuItems={fetchMenuItems} // Pass fetchMenuItems function to refresh the menu after deletion
              isOwner={isOwner} // Pass the isOwner state to determine if the delete button should show
            />
            {isOwner && (
              <Link to={`/edit/${id}`}>
                <button className="edit-button">Edit</button>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Form to add a new menu item (only visible to owners) */}
      {isOwner && (
        <div className="add-item-form">
          <h2>Add a New Menu Item</h2>
          <form onSubmit={handleAddItem}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newFoodItem.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newFoodItem.price}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newFoodItem.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="img"
              placeholder="Image Link (URL)"
              value={newFoodItem.img}
              onChange={handleInputChange}
            />
            <button type="submit">Add Item</button>
          </form>
        </div>
      )}

      {/* Full-screen image modal */}
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
      {/* Define routes for different pages */}
      <Routes>
        <Route
          path="/edit/:id"
          element={<EditMenu onUpdate={fetchMenuItems} />} // Page for editing a menu item
        />
      </Routes>
    </>
  );
}

function FoodItemWithToggle({
  foodName,
  foodImage,
  foodPrice,
  foodDesc,
  id,
  fetchMenuItems,
  isOwner,
}) {
  const [showFullDescription, setShowFullDescription] = useState(false); // Toggles the display of the full description
  const [imageLoaded, setImageLoaded] = useState(false); // Tracks the loading state of the image
  const [isModalOpen, setIsModalOpen] = useState(false); // Toggles the image modal

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev); // Toggle description visibility
  };

  const openModal = () => setIsModalOpen(true); // Open the image modal
  const closeModal = () => setIsModalOpen(false); // Close the image modal

  const isLongDescription = foodDesc.length > 290; // Check if the description exceeds 290 characters
  const displayedDescription = showFullDescription
    ? foodDesc
    : `${foodDesc.substring(0, 290)}...`; // Truncate if necessary

  // Handle delete item
  const handleDelete = async () => {
    const secretKey = prompt("Please enter your secret key:");

    if (!secretKey) {
      alert("Secret key is required.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`, { data: { secret: secretKey } }); // Send the secret key along with the delete request
      alert("Menu item deleted successfully!");
      fetchMenuItems(); // Refresh the menu after deletion
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="food-item">
      <h3>{foodName}</h3>
      <div className="image-wrapper" onClick={openModal}>
        {!imageLoaded && <div className="placeholder">Loading...</div>}{" "}
        <img
          src={foodImage}
          alt={`${foodName}`}
          className={`food-image ${imageLoaded ? "loaded" : "loading"}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)} // Mark image as loaded
        />
      </div>
      <p className="food-price">ETB {foodPrice.toFixed(2)}</p>
      <p className="description">
        {isLongDescription ? displayedDescription : foodDesc}
      </p>
      {isLongDescription && (
        <button onClick={toggleDescription} className="toggle-desc-button">
          {showFullDescription ? "Show Less" : "See More Details"}
        </button>
      )}

      {/* Only show the delete button for owners */}
      {isOwner && (
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      )}

      {/* Modal for the full image preview */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={foodImage} alt="Full Preview" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
}

function EditMenu({ onUpdate }) {
  const [price, setPrice] = useState(""); // Holds the updated price value
  const [foodName, setFoodName] = useState(""); // Holds the current food name
  const { id } = useParams(); // Retrieve the menu item's ID from the URL
  const navigate = useNavigate(); // Navigate programmatically after editing

  useEffect(() => {
    fetchMenuItem(); // Fetch menu item details when the component is mounted
  }, [id]);

  const fetchMenuItem = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`); // Fetch details of the item to be edited
      setPrice(response.data.price);
      setFoodName(response.data.title);
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  const handleUpdateItem = async () => {
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      alert("Please enter a valid positive price."); // Validate the price input
      return;
    }

    const secretKey = prompt("Please enter your secret key:"); // Authenticate the user with a secret key

    try {
      // Send the updated price and secret key in a PUT request
      await axios.put(`${API_URL}/${id}`, {
        price,
        secret: secretKey,
      });
      alert("Menu item updated successfully!");
      onUpdate(); // Refresh the menu list
      navigate("/"); // Navigate back to the home page
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
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

// USER ROUTE: http://localhost:5173/api/menu
// OWNER ROUTE: http://localhost:5173/edit/1?owner=true
