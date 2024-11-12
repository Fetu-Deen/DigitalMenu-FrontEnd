import React from "react";

const FoodItem = ({ foodImage, foodName, foodPrice, foodDesc }) => {
  // Convert foodPrice to a number if it's not already
  const price =
    typeof foodPrice === "number" ? foodPrice : parseFloat(foodPrice);

  return (
    <div className="single-food">
      <div className="img">
        <img src={foodImage} alt={foodName} />
      </div>
      <div className="title-price">
        <h3>{foodName}</h3>
        {price && !isNaN(price) && <p>${price.toFixed(2)}</p>}{" "}
        {/* Format price */}
      </div>
      <div className="food-desc">{foodDesc}...</div>{" "}
      {/* Keep original description handling */}
    </div>
  );
};

export default FoodItem;
