import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  { id: "p1", title: "My first boo", price: 6, description: "My first book" },
  {
    id: "p2",
    title: "My second boo",
    price: 12,
    description: "My second book",
  },
  { id: "p3", title: "My third boo", price: 10, description: "My third book" },
  { id: "p4", title: "My fourth boo", price: 23, description: "My fourth book" },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
