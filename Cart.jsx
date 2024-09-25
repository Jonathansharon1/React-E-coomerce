import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useSelector } from 'react-redux';
import CartProductComp from './CartProduct';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import db from '../../firebase';
import {  addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";

const CartComp = ({user,products ,callBack}) => {
    const cartFromStore = useSelector((state) => state.cart);
    const [cart, setCart] = useState(cartFromStore)
    let [totalCart, setTotalCart] = useState(0)

    const removeFromCart = (cartProductTitle) => {
        return setCart(cart.filter(product => product.title != cartProductTitle))
    }

    useEffect(() => {
        if(cart != ''){
         const total =  prevTotal => cart.reduce((acc, product) => {
            if (product.quantity === 1){
                return [Number(acc) + Number(product.price)];
         }
         else{
         return (acc + product.total);
         }
        }, prevTotal)
        setTotalCart(total);
    }
     else{
         setTotalCart(0);
     }
    
    }, [cart])


    const order =  () => {
        if (cart != ''){
        const today = new Date()
        const docRefUser = doc(db, "users", user.id)

        
        // Update user's productsBought
        cart.flatMap(async(cartProduct) => {
            // Check if user have productsBought
            if (user.productsBought.length > 0){
            await updateDoc(docRefUser,{
                productsBought: arrayUnion({
            name: cartProduct.title, quantity: cartProduct.quantity,
             date: today.toLocaleDateString() })})
            }
            // Without arrayUnion
            else{
                await updateDoc(docRefUser,{
                    productsBought: {
                name: cartProduct.title, quantity: cartProduct.quantity,
                 date: today.toLocaleDateString() }}) 
            }
            

             //update product's boughtTotal and stock

             const productFound = products.find((product) => product.attr[0].title == cartProduct.title);
             const docRefProduct = doc(db, "products", productFound.id)
             
             if (user.othersSeeOrders){
                // Add to boughtTotal and sub from stock of the product
                await updateDoc(docRefProduct, {
                    boughtTotal: productFound.boughtTotal + cartProduct.quantity,
                    stock : productFound.stock - cartProduct.quantity,
                 })
                 // add who bought the product to db
                const whoBought = [...productFound.attr, productFound.attr[0].boughtBy.push(
                    {name: user.firstName, 
                    quantity: cartProduct.quantity,
                    date: today.toLocaleDateString(),})]
                    console.log(productFound.attr[0].boughtBy)
                 await updateDoc(docRefProduct, {
                   attr : whoBought
                    })


                }
            else{
                await updateDoc(docRefProduct, {
                    stock : productFound.stock - cartProduct.quantity,
                 })
            } 
        
             });
            
   
        

        
        alert('Your Order is accepted!')


    }
    else{
        alert('You have nothing in the cart')
    }
        
        

    }
    
  return (
    <div className="cart">
        {/*Close cart */}
        <div className="close_cart" onClick={() => {callBack(false)}}>
            <ArrowBackOutlinedIcon/>
        </div>
       
        <h2> Cart</h2>
        <div className='cart_product_list'>
        {
            cart.map((cartProduct,index) => {
                if (cartProduct != ''){
                return <CartProductComp callBack={removeFromCart} cartProduct={cartProduct} key={index}/>
            }
           })
        }
        </div>


        <div>
            <h2>Total : {totalCart}</h2>
            <Button 
          sx={{
            marginTop: '20px', 
          background: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)', // Gradient background for button
          color: '#ffffff',
          padding: '10px 20px', 
          borderRadius: '8px', 
          textTransform: 'none', 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effects
          '&:hover': {
            transform: 'scale(1.05)', // Slightly enlarges button on hover
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)', // Increases shadow on hover>Add product</Button>
          }
        }}
        onClick={order}>
            
            Order</Button>
        </div>
        


    </div>
  )
};

export default CartComp;
