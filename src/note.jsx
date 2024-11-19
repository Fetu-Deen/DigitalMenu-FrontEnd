// // <!-- import Header from "./Components/Header";
// // import FoodItem from "./Components/FoodItem";
// // import menu from "./commonResource/Resources/data";
// // import "../src/app.css";
// // function App() {
// // return (
// // <>
// {/* <Header />; */}
// {
//   /* ****There are 3 ways of using props to reuse our components for this project *****/
// }
// {
//   /* Method 1: Replicating each components: Which is not effective for ulk of datas */
// }
// {
//   /* <div class="foods-container">
//         <FoodItem
//             image="https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-timatim-salata.jpg.webp"
//             title="TIMATIM SELAXA (ቲማቲም ሰላጣ)" price="$5.99" desc="Timatim Salata refers to a type of fresh Ethiopian tomato salad
//             that’s also popular in Eritrea. It’s made with diced tomatoes,
//             minced onions, and finely chopped peppers dressed with a mixture of
//             berbere spices, olive oil, vinegar, and lemon juice." />
//         <FoodItem
//             image="https://media.cnn.com/api/v1/images/stellar/prod/190205144959-shekla-tibs.jpg?q=w_1600,h_900,x_0,y_0,c_fill/w_1280"
//             title="TIBS (ጥብስ)" price="$22.99" desc="Sliced beef or lamb, pan-fried in butter, garlic and onion, tibs is
//             one of the most popular dishes among Ethiopians. It comes in a
//             variety of forms, varying in type, size or shape of the cuts of meat
//             used, and can range from hot to mild or contain..." />
//         <FoodItem image="https://cdn.tasteatlas.com//images/dishes/d64fe1f3c3754340bfbc7e20510110ef.jpg?w=905&h=510"
//             title="GENFO (ገንፎ)" price="$20.99"
//             desc="Genfo is a simple Ethiopian porridge that is commonly consumed for breakfast, made by adding dry-roasted barley flour to boiling water and stirring the concoction with a wooden utensil until it develops a smooth, yet extremely thick consistency." />
//         <FoodItem image="https://cdn.tasteatlas.com//images/dishes/5746f1c174664a01990eb04377c9228a.jpg?w=905&h=510"
//             title="KINCHE (ቂንጬ)" price="$7.99"
//             desc="Simple, nutritious, and inexpensive, kinche is an Ethiopian breakfast staple made with cracked wheat that is boiled in either water or milk. The best way to describe kinche would be as the Ethiopian equivalent of oatmeal. After it has been cooked, kinche is added to the pan with either clarified spiced butter known as niter qibe or with oil and fried onions, although kinche can also be consumed without any flavorings." />
//         <FoodItem image="https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-kitfo.jpg.webp"
//             title="KITFO (ክትፎ)" price="$25.99" desc="Made from the leanest meat, kitfo is viewed as a big treat by
//             ordinary Ethiopians, while its nutritional powers are also praised.
//             Similar to French steak tartare, the meat is minced and warmed in a
//             pan with a little butter, mitmita (a stronger version of berbere)..." />
//         <FoodItem image="https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-kik-alicha.jpg.webp"
//             title="KIK ALICHA (ክክ አልጫ)" price="$12.99"
//             desc="If you don’t have a high tolerance for spicy food, then you’re going to be thankful for kik alicha. It refers to an Ethiopian lentil stew made from split peas, niter kibbeh, and turmeric. Unlike many of the dishes in this Ethiopian food guide, it isn’t made with any berbere so it isn’t nearly as spicy as dishes like doro wat and siga wat.Kik alicha is a mildly flavored stew made with yellow split peas simmered with garlic, onions, ginger, turmeric, and niter kibbeh. It’s a popular type of vegetarian stew that’s often served as part of a combination platter. Like any wat, it’s best enjoyed with injera." />
//         <FoodItem image="https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-kitfo-gored.jpg.webp"
//             title="GORED GORED (ጎረድ ጎረድ)" price="$28.99"
//             desc="If kitfo piqued your interest, then you may want to try gored gored as well. It’s a similar dish to kitfo except it’s made with cubes of raw beef – usually tenderloin or round steak – seasoned with niter kibbeh, mitmita, berbere, and awaze (chili mustard sauce). Like kitfo, it’s usually served with injera." />
//         <FoodItem image="https://cdn.tasteatlas.com//images/dishes/f99dcc3dfcc642348a40b19f51f32b74.jpg?w=905&h=510"
//             title="FATIRA (ፈጢራ)" price="$18.99"
//             desc="Fatira is a traditional Ethiopian street food item that is commonly consumed for breakfast, consisting of a large, crispy, wheat flour pancake. It is traditionally served with scrambled eggs, honey, or both. Fatira is often cut into smaller pieces, and it is especially popular during Eid-al-Fitr in Ethiopia" />

//         <FoodItem image="https://cdn.tasteatlas.com//images/dishes/f99dcc3dfcc642348a40b19f51f32b74.jpg?w=905&h=510"
//             title="KIXA FIR-FIR (ቂጣ ፍር ፍር)" price="$15.99"
//             desc="Kixa fir-fir is a fit-fit variety prepared with a combination of torn pieces of kitcha flatbread, clarified butter, and berbere spices. The dish is traditionally served for breakfast, when it’s accompanied by plain yogurt. Unlike most Ethiopian dishes, kitcha fit-fit is typically consumed with a spoon instead of using the right hand." />
//     </div> */
// }

// {
//   /* Method 2: Array's Map Method */
// }
// {
//   /* <div class="foods-container">
//         {menu.map((singleFood, i) => {
//         return (
//         <FoodItem key={i} foodName={singleFood.title} foodImage={singleFood.img} foodPrice={singleFood.price}
//             foodDesc={singleFood.desc} />
//         );
//         })}
//     </div> */
// }
// {
//   /* In the above method/method 2 u can do this for infinite no of datas, u just need to multiply ur data inside the
//     data.js, it will render it app.js lay mnm neger salchemr... */
// }

// {
//   /* *********Method 3: Destructuring Method******** */
// }
// {
//   /* The third method is used to make our code cleaner and readable */
// }

// //     <div class="foods-container">
// //         {menu.map(({ title, img, price, desc }, i) => {
// //         return (
// //         <FoodItem key={i} foodName={title} foodImage={img} foodPrice={price} foodDesc={desc} />
// //         );
// //         })}
// //     </div>
// // </>
// // );
// // }

// // export default App; -->


// //USER ROUTE: http://localhost:5174/api/menu
// // OWNER ROUTE: http://localhost:5174/edit/1?owner=true


// // APP.JSX
// // import React, { useEffect, useState } from "react";
// // import Header from "./Components/Header/Header";
// // import FoodItem from "./Components/FoodItem/FoodItem";
// // import "../src/app.css";
// // import Footer from "./Components/Footer/Footer";

// // function App() {
// //   const [menu, setMenu] = useState([]); // State to hold menu items
// //   const [loading, setLoading] = useState(true); // State to manage loading state
// //   const [error, setError] = useState(null); // State to handle errors

// //   // Fetch menu items from the server
// //   useEffect(() => {
// //     const fetchMenuItems = async () => {
// //       try {
// //         const response = await fetch("http://localhost:3000/menu");
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if not OK
// //         }
// //         const data = await response.json();
// //         setMenu(data); // Set the fetched data to state
// //       } catch (error) {
// //         setError(error.message); // Handle error
// //       } finally {
// //         setLoading(false); // Stop loading
// //       }
// //     };

// //     fetchMenuItems();
// //   }, []); // Empty dependency array means this effect runs once on mount

// //   if (loading) {
// //     return <div>Loading...</div>; // Loading state
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>; // Error handling
// //   }

// //   return (
// //     <>
// //       <Header />
// //       <div className="foods-container">
// //         {menu.map(({ id, title, img, price, description }) => {
// //           // Truncate the description to a maximum length of 290 characters
// //           const truncatedDescription =
// //             description.length > 290
// //               ? `${description.substring(0, 290)}...`
// //               : description;

// //           return (
// //             <FoodItem
// //               key={id} // Use a unique identifier for better performance
// //               foodName={title}
// //               foodImage={img}
// //               foodPrice={typeof price === "number" ? price : parseFloat(price)} // Ensure price is a number
// //               foodDesc={truncatedDescription} // Pass the truncated description
// //             />
// //           );
// //         })}
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }

// //App.jsx

// import React, { useEffect, useState } from "react";
// import Header from "./Components/Header/Header";
// import FoodItem from "./Components/FoodItem/FoodItem";
// import "../src/app.css";
// import Footer from "./Components/Footer/Footer";
// import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom"; // Import necessary hooks
// import axios from "axios"; // Import Axios for making HTTP requests
// import { TailSpin } from "react-loader-spinner"; // Correctly import TailSpin loader

// const API_URL = "http://localhost:3001/api/menu"; // Define the base URL for the API
// const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; // Load secret key from .env file

// function App() {
//   const [menu, setMenu] = useState([]); // State to hold menu items
//   const [loading, setLoading] = useState(true); // State to manage loading state
//   const [error, setError] = useState(null); // State to handle errors
//   const [isOwner, setIsOwner] = useState(false); // State to determine if the user is an owner

//   // Function to fetch menu items from the server
//   const fetchMenuItems = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setMenu(response.data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch menu items on component mount and check if user is an owner
//   useEffect(() => {
//     fetchMenuItems(); // Call fetchMenuItems here
//     const queryParams = new URLSearchParams(window.location.search);
//     if (queryParams.get("owner") === "true") {
//       setIsOwner(true);
//     }
//   }, []);
//   //Spinner
//   if (loading) {
//     return (
//       <div className="loader">
//         <div className="loader-square"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error}</p>
//         <button onClick={fetchMenuItems}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <div className="foods-container">
//         {menu.map(({ id, title, img, price, description }) => (
//           <div key={id}>
//             <FoodItemWithToggle
//               foodName={title}
//               foodImage={img}
//               foodPrice={typeof price === "number" ? price : parseFloat(price)}
//               foodDesc={description}
//             />
//             {/* Conditionally render Edit button only for owners */}
//             {isOwner && (
//               <Link to={`/edit/${id}`}>
//                 <button className="edit-button">Edit</button>
//               </Link>
//             )}
//           </div>
//         ))}
//       </div>
//       <Footer />

//       {/* Define Routes for navigation */}
//       <Routes>
//         {/* Edit route */}
//         <Route
//           path="/edit/:id"
//           element={<EditMenu onUpdate={fetchMenuItems} />}
//         />
//       </Routes>
//     </>
//   );
// }

// // New Component: FoodItemWithToggle
// function FoodItemWithToggle({ foodName, foodImage, foodPrice, foodDesc }) {
//   const [showFullDescription, setShowFullDescription] = useState(false); // State to toggle description visibility

//   const toggleDescription = () => {
//     setShowFullDescription((prev) => !prev); // Toggle the description visibility
//   };

//   const isLongDescription = foodDesc.length > 290; // Check if description exceeds 290 characters
//   const displayedDescription = showFullDescription
//     ? foodDesc // Show full description if toggled
//     : `${foodDesc.substring(0, 290)}...`;

//   return (
//     <div className="food-item">
//       <h3>{foodName}</h3>
//       <img src={foodImage} alt={`${foodName}`} className="food-image" />
//       <p className="description">
//         {isLongDescription ? displayedDescription : foodDesc}
//       </p>
//       {isLongDescription && (
//         <button onClick={toggleDescription} className="toggle-desc-button">
//           {showFullDescription ? "Show Less" : "See More Details"}
//         </button>
//       )}
//     </div>
//   );
// }

// // Edit Menu Component for updating menu item details
// function EditMenu({ onUpdate }) {
//   const [price, setPrice] = useState(""); // State to manage price input
//   const [secretKey, setSecretKey] = useState(SECRET_KEY); // Use the secret key here
//   const [foodName, setFoodName] = useState(""); // State to store food name
//   const { id } = useParams(); // Get ID from route parameters
//   const navigate = useNavigate(); // Initialize navigate function for programmatic navigation

//   useEffect(() => {
//     fetchMenuItem(); // Fetch menu item details when component mounts or ID changes
//   }, [id]);

//   // Function to fetch specific menu item details by ID
//   const fetchMenuItem = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/${id}`); // Make GET request for specific item by ID
//       setPrice(response.data.price); // Set price state with fetched item's price
//       setFoodName(response.data.title); // Set food name state with fetched item's title
//     } catch (error) {
//       console.error(error); // Log any errors encountered during fetching specific item details
//     }
//   };

//   // Function to handle updating the menu item when button is clicked
//   const handleUpdateItem = async () => {
//     if (!price || isNaN(price) || parseFloat(price) <= 0) {
//       alert("Please enter a valid positive price."); // Validate that price is entered and is a positive number
//       return;
//     }

//     try {
//       await axios.put(`${API_URL}/${id}`, {
//         price,
//         secret: secretKey, // Include secret key in the request body
//       });
//       alert("Menu item updated successfully!");
//       onUpdate(); // Refresh menu items in parent component after update
//       navigate("/"); // Navigate back to the main menu page after updating
//     } catch (error) {
//       console.error(error);
//       alert("Failed to update menu item.");
//     }
//   };

//   return (
//     <div>
//       <h2>Editing "{foodName}" Menu Item</h2>{" "}
//       {/* Dynamically displaying the food item name */}
//       <input
//         type="text"
//         value={price}
//         onChange={(e) => setPrice(e.target.value)}
//         placeholder="New Price"
//         aria-label="New Price" /* Accessibility label */
//       />
//       <input
//         type="text"
//         value={secretKey}
//         onChange={(e) => setSecretKey(e.target.value)}
//         placeholder="Enter Secret Key"
//         aria-label="Secret Key" /* Accessibility label */
//       />
//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         <button onClick={handleUpdateItem}>Update</button>{" "}
//         {/* Button to trigger update, repositioned to be directly under the inputs */}
//       </div>
//     </div>
//   );
// }

// export default App; // Export App component as default export for usage in other files.

// //USER ROUTE: http://localhost:5174/api/menu
// // OWNER ROUTE: http://localhost:5174/edit/1?owner=true

// // UPDATES...
// //1. User Snippers instead of a simple loading msg
// //2. Does anyone able to know the OWNER route after the app is deployed by just analyzing the code snippets, especially someone who can navigate to the console section? If so how can I hide that using the .env ?
// // // Fetch menu items on component mount and check if user is an owner
// // useEffect(() => {
// //   fetchMenuItems(); // Call fetchMenuItems here
// //   // Check if user is an owner (this could be replaced with actual authentication logic)
// //   const queryParams = new URLSearchParams(window.location.search);
// //   //provides the query string part of the URL (everything after the ?)
// //   if (queryParams.get("owner") === "true") {
// //     setIsOwner(true);
// //   }
// // }, []);

// // 3. Regarding the description:
// // If the characters exceeds 290 char, it will be truncated...there should be some way to see all the description with sth like "See more details" button on it, then it will be displayed easily in the same page malet new
// //4

// //FINALLY
// //You need to divide your app.jsx into multiple components and pages if needed for a better readability and neatness
