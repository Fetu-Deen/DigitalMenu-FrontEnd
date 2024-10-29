import Header from "./Components/Header/Header";
import FoodItem from "./Components/FoodItem/FoodItem";
import menu from "./commonResource/Resources/data";
import "../src/app.css";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="foods-container">
        {menu.map(({ id, title, img, price, desc }) => {
          return (
            <FoodItem
              key={id} // Use a unique identifier for better performance
              foodName={title}
              foodImage={img}
              foodPrice={price}
              foodDesc={desc}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default App;
