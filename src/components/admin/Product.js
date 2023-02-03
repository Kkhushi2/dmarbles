import { useState, useEffect } from "react"
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { getData, postData, postDataAndImage } from "./FetchNodeServices"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Swal from "sweetalert2";
import Productphoto from '../admin/Productphoto';
import { DropzoneArea } from "material-ui-dropzone";

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

export default function Model(props) {
    const classes = useStyles()
    const [categoryid, setcategoryid] = useState('')
    const [brandid, setBrandid] = useState('')
    const [categoryname, setCategoryname] = useState('')
    const [brandname, setBrandname] = useState('')
    const [subcategoryname, setsubCategoryname] = useState([])
    const [listsubcategory, setListsubCategory] = useState([])
    const [productname, setProductName] = useState('')
    const [size, setSize] = useState('')
    const [price, setPrice] = useState('')
    const [offerprice, setOfferPrice] = useState('')
    const [marblep, setMarblep] = useState({ bytes: '', file: '/marble.jpg' })
    const [listSubCategory, setListSubcategory] = useState([])
    const [subcategoryid, setsubcategoryid] = useState('')
    const [modelid, setModelid] = useState('')
    const [modelname, setModelname] = useState('')
    const [listbrand, setListbrand] = useState([])
    const [listCategory, setListcategory] = useState([])
    const [listModel, setListModel] = useState([])
    const [uploadfiles, setFiles] = useState([])
    const [numberofpieces, setNumberofpieces] = useState('')
    const [stock, setStock] = useState('')
    const [listSize, setListSize] = useState([])


    const handleImage = (files) => {
        setFiles(files);
    }

    const fetchAllCategory = async () => {
        var result = await getData("marble/displayall")
        setListcategory(result.result)

    }
    const fetchAllSize = async () => {
        var result = await getData("product/displaysize")
        setListSize(result.result)

    }
    const fetchAllsubCategory = async (categoryid) => {
        var result = await postData("brand/subcategory", { categoryid: categoryid })
        setListsubCategory(result.result)
    }
    const fetchAllBrand = async (subcategoryid) => {
        var result = await postData("subcategory/fetchbrand", { subcategoryid: subcategoryid })
        setListbrand(result.result)

    }
    const fetchAllModel = async (brandid) => {
        var result = await postData("brand/fetchmodel", { brandid: brandid })
        setListModel(result.result)

    }

    const handleCategoryChange = (event) => {
        setcategoryid(event.target.value);
        fetchAllsubCategory(event.target.value);
    };
    const handleSubCategoryChange = (event) => {
        setsubcategoryid(event.target.value);
        fetchAllBrand(event.target.value);
    };
    const handleBrandChange = (event) => {
        setBrandid(event.target.value);
        fetchAllModel(event.target.value);
    };
    const handleModelChange = (event) => {
        setModelid(event.target.value);
    };
    const handleSizeChange = (event) => {
        setSize(event.target.value);
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
    const fillBrand = () => {
        return (listbrand.map((item) => {
            return (<MenuItem value={item.brandid}>{item.brandname}</MenuItem>)
        })
        )
    }

    const fillModel = () => {
        return (listModel.map((item) => {
            return (<MenuItem value={item.modelid}>{item.modelname}</MenuItem>)
        })
        )
    }
    const fillSize = () => {
        return (listSize.map((item) => {
            return (<MenuItem value={item.sizeid}>{item.length} - {item.breadth} - {item.height}</MenuItem>)


        })

        )
    }

    useEffect(function () {
        fetchAllCategory()
        fetchAllSize()
    }, [])

    const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryid)
        formData.append('subcategoryid', subcategoryid)
        formData.append('brandid', brandid)
        formData.append('modelid', modelid)
        formData.append('productname', productname)
        formData.append('size', size)
        formData.append('price', price)
        formData.append('offerprice', offerprice)
        formData.append('offer', offerprice)
        formData.append('numberofpieces', numberofpieces)
        formData.append('stock', stock)
        uploadfiles.forEach(item => {
            formData.append('picture', item)
        })
        var result = await postDataAndImage("product/addproduct", formData)
        if (result.result) {
            Swal.fire({
                title: 'Form Submitted Successfully ',
                text: 'Modal with a custom image.',
                imageUrl: '/marble.jpg',
                imageWidth: 400,
                imageHeight: 300,
                icon: "success"
            })
        }
        else {
            Swal.fire({
                title: 'Deepak Marbles',
                text: 'Failed To Submitt',
                imageUrl: '/marble.jpg',
                imageWidth: 400,
                imageHeight: 300,
                icon: "error"

            })
        }
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
                                Model
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
                        <Grid item xs={6}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={brandid}
                                    label=" Sub Category Name"
                                    onChange={handleBrandChange}
                                >
                                    {fillBrand()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Model Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={modelid}
                                    label=" Model Name"
                                    onChange={handleModelChange}
                                >
                                    {fillModel()}
                                </Select>
                            </FormControl>
                        </Grid>



                        <Grid item xs={12}>
                            <TextField onChange={(event) => setProductName(event.target.value)} fullWidth label="Product Name" variant="outlined" />
                        </Grid>


                        <Grid item xs={4}>

<FormControl fullWidth>
    <InputLabel id="demo-simple-select-label"> Size</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={size}
        label="Size"
        onChange={handleSizeChange}
    >
        {fillSize()}
    </Select>
</FormControl>
</Grid>

                        <Grid item xs={4}>
                            <TextField onChange={(event) => setPrice(event.target.value)} fullWidth label="Price" variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField onChange={(event) => setOfferPrice(event.target.value)} fullWidth label="Offer Price" variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField onChange={(event) => setNumberofpieces(event.target.value)} fullWidth label="Number Of Pieces" variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField onChange={(event) => setStock(event.target.value)} fullWidth label="Stock" variant="outlined" />
                        </Grid>
                      



                        <Grid item xs={12}>
                            <DropzoneArea
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                filesLimit={6}
                                maxFileSize={500000}
                                onChange={handleImage}


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