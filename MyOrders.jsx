import CustomerNavComp from "./CustomerNav";
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import TableComp from "../Table";
import { Button } from "@mui/material";


const MyOrdersComp = (props) => {
    const location = useLocation(); // Get the location object
    const user = location.state

    const [noOrders, setNoOrders] = useState(false)
    useEffect(() => {
        if (user.productsBought > 0 ){
            setNoOrders(true);
        }
    }, [noOrders])


    const products = useSelector((state) => state.products); // Take the products from the store 
    // Make a list that includes all the product's titles and prices
    const productPrice = products.map((product) => {
        return {title: product.attr[0].title, price: product.attr[0].price}
    })

    //headRows to send to TableComp
    const headRows = ['Title', 'Qty', 'Total', 'Date']

    const [total, setTotal] = useState('')

    // Body of the table is going to be products.bought of the user and add Total(function)
    useEffect(() => {
        const totalPrice = () => {
            // iterate over user products bought and over productPrice and return the total price of each productBought
             const totalList = user.productsBought.flatMap((productBought) => {
                const price = productPrice.map((element) => {
                    if (productBought.name == element.title){
                        return ( productBought.quantity * element.price)
                    }
    
                });
                return(price.filter(element => element!= undefined)[0])
            })
            return(totalList)
        }
        setTotal(totalPrice())
    },[products])
 

    const rows = () => {
        const rowsList = []
         
         for(let i=0; i < user.productsBought.length ; i++) {
            const row = {
                        title: user.productsBought[i].name,
                        quantity: user.productsBought[i].quantity,
                        total: total[i],
                        date: user.productsBought[i].date,
                        }
        rowsList.push(row)
        }
     return rowsList   
    }

  return (
    <div>
        <div>
      <CustomerNavComp user={user}/>
      </div>
    {
        noOrders ? (
            <div style={{
                background: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)', /* Soft gradient background */
                borderRadius: '12px', /* Rounded corners */
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' ,/* Subtle shadow for depth */
                padding: '20px', /* Spacing inside the div */
                margin: '20px auto', /* Centers the card and adds some spacing around it */
                textAlign: 'center', /* Centers text inside the div */

              height: '30vh',
              width: '70%',
            }}>
                <h2>{user.firstName}, You have No orders Yet.</h2>
                    <Button
                     sx={{
                        width: '200px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)', // Gradient background for button
                        color: '#ffffff',
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        textTransform: 'none', 
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effects
                        '&:hover': {
                                    transform: 'scale(1.05)', // Slightly enlarges button on hover
                                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                                    }
                        }}
  
                    variant="outlined">
                        <Link to={'/store'} style={{ textDecoration: 'none', color: 'inherit' }}
                         state={user}>
                            Let's go shopping</Link> 
                            </Button>
                </div>
        ) : (
    
      <div>
        <TableComp headRow={headRows} rows={rows()}/>
      </div>
    )}
    </div>
  )
};

export default MyOrdersComp;
