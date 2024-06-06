import Image from "next/image";
import Link from "next/link";

const renderAvailability = (product) => {
  if (!product.published) {
    return <span className="item-ribbon sold-out">sold out</span>;
  }
};

const ProductItem = ({ product }) => (
  <Link href={`/shop/${product.custom_permalink}`} className="product">
    <div className="image">
      <Image
        src={`/images/shop/${product.custom_permalink}-1.png`}
        alt={product.name}
        width={576}
        height={528}
        quality={100}
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
