import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

const ProductStoreComp = ({product, callBack}) => {
    const [sentToCart, setSentToCart] = useState([]);
    const [quantity, setQuantity] = useState(0);


    const decreaseQty = () => {
        if(quantity != 0){
            setSentToCart({title: product.attr[0].title,
                quantity: quantity-1,
                price: product.attr[0].price
            })
            setQuantity(quantity-1);
        }
        else{
            setQuantity(0)
        }
    }

    const increaseQty = () => {
        if(quantity == 10){
            setQuantity(10)   
        }
        else{
                setSentToCart({title: product.attr[0].title,
                    quantity: quantity+1,
                    price: product.attr[0].price
                })

            
            setQuantity(quantity+1);

        }


    }


    useEffect(() => {
        callBack(sentToCart);
    }, [sentToCart]) 

  return (
    <div>
        <div className="product_card">
        <Stack 
        direction="column"
        spacing={2}
        sx={{
            justifyContent: "space-around",
            alignItems: "flex-start",
        }}>
            <div className='product_title'>
        <h2>{product.attr[0].title}</h2>
        </div>
        <div className='product_price'>
        <h4>{product.attr[0].description} </h4>
        </div>
        <div className='product_price'>
        <h4>Price: {product.attr[0].price}₪</h4>
        </div>
        <div className='product_price'>
        <h4 className="product_price">In stock : {product.stock}</h4>
        </div>

        <div style={{display: 'inline-flex'}}>
        <button className="product_button" onClick={decreaseQty}> - </button>
        <input type="text" style={{width: '50px', textAlign: 'center' ,border: 'none'}} value={+quantity} />
        <button className="product_button" onClick={increaseQty}> + </button>

        </div>
        </Stack>
    <Stack
        direction="column"
              sx={{
                marginLeft:'50px' ,
                justifyContent: "flex-start",
                alignItems: "flex-end",
        }}>
        <img src={product.attr[0].linkToPic} alt="Product Image" className='product_image' />
        <h4 className='product_price'>Bought: {product.boughtTotal}</h4>
        </Stack>
    
        </div>

    
   
    
    </div>
  )
};

export default ProductStoreComp;
