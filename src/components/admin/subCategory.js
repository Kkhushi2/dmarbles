import { useState, useEffect } from "react"
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { getData, postDataAndImage } from "./FetchNodeServices"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Swal from "sweetalert2";
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

export default function SubCategory(props) {
    const classes = useStyles()
    const [categoryid, setcategoryid] = useState('')
    const [marblep, setMarblep] = useState({ bytes: '', file: '/marble.jpg' })
    const [categoryname, setCategoryname] = useState('')
    const [subcategoryname, setsubcategoryname] = useState([])
    const [description, setdescription] = useState('')
    const [listCategory, setListcategory] = useState([])

    const fetchAllCategory = async () => {
        var result = await getData("marble/displayall")
        setListcategory(result.result)

    }

    const handleCategoryChange = (event) => {
        setCategoryname(event.target.value);
    };

    const fillCategory = () => {
        return (listCategory.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)


        })

        )
    }
    useEffect(function () {
        fetchAllCategory()
    }, [])

    const handleSubmit = async () => {


        var formData = new FormData()
        formData.append('categoryid', categoryname)
        formData.append('subcategoryname', subcategoryname)
        formData.append('picture', marblep.bytes)
        formData.append('description', description)


        // var body = { categoryid: categoryid, picture: marblep, subcategoryname: subcategoryname, description, description }
        var config = { headers: { "content-Type": "multipart/formData" } }
        var result = await postDataAndImage("subcategory/addmarblee", formData, config)
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
    const handlePictureChange = (event) => {
        setMarblep({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })

    }

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <div className={classes.gap}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: 25, fontWeight: 'bold', letterSpacing: 1 }}>
                                <img src="/marble.jpg" style={{ width: 40, hieght: 50 }} />
                                Choose Marble Category
                            </div>

                        </Grid>
                        <Grid item xs={6}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryname}
                                    label="Category Name"
                                    onChange={handleCategoryChange}
                                >
                                    {fillCategory()}
                                </Select>
                            </FormControl>




                        </Grid>
                        <Grid item xs={6}>
                            <TextField onChange={(event) => setsubcategoryname(event.target.value)} fullWidth label="Sub Category Name" variant="outlined" />
                        </Grid>


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


