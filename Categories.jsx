import AdminNavComp from "./AdminNav";

import { useState } from "react";

import { useSelector } from 'react-redux';


import db from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import { Box,Button,Grid,TextField } from "@mui/material";
import CategoryComp from "./category";


const CategoriesComp = () => {
  const categories = useSelector((state) => state.categories); // Take the categories from the store 
  const [addCategoryInput, setInput] = useState('')


  const addCategory = () => {
    const newCategory = {name: addCategoryInput}
    addDoc(collection(db, 'categories'), newCategory);
  }

  return (
    <div>
      <AdminNavComp/>
    
    <div style={{marginTop: '50px', display: 'flex', alignItems:'center', justifyContent: 'center'}}>

      <Box sx={{
        
        backgroundColor: '#ADD8E6',
        boxShadow: 3,
        borderRadius: '10px',
        height: '100vh',
        width: '60%'
        
      }}
      >
        <h1 style={{textAlign: 'left', marginLeft: '10px'}}>Categories</h1>
      {
        categories.map((category) => {
          return <CategoryComp key={category.id} category={category}/>
        })
      }
      <br/>
      <Grid container spacing={0}>
        <Grid item xs={9}>
        <TextField sx={{width: '80%'}} label="Add new category" variant="outlined"
        onChange={(e) => setInput(e.target.value)} />
        </Grid>
        <Grid item xs={3}>
          <Button sx={{ width: '80%', borderRadius: '20px'}} 
          variant="contained" size="large" color="success"
          onClick={addCategory}>Add</Button>
        </Grid>
      </Grid>

       </Box> 
    </div>
    </div>
  )
};

export default CategoriesComp;
