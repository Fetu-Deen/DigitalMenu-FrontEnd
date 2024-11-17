// <!-- import Header from "./Components/Header";
// import FoodItem from "./Components/FoodItem";
// import menu from "./commonResource/Resources/data";
// import "../src/app.css";
// function App() {
// return (
// <>
{/* <Header />; */}
{
  /* ****There are 3 ways of using props to reuse our components for this project *****/
}
{
  /* Method 1: Replicating each components: Which is not effective for ulk of datas */
}
{
  /* <div class="foods-container">
        <FoodItem
            image="https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-timatim-salata.jpg.webp"
            title="TIMATIM SELAXA (ቲማቲም ሰላጣ)" price="$5.99" desc="Timatim Salata refers to a type of fresh Ethiopian tomato salad
            that’s also popular in Eritrea. It’s made with diced tomatoes,
            minced onions, and finely chopped peppers dressed with a mixture of
            berbere spices, olive oil, vinegar, and lemon juice." />
        <FoodItem
            image="https://media.cnn.com/api/v1/images/stellar/prod/190205144959-shekla-tibs.jpg?q=w_1600,h_900,x_0,y_0,c_fill/w_1280"
            title="TIBS (ጥብስ)" price="$22.99" desc="Sliced beef or lamb, pan-fried in butter, garlic and onion, tibs is
            one of the most popular dishes among Ethiopians. It comes in a
            variety of forms, varying in type, size or shape of the cuts of meat
            used, and can range from hot to mild or contain..." />
        <FoodItem image="https://cdn.tasteatlas.com//images/dishes/d64fe1f3c3754340bfbc7e20510110ef.jpg?w=905&h=510"
            title="GENFO (ገንፎ)" price="$20.99"
            desc="Genfo is a simple Ethiopian porridge that is commonly consumed for breakfast, made by adding dry-roasted barley flour to boiling water and stirring the concoction with a wooden utensil until it develops a smooth, yet extremely thick consistency." />
        <FoodItem image="https://cdn.tasteatlas.com//images/dishes/5746f1c174664a01990eb04377c9228a.jpg?w=905&h=510"
            title="KINCHE (ቂንጬ)" price="$7.99"
            desc="Simple, nutritious, and inexpensive, kinche is an Ethiopian breakfast staple made with cracked wheat that is boiled in either water or milk. The best way to describe kinche would be as the Ethiopian equivalent of oatmeal. After it has been cooked, kinche is added to the pan with either clarified spiced butter known as niter qibe or with oil and fried onions, although kinche can also be consumed without any flavorings." />
        <FoodItem image="https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-kitfo.jpg.webp"
            title="KITFO (ክትፎ)" price="$25.99" desc="Made from the leanest meat, kitfo is viewed as a big treat by
            ordinary Ethiopians, while its nutritional powers are also praised.
            Similar to French steak tartare, the meat is minced and warmed in a
            pan with a little butter, mitmita (a stronger version of berbere)..." />
        <FoodItem image="https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-kik-alicha.jpg.webp"
            title="KIK ALICHA (ክክ አልጫ)" price="$12.99"
            desc="If you don’t have a high tolerance for spicy food, then you’re going to be thankful for kik alicha. It refers to an Ethiopian lentil stew made from split peas, niter kibbeh, and turmeric. Unlike many of the dishes in this Ethiopian food guide, it isn’t made with any berbere so it isn’t nearly as spicy as dishes like doro wat and siga wat.Kik alicha is a mildly flavored stew made with yellow split peas simmered with garlic, onions, ginger, turmeric, and niter kibbeh. It’s a popular type of vegetarian stew that’s often served as part of a combination platter. Like any wat, it’s best enjoyed with injera." />
        <FoodItem image="https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-kitfo-gored.jpg.webp"
            title="GORED GORED (ጎረድ ጎረድ)" price="$28.99"
            desc="If kitfo piqued your interest, then you may want to try gored gored as well. It’s a similar dish to kitfo except it’s made with cubes of raw beef – usually tenderloin or round steak – seasoned with niter kibbeh, mitmita, berbere, and awaze (chili mustard sauce). Like kitfo, it’s usually served with injera." />
        <FoodItem image="https://cdn.tasteatlas.com//images/dishes/f99dcc3dfcc642348a40b19f51f32b74.jpg?w=905&h=510"
            title="FATIRA (ፈጢራ)" price="$18.99"
            desc="Fatira is a traditional Ethiopian street food item that is commonly consumed for breakfast, consisting of a large, crispy, wheat flour pancake. It is traditionally served with scrambled eggs, honey, or both. Fatira is often cut into smaller pieces, and it is especially popular during Eid-al-Fitr in Ethiopia" />

        <FoodItem image="https://cdn.tasteatlas.com//images/dishes/f99dcc3dfcc642348a40b19f51f32b74.jpg?w=905&h=510"
            title="KIXA FIR-FIR (ቂጣ ፍር ፍር)" price="$15.99"
            desc="Kixa fir-fir is a fit-fit variety prepared with a combination of torn pieces of kitcha flatbread, clarified butter, and berbere spices. The dish is traditionally served for breakfast, when it’s accompanied by plain yogurt. Unlike most Ethiopian dishes, kitcha fit-fit is typically consumed with a spoon instead of using the right hand." />
    </div> */
}

{
  /* Method 2: Array's Map Method */
}
{
  /* <div class="foods-container">
        {menu.map((singleFood, i) => {
        return (
        <FoodItem key={i} foodName={singleFood.title} foodImage={singleFood.img} foodPrice={singleFood.price}
            foodDesc={singleFood.desc} />
        );
        })}
    </div> */
}
{
  /* In the above method/method 2 u can do this for infinite no of datas, u just need to multiply ur data inside the
    data.js, it will render it app.js lay mnm neger salchemr... */
}

{
  /* *********Method 3: Destructuring Method******** */
}
{
  /* The third method is used to make our code cleaner and readable */
}

//     <div class="foods-container">
//         {menu.map(({ title, img, price, desc }, i) => {
//         return (
//         <FoodItem key={i} foodName={title} foodImage={img} foodPrice={price} foodDesc={desc} />
//         );
//         })}
//     </div>
// </>
// );
// }

// export default App; -->


//USER ROUTE: http://localhost:5174/api/menu
// OWNER ROUTE: http://localhost:5174/edit/1?owner=true