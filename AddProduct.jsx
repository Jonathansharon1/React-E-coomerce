import { Box, Button, Stack, TextField, Autocomplete } from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";

import db from '../../firebase';
import {  doc, collection, addDoc, updateDoc } from "firebase/firestore";


const AddProductComp = (props) => {
    const categories = useSelector((state) => state.categories); 

    // extricate the names of the categories for the autocomplete
    const names = categories.map((category) => {
        return category.name
    })
    const cancel = () => {
        props.cancelCallBack(false);
    }

    const [newProduct, setNewProduct] = useState({
        title: "",
        category: "",
        description: "",
        price: "",
        linkToPic: "",
        boughtBy: [],
    
    
       })
       const addProductDB = async() => {
        try {
            const collectionRef = collection(db, "products");
            const docRef = await addDoc(collectionRef, {
                attr: [newProduct]
            });
            // Add to the product an atrribute of boughtTotal
            const boughtTotal = await updateDoc(docRef, {boughtTotal: 0})
            // If user press cancel button, it hide the comp of add product
            props.cancelCallBack(false);

         } catch (e) {
            console.error("Error adding document: ", e);
          }
        };
    
    

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
         <TextField id="outlined-basic"  variant="outlined"
          onChange={(e) => setNewProduct({...newProduct, title:e.target.value})}  />
         </div>
        <div className="product_attribute_left">

        <h4>Category: </h4>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      onChange={(e, newValue) => setNewProduct({...newProduct, category:newValue})}
      options={names}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} 
       />}
    />
    </div>

    <div className="product_attribute_left">
        <h4>Description:</h4>
        <TextField id="outlined-multiline-static"
          onChange={(e) => setNewProduct({...newProduct, description:e.target.value})}
          multiline
          rows={4}
          ></TextField>
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
        onClick={addProductDB}
        >
          Add
        </Button>
   
        </Stack>

        <Stack sx={{marginLeft: '60px'}}
            direction="column"
            justifyContent="space-around"
            alignItems="flex-end"
        >
         <div className="product_attribute_right_add">
            <h4>Price: </h4> 
         <TextField id="outlined-basic"  variant="outlined" 
         onChange={(e) => setNewProduct({...newProduct, price:e.target.value})} />
         </div>
         <div className="product_attribute_right_add">
            <h4>Link to pic: </h4> 
         <TextField id="outlined-basic"  variant="outlined"
         onChange={(e) => setNewProduct({...newProduct, linkToPic:e.target.value})}  />
         </div>

        <div className="product_attribute_right_add">
         <Button color="error" variant="outlined" onClick={cancel}>
            Cancel
        </Button>
        </div>

        </Stack>

      </Box>

    </div>
  )
};

export default AddProductComp;
