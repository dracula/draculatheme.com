import ProductItem from "../productItem";

const Grid = ({ products }) => (
  <div className="grid">
    {products.map((product, index) => (
      <ProductItem key={index} product={product} />
    ))}
  </div>
);

export default Grid;
