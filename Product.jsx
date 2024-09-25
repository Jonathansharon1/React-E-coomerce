import { Box,Button,TextField , Stack, Autocomplete} from "@mui/material";
import { useSelector } from "react-redux";
import TableComp from "../Table";
import { useState } from "react";

import db from '../../firebase';
import {  doc, updateDoc, deleteDoc } from "firebase/firestore";


const ProductComp = ({product, id}) => {
    const categories = useSelector((state) => state.categories); 

    // extricate the names of the categories for the autocomplete
    const names = categories.map((category) => {
        return category.name
    })
    
    // Define head row for the table
    const headRows = ['name', 'qty', 'date']

    // take the information of who bought and pass to the table
    const rows = product?.boughtBy.map((r) => {
        return {name: r.name, quantity: r.quantity, date: r.date};
    })

    // If user saved, this is the state with updated information
        
   const [updateProduct, setUpdateProduct] = useState({
    title: product.title,
    category: product.category,
    description: product.description,
    price: product.price,
    linkToPic: product.linkToPic,
    boughtBy: product.boughtBy,


   })



   const updateProductDB = async () => {
    const docRef = doc(db, 'products',`${id}`)
    try{
       await updateDoc(docRef, {
           attr:[ updateProduct]
        });
        console.log(product)
        console.log('Yes!');
        }

    catch (error) {
        console.log('merd', error)
    } 
   }
  return (
    <div className="product" >
    <Box sx={{
        background: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)', /* Soft gradient background */
          borderRadius: '12px', /* Rounded corners */
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' ,/* Subtle shadow for depth */
          padding: '20px', /* Spacing inside the div */
          margin: '20px auto', /* Centers the card and adds some spacing around it */
          textAlign: 'center', /* Centers text inside the div */
        display: 'inline-flex',
        height: '80vh',
        width: '80%',
        
      }}
      >
        <Stack sx={{marginLeft: '30px'}}
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
        >
         <div className="product_attribute_left">
            <h4>Title: </h4> 
         <TextField id="outlined-basic" label={product.title} variant="outlined"
          onChange={(e) => setUpdateProduct({...updateProduct, title:e.target.value})}  />
         </div>
        <div className="product_attribute_left">

        <h4>Category: </h4>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(e, newValue) => setUpdateProduct({...updateProduct, category:newValue})}
      options={names}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={product.category}
       />}
    />
    </div>

    <div className="product_attribute_left">
        <h4>Description:</h4>
        <TextField id="outlined-multiline-static"
          onChange={(e) => setUpdateProduct({...updateProduct, description:e.target.value})}
          multiline
          rows={4}
          defaultValue={product.description}></TextField>
    </div>
    <Button 
          sx={{
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
        onClick={updateProductDB}
        >
          Save
        </Button>
        </Stack>

        <Stack sx={{marginLeft: '40px'}}
            direction="column"
            justifyContent="space-around"
            alignItems="flex-end"
        >
         <div className="product_attribute_right">
            <h4>Price: </h4> 
         <TextField id="outlined-basic" label={product.price} variant="outlined" 
         onChange={(e) => setUpdateProduct({...updateProduct, price:e.target.value})} />
         </div>
         <div className="product_attribute_right">
            <h4>Link to pic: </h4> 
         <TextField id="outlined-basic" label={product.linkToPic} variant="outlined"
         onChange={(e) => setUpdateProduct({...updateProduct, linkToPic:e.target.value})}  />
         </div>
    <div className="product_attribute_right">
        <h4>Bought By:</h4>
        <TableComp  headRow={headRows} rows={rows}/>
    </div>
        </Stack>

      </Box>

    </div>
  )
};

export default ProductComp;
