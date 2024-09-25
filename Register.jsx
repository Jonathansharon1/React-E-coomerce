import {Button, Box, Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import db from '../firebase';
import { addDoc, collection} from 'firebase/firestore';



import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css'

function RegisterComp() {
  const today = new Date();
  const navigate = useNavigate()


  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [share,setShare] = useState(false)





  const addNewUserToDB = () => {
    const newUser = 
      {firstName: firstName,
      lastName: lastName,
      joinedAt: today.toLocaleDateString(),
      userName: userName,
      password: password,
      othersSeeOrders: share,
      productsBought: ['']
  
    }// new user input
    console.log(newUser)
    addDoc(collection(db, 'users'), newUser);
    navigate('/')
    alert('Please Login now')
    
    
  }


  return (
    <>
        <div className='register_box'>
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '110vh',
        boxShadow: 10,
        backgroundColor: '#FFD700',
        width: '100vh', 
        textAlign: 'center',
        borderRadius: '2',
        padding: '20px',
        color: 'white'
      }} >
    
    <Grid container rowSpacing={3}  >
    <Grid item xs={12}>
      <h1 style={{}}>Register</h1>
    </Grid> 
    <Grid item xs={3}>
     <h3 style={{textAlign:'right'}}>First Name: </h3>
    </Grid>
    <Grid item xs={9}>
    <TextField sx={{width: '90%', textAlign: 'left'}} 
    id="outlined-basic1" label="Enter your first Name" variant="outlined" 
    onChange={(e) => setFirstName(e.target.value)}/>
    </Grid>

    <Grid item xs={3}>
     <h3 style={{textAlign:'right'}}>Last Name: </h3>
    </Grid>
    <Grid item xs={9}>
    <TextField sx={{width: '90%', textAlign: 'left'}} 
    id="outlined-basic1" label="Enter your last Name" variant="outlined" 
    onChange={(e) => setLastName(e.target.value)}/>
    </Grid>

    <Grid item xs={3}>
     <h3 style={{textAlign:'right'}}>User Name: </h3>
    </Grid>
    <Grid item xs={9}>
    <TextField sx={{width: '90%', textAlign: 'left'}} 
    id="outlined-basic1" label="Enter User Name" variant="outlined" 
    onChange={(e) => setUserName(e.target.value)}/>
    </Grid>

      <Grid item xs={3}>
     <h3 style={{textAlign:'right'}}>Password: </h3>
    </Grid>
    <Grid item xs={9}>
    <TextField 
    sx={{width: '90%', textAlign: 'left'}}
     id="outlined-basic2" label="Enter Password" 
     variant="outlined"
     onChange={(e) => setPassword(e.target.value)}/>
    </Grid>

    
    <Grid item xs={12}>
    <FormControlLabel control={<Checkbox />}  label="Allow others to see my orders" 
    onChange={(e) => setShare(e.target.checked)}/>
    </Grid>

    <Grid item xs={12}>
    <Button sx={{width:'90%', marginTop: '20px', backgroundColor: 'white', color:'#FFD700'}}
     variant="contained"
     onClick={addNewUserToDB}> <strong>Submit</strong></Button>
    </Grid>

    </Grid> 

    
   </Box>

   </div>
    </>
  )
}

export default RegisterComp
