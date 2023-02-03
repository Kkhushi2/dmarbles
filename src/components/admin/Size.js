import { useState } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ServerURL, postData} from "./FetchNodeServices"
import Swal from "sweetalert2";

import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundPosition: 'center',
   
       
        width: '100vw',
        height: '100vh'
    },
    subdiv: {
        display: 'flex',
        background: '#dcdde1',
        padding: 30,
        width: 600,
        marginTop: 130,
        flexDirection: "column",
        alignItems: "center",
    },

    gap: {
        marginTop: 10
    },

    inputstyle: { display: 'none' }
}));
const Input = styled('input')({
    display: 'none',
});



export default function Size(props){ 
    const classes = useStyles()
    const [sizeid, setSizeid] = useState('')

    const [length, setLength] = useState('')

    const [breadth,setBreadth] = useState('')
    
    const [height,setHeight] = useState('')
   

    const handleSubmit = async () => {


        // var formData = new FormData()
        
        // formData.append('length', length)
        // formData.append('breadth', breadth)
        // formData.append('height', height)


      var body = {length:length,breadth:breadth,height:height }
        var result = await  postData("size/addsize", body)
        if (result) {
            Swal.fire({
                title: 'Form Submitted Successfully ',
                text: 'Modal with a custom image.',
                imageUrl: '/marble.jpg',
                imageWidth: 400,
                imageHeight: 300,
                icon: "success"
            })
        }
        else
            (Swal.fire({
                title: 'Deepak Marbles',
                text: 'Failed To Submitt',
                imageUrl: '/marble.jpg',
                imageWidth: 400,
                imageHeight: 300,
                icon: "error"

            }))
    }



    return (

        <div className={classes.root} >
            <div className={classes.subdiv} >
                <div className={classes.gap} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: 25, fontWeight: 'bold', letterSpacing: 1 }}>
                                <img src="/marble.jpg" style={{ width: 40, hieght: 50 }} />
                                Size
                            </div>

                        </Grid>

                       
                  
                        <Grid item xs={4}>

<div style={{ marginTop: 20 }}>

    <TextField onChange={(event) => setLength(event.target.value)} fullWidth label="Length" variant="outlined" />
</div>
</Grid>
<Grid item xs={4}>


<div style={{ marginTop: 20 }}>

    <TextField onChange={(event) => setBreadth(event.target.value)} fullWidth label="Breadth" variant="outlined" />
</div>
</Grid>
<Grid item xs={4}>


<div style={{ marginTop: 20 }}>

    <TextField onChange={(event) => setHeight(event.target.value)} fullWidth label="Height" variant="outlined" />
</div>
</Grid>













                     

                        <Grid item xs={6}  >
                            <Button fullWidth onClick={() => handleSubmit()} variant="contained" color="primary">Save</Button>
                        </Grid>
                        <Grid item xs={6}  >
                            <Button fullWidth variant="contained" color="primary">Reset</Button>
                        </Grid>
                    </Grid>
                   

                  




                </div>
            </div>
        </div>
    );
}



