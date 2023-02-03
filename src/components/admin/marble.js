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
import { ServerURL, postDataAndImage } from "./FetchNodeServices"
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



export default function Marble(props){ 
    const classes = useStyles()
    const [categoryid, setcategoryid] = useState('')
    const [marblep, setMarblep] = useState({ bytes: '', file: '/marble.jpg' })
    const [categoryname, setCategoryname] = useState([])

    const [description, setdescription] = useState('')
    const handlePictureChange = (event) => {
        setMarblep({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })

    }
    const handleNameChange = (event) => {
        setCategoryname(event.target.value)
    }

    const handleSubmit = async () => {


        var formData = new FormData()
        formData.append('categoryname', categoryname)
        formData.append('picture', marblep.bytes)
        formData.append('description', description)


        var body = { categoryname: categoryname, picture: marblep }
        var config = { headers: { "content-Type": "multipart/formData" } }
        var result = await postDataAndImage("marble/addmarble", formData, config)
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
                                Deepak Marbles
                            </div>

                        </Grid>

                        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', padding: 5 }}>
                            <Box sx={{ minWidth: 550 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoryname}
                                        label="name"
                                        onChange={handleNameChange}
                                    >
                                        <MenuItem value="Carrara">Carrara</MenuItem>
                                        <MenuItem value="Statuary">Statuary</MenuItem>
                                        <MenuItem value="Calacatta">Calacatta</MenuItem>
                                        <MenuItem value="Emperador">Emperador</MenuItem>
                                        <MenuItem value="Crema Marfil">Crema Marfil</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <Grid item xs={12}>


                            <div style={{ marginTop: 20 }}>

                                <TextField onChange={(event) => setdescription(event.target.value)} fullWidth label="Marble descriptioncription" variant="outlined" />
                            </div>
                        </Grid>




                        <Grid item xs={6}>
                            <label htmlFor="contained-button-file">
                                <Input onChange={(event => handlePictureChange(event))} id="contained-button-file" multiple type="file" />
                                {/* <input style={{display:'none'}} onChange={(event=>handlePictureChange(event))} id="contained-button-file" multiple type="file" /> */}
                                <Button fullWidth variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                            <Avatar
                                alt="Upload Image"
                                src={marblep.file}
                                variant="square"
                                sx={{ width: 56, height: 56 }}
                            />
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



