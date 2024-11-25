import React, { useEffect, useState, useRef } from "react";
import Header from "./Components/Header/Header";
import FoodItem from "./Components/FoodItem/FoodItem";
import Footer from "./Components/Footer/Footer";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../src/app.css";

const API_URL = "http://localhost:3001/api/menu"; // Backend API URL

function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const foodItemRefs = useRef([]);

  // Fetch menu items
  const loadMenuItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setMenu(response.data);
    } catch (err) {
      setError("Failed to fetch menu items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenuItems();

    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("owner") === "true") {
      setIsOwner(true);
    }
  }, []);

  // Handle scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    foodItemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => foodItemRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, [menu]);

  const closeModal = () => setPreviewImage(null);

  if (loading) return <div className="loader"><div className="loader-square"></div></div>;
  if (error) return <div><p>{error}</p><button onClick={loadMenuItems}>Retry</button></div>;

  return (
    <>
      <Header />
      <div className="foods-container">
        {menu.map(({ id, title, img, price, description }, index) => (
          <div
            key={id}
            className="food-item"
            ref={(el) => (foodItemRefs.current[index] = el)}
          >
            <FoodItem
              foodName={title}
              foodImage={img}
              foodPrice={price}
              foodDesc={description}
              onImageClick={() => setPreviewImage(img)}
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
        <div className="modal-overlay" onClick={closeModal} role="dialog" aria-label="Image Preview">
          <div className="modal-content">
            <img src={previewImage} alt="Full Preview" className="modal-image" />
          </div>
        </div>
      )}

      <Footer />
      <Routes>
        <Route path="/edit/:id" element={<EditMenu onUpdate={loadMenuItems} />} />
      </Routes>
    </>
  );
}

function EditMenu({ onUpdate }) {
  const [price, setPrice] = useState("");
  const [foodName, setFoodName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setPrice(response.data.price);
        setFoodName(response.data.title);
      } catch (error) {
        console.error("Failed to load menu item:", error);
      }
    };
    fetchMenuItem();
  }, [id]);

  const handleUpdateItem = async () => {
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      alert("Please enter a valid positive price.");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, { price });
      alert("Menu item updated successfully!");
      onUpdate();
      navigate("/");
    } catch (error) {
      console.error("Failed to update menu item:", error);
      alert("Failed to update menu item.");
    }
  };

  return (
    <div>
      <h2>Edit "{foodName}"</h2>
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
