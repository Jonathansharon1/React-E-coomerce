
const CartProductComp = ({cartProduct, callBack}) => {
    const removeFromCart = () => {
        callBack(cartProduct.title);
    }
  return (
    <div>
   <div className="cart_product_card">
      <div className="product-info">
        <span>{cartProduct.title}</span>
        <div className="quantity-control">
          {
            (cartProduct.quantity === 0 && removeFromCart())
            
          }
          <input type="text" value={cartProduct.quantity} />
          <span>units</span>
        </div>
      
      <div className="product-total">total: 
        { 
          (cartProduct.quantity === 1) ? (
            cartProduct.price
          ): (
            cartProduct.total
          )
      }
      </div>
      </div>
      <button onClick={removeFromCart} className="remove-button">X</button>
    </div>
    </div>
  )
};

export default CartProductComp;
