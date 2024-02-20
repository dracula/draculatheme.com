import Link from "next/link";

const renderAvailability = (product) => {
  if (!product.published) {
    return <span className="item-ribbon sold-out">sold out</span>;
  }
};

const ProductItem = ({ product }) => (
  <Link href={`/shop/${product.custom_permalink}`} className="product">
    <div className="image">
      <img
        src={`/images/shop/${product.custom_permalink}-1.png`}
        alt={product.name}
      />
    </div>
    <div className="content">
      {renderAvailability(product)}
      <h2 className="name">{product.name}</h2>
      <span className="price">{product.formatted_price}</span>
    </div>
  </Link>
);

export default ProductItem;
