import { useLocation } from 'react-router-dom';
import CustomerNavComp from "./CustomerNav";
import { useState } from 'react';

import db from '../../firebase';
import {  doc, updateDoc } from "firebase/firestore";

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  FormControlLabel, 
  Checkbox
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const MyAccountComp = (props) => {
  const location = useLocation(); // Get the location object
  const user = location.state
  
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    password: user.password,
    othersSeeOrders: user.othersSeeOrders,
    joinedAt: user.joinedAt,
    productsBought: user.productsBought
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChecked = (e) => {
    setUserData({...userData, othersSeeOrders :e.target.checked})
  }
  const updateUserDB = async (e) => {
    e.preventDefault()
    console.log(userData)
    const docRef = doc(db, 'users',`${user.id}`)
    try{
       await updateDoc(docRef, userData);
        console.log(userData)
        alert("The details saved succesfully! You wiil see the changes after you will log in again.")
        }

    catch (error) {
        console.log('merd', error)
    } 
   }


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


   


  return (
    <div>
      <div>
      <CustomerNavComp user={userData}/>
      </div>
      <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={updateUserDB}
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {userData.firstName}'s Account
        </Typography>
        <TextField
          label="First Name"
          name="firstName"
          variant="outlined"
          defaultValue={user.firstName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          defaultValue={userData.lastName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Username"
          name="userName"
          variant="outlined"
          defaultValue={userData.userName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          defaultValue={userData.password}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel control={<Checkbox defaultChecked />}  name='othersSeeOrders' label="Allow others to see my orders" 
          onChange={handleChecked}/> 
        <Button  type="submit" variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </Box>
    </Container>
  


    </div>
  )
};

export default MyAccountComp;
