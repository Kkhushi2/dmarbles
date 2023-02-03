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
        width: 700,
        marginTop: 130,
        flexDirection: "column",
        alignItems: "center",
    },

    gap: {
        marginTop: 10
    },

    inputstyle: { display: 'none' }
});
const Input = styled('input')({
    display: 'none',
});




export default function DisplayModel(props) {
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
    const [listmodel, setListModel] = useState([])
    const fetchAllModel = async () => {
        var result = await getData("model/displaymodel")
        setListModel(result.result)
    }
    useEffect(function () {
        fetchAllModel()
        fetchAllBrand()
        fetchAllCategory()
        fetchAllsubCategory()
    }, [])
    const handleClose = () => {
        setOpen(false)
    }
    const handleEdit = (rowData) => {
        setsubCategoryid(rowData.subcategoryid)
        setcategoryid(rowData.categoryid)
        fetchAllsubCategory(rowData.categoryid);
        fetchAllBrand(rowData.subcategoryid)
        setBrandid(rowData.brandid)
        setModelid(rowData.modelid)
        setModelname(rowData.modelname)
        setOpen(true)
    }
    const handleEditData = async () => {
        var body = { subcategoryid: subcategoryid, brandid: brandid, modelid: modelid, modelname: modelname, categoryid: categoryid }
        var result = await postData("model/editmodel", body)
        if (result) {
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
        fetchAllModel()
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

    const handleCategoryChange = (event) => {
        setcategoryid(event.target.value);
        fetchAllsubCategory(categoryid);
    };
    const handlesubCategoryChange = (event) => {
        setsubCategoryid(event.target.value);
        fetchAllBrand(event.target.value);

    };
    const handleBrandChange = (event) => {
        setBrandid(event.target.value);
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


    const handleDeleteData = async (modelid) => {
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

                var body = { modelid: modelid }
                var result = await postData("model/deletemodel", body)

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
            fetchAllModel()

        })
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
                                Model List
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
                                    onChange={(event) => handleCategoryChange(event)}
                                >
                                    {fillCategory()}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"> Sub Category Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subcategoryid}
                                    label=" Sub Category Name"
                                    onChange={(event) => handlesubCategoryChange(event)}
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
                                    label=" Brand Name"
                                    onChange={handleBrandChange}
                                >
                                    {fillBrand()}
                                </Select>
                            </FormControl>




                        </Grid>
                        <Grid item xs={6}>
                            <TextField value={modelname} onChange={(event) => setModelname(event.target.value)} fullWidth label="Model Name" variant="outlined" />
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

    function displayallmodel() {
        return (
            <MaterialTable
                title={<AddAction title="Category List" tooltip="Add Category" url="/dashboard/model"/>}
                columns={[
                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'Sub Category Id', field: 'subcategoryid' },
                    { title: 'Brand Id', field: 'brandid' },
                    { title: 'Model Id', field: 'modelid' },
                    { title: 'Model Name', field: 'modelname' },




                ]}
                data={listmodel}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit List',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete List',
                        onClick: (event, rowData) => handleDeleteData(rowData.modelid)
                    }
                ]}
            />
        )
    }
    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {displayallmodel()}
                {showDialog()}
            </div>
        </div>)

}
