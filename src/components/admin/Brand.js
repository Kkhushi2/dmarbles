import { useState, useEffect } from "react"
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { getData, postDataAndImage, postData } from "./FetchNodeServices";
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

export default function Brand(props) {
    const classes = useStyles()
    const [categoryid, setcategoryid] = useState('')
    const [brandid, setBrandid] = useState('')
    const [marblep, setMarblep] = useState({ bytes: '', file: '/marble.jpg' })
    const [categoryname, setCategoryname] = useState('')
    const [brandname, setBrandname] = useState('')
    const [subcategoryname, setsubCategoryname] = useState([])
    const [listsubcategory, setListsubCategory] = useState([])

    const [listCategory, setListcategory] = useState([])
    const [listSubCategory, setListSubcategory] = useState([])
    const [subcategoryid, setsubcategoryid] = useState('')
    const [contactperson, setsContactPerson] = useState('')
    const [contact, setContact] = useState('')
    const [emailid, setEmailid] = useState('')

    const fetchAllCategory = async () => {
        var result = await getData("marble/displayall")
        setListcategory(result.result)

    }
    const fetchAllsubCategory = async (categoryid) => {
        var result = await postData("subcategory/subcategory", { categoryid: categoryid })
        setListsubCategory(result.result)
    }


    const handleCategoryChange = (event) => {
        setcategoryid(event.target.value);
        fetchAllsubCategory(event.target.value);
    };
    const handleSubCategoryChange = (event) => {
        setsubcategoryid(event.target.value);
    };

    const fillCategory = () => {
        return (listCategory.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        })
        )
    }
    const fillSubCategory = () => {
        return (listsubcategory.map((item) => {
            return (<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>)


        })

        )
    }
    useEffect(function () {
        fetchAllCategory()
    }, [])
    const handleSubmit=async () => {

        var formData = new FormData()
        formData.append('categoryid', categoryid)
        formData.append('subcategoryid', subcategoryid)
        formData.append('brandname', brandname)
        formData.append('picture', marblep.bytes)
        formData.append('contact', contact)
        formData.append('contactperson', contactperson)
        formData.append('emailid', emailid)


        // var body = { categoryid: categoryid, picture: marblep, subcategoryname: subcategoryname, description, description }
        var config = { headers: { "content-Type": "multipart/formData" } }
        var result = await postDataAndImage("brand/addmarbleee", formData, config)
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
                                Brands
                            </div>

                        </Grid>
                        <Grid item xs={6}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryid}
                                    label="Category Name"
                                    onChange={handleCategoryChange}
                                >
                                    {fillCategory()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"> Sub Category Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subcategoryid}
                                    label=" Sub Category Name"
                                    onChange={handleSubCategoryChange}
                                >
                                    {fillSubCategory()}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField onChange={(event) => setBrandname(event.target.value)} fullWidth label="Brand Name" variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField onChange={(event) => setsContactPerson(event.target.value)} fullWidth label="Contact Person" variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField onChange={(event) => setContact(event.target.value)} fullWidth label="Contact No." variant="outlined" />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField onChange={(event) => setEmailid(event.target.value)} fullWidth label="Emailid" variant="outlined" />
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