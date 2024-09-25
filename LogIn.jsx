import {Button, Box, Grid, TextField, } from '@mui/material'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';




//import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import  '../App.css'
import { Link} from 'react-router-dom';
import { useState } from 'react';



function LoginComp() {
  const users = useSelector((state) => state.users); // Take the users from the store 
  const navigate = useNavigate()

  const [usernameInput, setUsernameInput] = useState() // State for user name input
  const [passwordInput, setPasswordInput] =useState() // State for password input

  const [isAdmin, setIsAdmin] = useState(false) //State to define if the user is the admin

  const checkUserInput = () => {
    var loggedIn = false
  users.forEach(user => {
    if (user.userName == usernameInput && user.password == passwordInput){
      loggedIn = true
      alert("Sucess! You logged In.")
      if (user.id == 'admin') {
        setIsAdmin(true); // need to go to the catgories page and do nav bar
        console.log('admin! welcome!')
        navigate('/categories')
      }
      else{
        console.log('its a customer')
        navigate('/store', {state: user})
      }
      

    }
  });
    if (!loggedIn){
      alert("Username or password are wrong")
    }
  
}


  return (
    <>
    <div className='login_box'>
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        boxShadow: 10,
        width: '100vh', 
        backgroundColor: '#ADD8E6',
        textAlign: 'center',
        borderRadius: '2',
        padding: '20px',
      }} >
    
    <Grid container rowSpacing={3}  >
    <Grid item xs={12}>
      <h1 style={{marginBottom: '60px'}}>New Generation</h1>
    </Grid> 
    <Grid item xs={3}>
     <h3 style={{textAlign:'right'}}>UserName: </h3>
    </Grid>
    <Grid item xs={9}>
    <TextField sx={{width: '90%', textAlign: 'left'}}
     id="outlined-basic1" label="Enter your User Name" variant="outlined" 
     onChange={(e) => setUsernameInput(e.target.value)} />
    </Grid>

      <Grid item xs={3}>
     <h3 style={{textAlign:'right'}}>Password: </h3>
    </Grid>
    <Grid item xs={9}>
    <TextField sx={{width: '90%', textAlign: 'left'}}
     id="outlined-basic2" label="Enter your Password" variant="outlined" 
     onChange={(e) => setPasswordInput(e.target.value)}/>
    </Grid>

    <Grid item xs={12}>
    <Button sx={{width:'90%', marginTop: '20px'}} variant="contained"
    onClick={checkUserInput}>Login</Button>
    </Grid>

    <Grid item xs={12}>
      <h5>New user? <Link to={'/register'}>Register</Link></h5>
    </Grid>
    </Grid> 

    
   </Box>

   </div>






    </>
  )
}

export default LoginComp
