import React, { useState, useEffect } from "react"
import MaterialTable from "@material-table/core"
import { getData, ServerURL, postDataAndImage, postData } from "./FetchNodeServices";
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Swal from "sweetalert2";
import AddAction from '../admin/AddAction'
import DeleteIcon from '@mui/icons-material/Delete';
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles({
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
        width: 1300,
        marginTop: 130,
        flexDirection: "column",
        alignItems: "center",
    },

    gap: {
        marginTop: 10
    },

    inputstyle: { display: 'none' }
});




export default function DisplayProduct() {
    const classes = useStyles()
    const [listcategory, setListCategory] = useState([])
    const [listsubcategory, setListsubCategory] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryid, setcategoryid] = useState('')
    const [subcategoryid, setsubCategoryid] = useState('')
    const [btnState, setBtnstate] = useState(false)
    const [categoryname, setCategoryname] = useState([])
    const [modelid, setModelid] = useState('')
    const [modelname, setModelname] = useState('')
    const [subcategoryname, setsubCategoryname] = useState([])
    const [brandid, setBrandid] = useState('')
    const [listbrand, setListBrand] = useState([])
    const [brandname, setBrandname] = useState('')
    const [listModel, setListModel] = useState([])
    const [productname, setProductname] = useState('')
    const [size, setSize] = useState('')
    const [price, setPrice] = useState('')
    const [listproduct, setListProduct] = useState([])
    const [offerprice, setOfferPrice] = useState('')
    const [productid, setProductid] = useState('')
    const [numberofpieces, setNumberofpieces] = useState('')
    const [allPictures, setAllPictures] = useState([])
    const [uploadfiles, setFiles] = useState([])
    const [stock, setStock] = useState('')
    const [listSize, setListSize] = useState([])

    const fetchAllProduct = async () => {
        var result = await getData("product/displayproduct")
        setListProduct(result.result)
        // alert(JSON.stringify(result))
    }
    useEffect(function () {

        fetchAllCategory()
        fetchAllSize()

    }, [])
    const handleClose = () => {
        setOpen(false)
    }
    const handleEdit = (rowData) => {
        setsubCategoryid(rowData.subcategoryid)
        setcategoryid(rowData.categoryid)
        fetchAllsubCategory(rowData.categoryid);
        fetchAllBrand(rowData.subcategoryid)
        setAllPictures(JSON.parse(rowData.picture))
        fetchAllModel(rowData.brandid)
        setBrandid(rowData.brandid)
        setModelid(rowData.modelid)
        setProductid(rowData.productid)
        setProductname(rowData.productname)
        setOfferPrice(rowData.offerprice)
        setPrice(rowData.price)
        setSize(rowData.size)
        setNumberofpieces(rowData.numberofpieces)
        setStock(rowData.stock)
        setOpen(true)

    }
    const handleEditData = async () => {
        const formData = new FormData()
        formData.append('productid', productid)
        formData.append('subcategoryid', subcategoryid)
        formData.append('brandid', brandid)
        formData.append('modelid', modelid)
        formData.append('productname', productname)
        formData.append('categoryid', categoryid)
        formData.append('price', price)
        formData.append('offerprice', offerprice)
        formData.append('size', size)
        formData.append('numberofpieces', numberofpieces)
        formData.append('stock', stock)
        formData.append("allpictures", JSON.stringify(allPictures))
        uploadfiles.forEach(item => {
            formData.append('picture', item)
        })
        var result = await postDataAndImage("product/editproduct", formData)
        if (result.result) {
            Swal.fire({
                title: ' list Edited Successfully ',
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
                text: 'Failed To Edit',
                imageUrl: '/marble.jpg',
                imageWidth: 400,
                imageHeight: 300,
                icon: "error"

            }))
        setOpen(false)
        fetchAllProduct()
    }
    const fetchAllCategory = async () => {
        var result = await getData("marble/displayall")
        setListCategory(result.result)

    }
    const fetchAllsubCategory = async (categoryid) => {
        var result = await postData("brand/subcategory", { categoryid: categoryid })
        setListsubCategory(result.result)
    }
    const fetchAllBrand = async (subcategoryid) => {
        var result = await postData("model/brand", { subcategoryid: subcategoryid })
        setListBrand(result.result)
    }
    const fetchAllModel = async (brandid) => {
        var result = await postData("brand/fetchmodel", { brandid: brandid })
        setListModel(result.result)

    }
    const fetchAllSize = async () => {
        var result = await getData("product/displaysize")
        setListSize(result.result)

    }

    const handleCategoryChange = (event) => {
        setcategoryid(event.target.value);
        fetchAllsubCategory(event.target.value);
    };
    const handlesubCategoryChange = (event) => {
        setsubCategoryid(event.target.value);
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
        return (listcategory.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
        })
        )
    }
    const fillsubCategory = () => {
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
            return (<MenuItem value={item.sizeid}>{item.length} - {item.breadth}</MenuItem>)


        })

        )
    }
    const handleDeleteData = async (brandid, marblep) => {
        // alert(JSON.stringify(marblep))

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                var body = { brandid: brandid, picture: marblep }
                var result = await postData("product/deleteproduct", body)

                if (result.result)
                    Swal.fire(
                        'Deleted!',
                        'Data has been Deleted',
                        'success'
                    )
            }
            else

                Swal.fire(
                    'Deleted!',
                    'Failed to Delete Department',
                    'error'
                )
            fetchAllProduct()

        })
    }






    const handleDeleteImage = (i) => {
        const arr = [...allPictures]
        arr.splice(i, 1)
        setAllPictures(arr)
    }


    const handleImage = (files) => {
        setFiles(files);
    }



    const showDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-descriptioncribedby="alert-dialog-descriptioncription"
            >
                <DialogTitle id="alert-dialog-title">

                </DialogTitle>
                <DialogContent>
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
                                    onChange={handlesubCategoryChange}
                                >
                                    {fillsubCategory()}
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
                            <TextField value={productname} onChange={(event) => setProductname(event.target.value)} fullWidth label="Product Name" variant="outlined" />
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
                            <TextField value={price} onChange={(event) => setPrice(event.target.value)} fullWidth label="Price" variant="outlined" />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField value={offerprice} onChange={(event) => setOfferPrice(event.target.value)} fullWidth label="Offer Price" variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField value={numberofpieces} onChange={(event) => setNumberofpieces(event.target.value)} fullWidth label="Number Of Pieces" variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField value={stock} onChange={(event) => setStock(event.target.value)} fullWidth label="Stock" variant="outlined" />
                        </Grid>



                        <Grid item xs={6}>
                            <DropzoneArea
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                                filesLimit={6}
                                maxFileSize={500000}
                                onChange={handleImage}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItem: 'center' }}>
                            {allPictures.map((item, index) => {
                                return (<div style={{ position: 'relative', padding: 10,display:'flex',flexWrap:'wrap' }}><img
                                    alt="Upload Image"
                                    src={ServerURL + "/images/" + item}
                                    variant="square"
                                    style={{ width: 56, height: 56 }}
                                />
                                    <DeleteIcon style={{
                                        position: 'absolute',
                                        top: '0px',
                                        left: '0px',
                                        backgroundColor: 'black',
                                        borderRadius: '10px', color: 'white',cursor:'pointer'
                                    }} onClick={() => handleDeleteImage(index)} />
                                </div>
                                )
                            })}

                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleEditData()} >Edit</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    function displayallproduct() {
        return (
            <MaterialTable
                title={<AddAction title="Product List" tooltip="Add Product" url="/dashboard/product" />}
                columns={[
                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'Sub Category Id', field: 'subcategoryid' },
                    { title: 'Brand Id', field: 'brandid' },
                    { title: 'Model Id', field: 'modelid' },
                    { title: 'Product Id', field: 'productid' },
                    { title: 'Product Name', field: 'productname' },
                    { title: 'Price', field: 'price' },
                    { title: 'Size', field: 'size' },
                    { title: 'Offer Price', field: 'offerprice' },
                    { title: 'Number Of Pieces', field: 'numberofpieces' },
                    { title: 'Stock', field: 'stock' },



                    {
                        title: 'Picture', field: 'picture',
                        render: rowData => {
                            const data = JSON.parse(rowData.picture)

                            return (<img src={`${ServerURL}/images/${data[0]}`} style={{ width: 50 }} />)
                        }
                    },




                ]}
                data={listproduct}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit List',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete List',
                        onClick: (event, rowData) => handleDeleteData(rowData.productid)
                    }
                ]}
            />
        )
    }
    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {displayallproduct()}
                {showDialog()}
            </div>
        </div>
    )

}
