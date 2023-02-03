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


        width: '300vw',
        height: '130vh'
    },
    subdiv: {
        display: 'flex',
        background: '#dcdde1',
        padding: 30,
        width: 800,
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




export default function DisplaysubCategory(props) {
    const classes = useStyles()
    const [listcategory, setListCategory] = useState([])
    const [listsubcategory, setListsubcategory] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryid, setcategoryid] = useState('')
    const [subcategoryid, setsubcategoryid] = useState('')
    const [marblep, setMarblep] = useState({ bytes: '', file: '/marble.jpg' })
    const [tempIcon, setTempicon] = useState({ bytes: '', file: `${ServerURL}/images/${marblep.file}` })
    const [btnState, setBtnstate] = useState(false)
    const [categoryname, setCategoryname] = useState([])
    const [description, setdescription] = useState('')
    const [subcategoryname, setsubcategoryname] = useState([])
    const fetchAllsubcategory = async () => {
        var result = await getData("subcategory/displayalll")
        setListsubcategory(result.result)
        // alert(JSON.stringify(result))
    }
    useEffect(function () {

        fetchAllsubcategory()

    }, [])
    const handleClose = () => {
        setOpen(false)
    }
    const handleEdit = (rowData) => {
        setsubcategoryid(rowData.subcategoryid)
        setcategoryid(rowData.categoryid)
        setMarblep({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
        setTempicon({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
        setsubcategoryname(rowData.subcategoryname)
        setdescription(rowData.description)
        setOpen(true)
    }
    const handleEditData = async () => {



        var body = { subcategoryid: subcategoryid, subcategoryname: subcategoryname, categoryid: categoryid, description: description }
        var result = await postData("subcategory/editmarblee", body)

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
        fetchAllsubcategory()
    }
    const fetchAllCategory = async () => {
        var result = await getData("marble/displayall")
        setListCategory(result.result)

    }

    const handleCategoryChange = (event) => {
        setCategoryname(event.target.value);
    };
    
    const fillCategory = () => {
        return (listcategory.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)


        })

        )
    }
    useEffect(function () {
        fetchAllCategory()
    }, [])
    const handleEditPicture = async () => {

        var formData = new FormData()
        formData.append('subcategoryid', subcategoryid)
        formData.append('picture', marblep.bytes)


        var result = await postDataAndImage("subcategory/editpicturee", formData)

        if (result) {
            Swal.fire({
                title: 'Icon Edited Successfully ',
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
        setBtnstate(false)
        fetchAllsubcategory()
    }
    const handleDeleteData = async (subcategoryid, marblep) => {
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

                var body = { subcategoryid: subcategoryid, picture: marblep }
                var result = await postData("subcategory/deletemarblee", body)

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
            fetchAllsubcategory()

        })
    }





    const handlePictureChange = (event) => {
        setMarblep({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        setBtnstate(true)
    }

    const handleCancel = () => {
        setMarblep({ bytes: '', file: `${tempIcon.file}` })
        setBtnstate(false)
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
                                Choose Marble Category
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
                            <TextField value={subcategoryname} onChange={(event) => setsubcategoryname(event.target.value)} fullWidth label="Sub Category Name" variant="outlined" />
                        </Grid>


                        <Grid item xs={12}>


                            <div style={{ marginTop: 20 }}>

                                <TextField value={description} onChange={(event) => setdescription(event.target.value)} fullWidth label="Marble descriptioncription" variant="outlined" />
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <label htmlFor="contained-button-file">
                                <Input onChange={(event => handlePictureChange(event))} id="contained-button-file" multiple type="file" />
                                {/* <input style={{display:'none'}} onChange={(event=>handlePictureChange(event))} id="contained-button-file" multiple type="file" /> */}
                                <Button fullWidth variant="contained" component="span">
                                    Edit Image
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                            {btnState ? <><Button onClick={() => handleEditPicture()}>Save</Button><Button onClick={() => handleCancel()}>Cancel</Button></> : <></>}
                            <Avatar
                                alt="Upload Image"
                                src={marblep.file}
                                variant="square"
                                sx={{ width: 56, height: 56 }}
                            />
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

    function displayalll() {
        return (
            <MaterialTable
                title={<AddAction title="subcategory List" tooltip="Add Subcategory" url="/dashboard/subcategory"/>}
                columns={[
                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'Sub Category Id', field: 'subcategoryid' },
                    { title: 'Sub Category Name', field: 'subcategoryname' },
                    { title: 'description', field: 'description' },
                    {
                        title: 'Picture', field: 'picture',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 50 }} />
                    },

                ]}
                data={listsubcategory}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit List',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete List',
                        onClick: (event, rowData) => handleDeleteData(rowData.subcategoryid, rowData.picture)
                    }
                ]}
            />
        )
    }
    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {displayalll()}
                {showDialog()}
            </div>
        </div>)

}
