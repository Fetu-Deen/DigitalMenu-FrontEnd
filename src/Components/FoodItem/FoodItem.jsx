import React from "react";

const FoodItem = ({ foodImage, foodName, foodPrice, foodDesc }) => {
  return (
    <div className="single-food">
      <div className="img">
        <img src={foodImage} alt={foodName} />
      </div>
      <div className="title-price">
        <h3>{foodName}</h3>
        {foodPrice && <p>{foodPrice}</p>}
        {/* The above ternary operator is used to handle cases when the price of a single food is not given. */}
      </div>
      <div className="food-desc">{foodDesc.substring(0, 290)}...</div>
    </div>
  );
};

export default FoodItem;
