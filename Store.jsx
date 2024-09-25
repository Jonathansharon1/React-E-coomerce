import CustomerNavComp from "./CustomerNav";
import { Autocomplete, Box, TextField, Slider, Stack, Button} from "@mui/material";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ProductStoreComp from "./ProductStore";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartComp from "./Cart";



const StoreComp = (props) => {
    const location = useLocation(); // Get the location object
    const user = location.state
    const dispatch = useDispatch();


    const [openCart, setOpenCart] = useState(false)
    const products = useSelector((state) => state.products); // Take the products from the store 

    // State that includes the products that the user filtered
    const [dispalyProducts, setDisplayProducts] = useState('');

    const [userInputCatgoryFilter, setUserInputCatgoryFilter] = useState('All');
    const [userInputTitleFilter, setUserInputTitleFilter] = useState('');

    // State that contains what will be in the cart.

    const [cart, setCart] = useState([])


    useEffect(() => {
        const filterCatgories = () => {
            if(userInputCatgoryFilter == '' || 
                userInputCatgoryFilter== 'All' || userInputCatgoryFilter == null){
                setDisplayProducts('')
            }
            else{
            setUserInputFilterPrice(30)
            setUserInputTitleFilter('')
            setDisplayProducts
            (products.filter((product) => product.attr[0].category == userInputCatgoryFilter))
            }
        }
        filterCatgories()
    },[userInputCatgoryFilter] )

    
    // State the save the price of the filter bar
    const [userInputFilterPrice, setUserInputFilterPrice] = useState(30);

    // Filter Price

    useEffect(() => {
        const filterPrice = () => {
            if (userInputFilterPrice > 30) {
                setUserInputCatgoryFilter('')
                setUserInputTitleFilter('')
                console.log(dispalyProducts)
                setDisplayProducts
                (products.filter((product) => product.attr[0].price < userInputFilterPrice))
                console.log(dispalyProducts)

        } 
    }
        filterPrice()
    }, [userInputFilterPrice])

    // Filter Title

    useEffect(() => {
        const filterTitle = () => {
            if (userInputTitleFilter != '') {
                setUserInputCatgoryFilter('')
                setUserInputFilterPrice(30)
                setDisplayProducts
                (products.filter((product) => product.attr[0].title.toLowerCase().includes(userInputTitleFilter.toLowerCase())))
        }
        else{
            setDisplayProducts('')
        } 
    }
        filterTitle()
    }, [userInputTitleFilter])

    // Clear Filters

    const clearFilter = () => {
        setDisplayProducts('')
        setUserInputCatgoryFilter('');
        setUserInputTitleFilter('');
        setUserInputFilterPrice(30);
    }


    // For display in selector in the filter bar
    const categories = useSelector((state) => state.categories); 

    // extricate the names of the categories for the autocomplete
    const names = categories.map((category) => {
        return category.name
    })

    const closeCart = (v) => {
        setOpenCart(v)
    }

    const getProductToCart  = (productAttr) => {
        // Checks if the product is in the cart array,
        // if it is so add qty, else add the product to the cart.
        if (cart == ''){
            return setCart([productAttr])
        }
        // add qty if product is found in the cart
        const findProduct = cart.find(cartProduct => cartProduct.title == productAttr.title)
        if (findProduct) {
               return setCart([...cart.filter((cartProduct) => cartProduct.title != productAttr.title)
                ,{...productAttr, quantity: productAttr.quantity,
                 total: (productAttr.price * productAttr.quantity)}])
            }
            else{
                // add another product
                return setCart([...cart,productAttr])
            }        
        
    }
    

    useEffect(() => {
        dispatch({type: 'ADD_TO_CART', payload: cart})
          console.log(cart)
      }, [cart])


  return (
    <div>
        
   
        <div>
      <CustomerNavComp user={user} />

      </div>


    {/* Filter nav bar */}
        <div className="filter_nav">
      <Box sx={{ marginLeft: '50px', 
 
         }}>
            <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "flex-start",
              }}>
            
            
            <h4 style={{margin: '15px 0'}}> <u>filter by:</u> </h4>
    
            <div className="filter_element">
            <h5 className="filter_label">Catgory: </h5>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(e, newValue) => setUserInputCatgoryFilter(newValue)}
                options={names}
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} label={'All'} />}
    />
    </div>
            <div className="filter_element">
            <h5 className="filter_label">Price: </h5>
            <Slider
            min={30}
            max={500}
             sx={{width: 150, marginTop: '15px'}} aria-label="Price"
             defaultValue={userInputFilterPrice} onChange={(e) => setUserInputFilterPrice(e.target.value)} />
             <h5 style={{marginLeft: '10px'}}>{userInputFilterPrice}₪</h5>
            </div>

            <div className="filter_element">
                <h5 className="filter_label">Title: </h5>
                <TextField onChange={(e) => setUserInputTitleFilter(e.target.value) } sx={{width: '100px'}} variant="outlined"/>
            </div>
            <div style={{marginTop: '10px'}}>
            <Button sx={{
                   backgroundColor: '#00796b', /* Matches the teal color */
                   color: 'white',
                   padding: '10px 15px',
                   borderRadius: '5px',
                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', /* Adds depth */
                   textTransform: 'none', /* Keeps text capitalization normal */
                   '&:hover': {
                       backgroundColor: '#004d40', /* Darker teal on hover */
                   },
               
            }}
            onClick={clearFilter}
            >Clear</Button>
            </div>

            </Stack>

    </Box>
    </div>



      
      <div>
        {
            dispalyProducts === '' ? (
            products.map((product) => {
                return <ProductStoreComp   callBack={getProductToCart} key={product.id} product={product}/>
            }))
            : (
                dispalyProducts == '' ? (
                   <Box sx={{
                    display: 'block',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #ffffff 0%, #e0f7fa 100%)',
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    maxWidth: '500px',
                    margin: '20px auto',
                    textAlign: 'center',
                    marginTop: '80px',
                    height: '150px',
                   }}>
                    <h2> No Items are match to this terms</h2>
                    <Button
                    sx={{
                        backgroundColor: '#00796b', /* Matches the teal color */
                        color: 'white',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', /* Adds depth */
                        textTransform: 'none', /* Keeps text capitalization normal */
                        '&:hover': {
                            backgroundColor: '#004d40', /* Darker teal on hover */
                        },
                    
                 }}
                 onClick={clearFilter}
                    >Clear Filter</Button>
                    
                   </Box>

            ) : (
            dispalyProducts.map((product) => {
                return <ProductStoreComp callBack={getProductToCart} key={product.id} product={product}/>
            })
                )
            )
        }
        {
            openCart ? (<CartComp  products={products} user={user} callBack={closeCart}/>):
            (
                <div onClick={() => {setOpenCart(true)}} className="open_cart">
                    <ShoppingCartIcon/>
                </div>
            )

        }
      </div>
    </div>
  )
};

export default StoreComp;
