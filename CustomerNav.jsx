
import Box from '@mui/material/Box';

import  'C:/Users/user/Downloads/React Final Project/vite-project/src/App.css'

import { Link } from 'react-router-dom';

const CustomerNavComp = ({user}) => {


  return (
    <>
    <div className='navbar'>
      <h4 >Hello, {user.firstName}</h4>

    <Box sx={{ marginLeft: '50px', width: '70%', textAlign: 'center', display: 'flex', alignItems: 'center' 
        , justifyContent: 'space-around'}}>
       <Link to={"/store"} state={user}>Store </Link>
        <Link to={"/MyOrders"} state={user}>My Orders</Link>
        <Link to={"/MyAccount"} state={user}>My Account</Link>
        <Link to={"/"}>LogOut</Link>
    
    </Box>
    </div>
   </>
  )
};

export default CustomerNavComp;
