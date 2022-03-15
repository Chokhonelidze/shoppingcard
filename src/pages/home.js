import { Items } from "../parts/items";
import Cart from "../parts/cart";
function Home() {
  return (
    <div className="app">
      <div className="left">
        <Items />
      </div>
      <div className="right">
        <Cart />
      </div>
    </div>
  );
}
export default Home;
