import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import  'C:/Users/user/Downloads/React Final Project/vite-project/src/App.css'

import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminNavComp = () => {


  return (
    <>
    <div className='navbar'>
      <h4 >Hello, Admin</h4>

    <Box sx={{ marginLeft: '50px', width: '70%', textAlign: 'center', display: 'flex', alignItems: 'center' 
        , justifyContent: 'space-around'}}>
       <Link to={"/categories"}>Categories </Link>
        <Link to={"/products"}>Products</Link>
        <Link to={"/customers"}>Customers</Link>
        <Link to={"/statistics"}>Statistics</Link>
        <Link to={"/"}>LogOut</Link>

    
    </Box>
    </div>
   </>
  )
};

export default AdminNavComp;
