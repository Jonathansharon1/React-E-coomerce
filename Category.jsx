import { Grid,Box, Button, TextField } from "@mui/material";

import db from '../../firebase';
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

const CategoryComp = (props) => {
    const [isEditing, setIsEditing] = useState(false) // if its true so TextBox Will appear instead the h3
    const [userEditInput, setUserEditInput] = useState('')

    const editCategory = async() => {
        setIsEditing(!isEditing);
        if (isEditing == true) {
            const docRef = doc(db, 'categories',`${props.category.id}`)
            try{
                await updateDoc(docRef, {name: userEditInput});
                console.log('Yes!');
            }

            catch (error) {
                console.log('merd', error)
            }           
         }
    }

    const deleteCategory = () => {
        deleteDoc(doc(db, 'categories', props.category.id));
    }
    

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Box sx={{
        width:'80%',
        backgroundColor: '#E0F4FA',
        borderRadius: '30px',
        padding: '20px',
        marginBottom: '20px'
    }}>
      <Grid container>
        {
            isEditing ? (
                <Grid item sm={8}>
                    <TextField sx={{width: '80%'}} label={props.category.name} variant="outlined"
                    onChange={(e) => setUserEditInput(e.target.value)} />
                    </Grid>
            ) : (        <Grid item sm={8}>
                <h3>{props.category.name}</h3>
            </Grid>)
        }

        <Grid item sm={2}>
            <Button variant="outlined" style={{marginTop: '10px'}} onClick={editCategory}>Update</Button>
        </Grid>
        <Grid item sm={2}>
            <Button variant="outlined" style={{marginTop: '10px'}}onClick={deleteCategory}>Delete</Button>
        </Grid>
      </Grid>
      </Box>
    </div>
  )
};

export default CategoryComp;
