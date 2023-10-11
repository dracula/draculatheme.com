import { MinusIcon, PlusIcon } from "lucide-react";

const QuantityInput = ({ quantity, setQuantity }) => {
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 100) setQuantity(quantity + 1);
  };

  return (
    <div className="quantity-input">
      <label htmlFor="quantity">Quantity:</label>
      <div className="wrapper">
        <button
          onClick={() => {
            handleDecrease();
          }}
        >
          <span className="icon">
            <MinusIcon />
          </span>
        </button>
        <div className="display">
          <span>{quantity}</span>
        </div>
        <button
          onClick={() => {
            handleIncrease();
          }}
        >
          <span className="icon">
            <PlusIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
