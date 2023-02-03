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
        padding: 20,
        width: 1200,
        marginTop: 90,
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




export default function DisplayBrand(props) {
    const classes = useStyles()
    const [listcategory, setListCategory] = useState([])
    const [listsubcategory, setListsubCategory] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryid, setcategoryid] = useState('')
    const [subcategoryid, setsubcategoryid] = useState('')
    const [marblep, setMarblep] = useState({ bytes: '', file: '/marble.jpg' })
    const [tempIcon, setTempicon] = useState({ bytes: '', file: `${ServerURL}/images/${marblep.file}` })
    const [btnState, setBtnstate] = useState(false)
    const [categoryname, setCategoryname] = useState([])

    const [subcategoryname, setsubCategoryname] = useState([])
    const [contactperson, setContactPerson] = useState('')
    const [contact, setContact] = useState('')
    const [emailid, setEmailid] = useState('')
    const [brandid, setBrandid] = useState('')
    const [listbrand, setListBrand] = useState([])
    const [brandname, setBrandname] = useState('')
    const fetchAllBrand = async () => {
        var result = await getData("brand/displayalllb")
        setListBrand(result.result)
     
    }
    useEffect(function () {

        fetchAllBrand()
        fetchAllCategory()
        fetchAllsubCategory()

    }, [])
    const handleClose = () => {
        setOpen(false)
    }
    const handleEdit = (rowData) => {
        setsubcategoryid(rowData.subcategoryid)
        setcategoryid(rowData.categoryid)
        setBrandid(rowData.brandid)
        setMarblep({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
        setTempicon({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
        setBrandname(rowData.brandname)
        setContact(rowData.contact)
        setContactPerson(rowData.contactperson)
        setEmailid(rowData.emailid)

        setOpen(true)
    }
    const handleEditData = async () => {



        var body = { subcategoryid: subcategoryid, brandid: brandid, brandname: brandname, categoryid: categoryid, subcategoryid: subcategoryid, contact: contact, contactperson: contactperson, emailid, emailid }
        var result = await postData("brand/editmarbleee", body)

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
        fetchAllBrand()
    }
    const fetchAllCategory = async () => {
        var result = await getData("marble/displayall")
        setListCategory(result.result)

    }
    const fetchAllsubCategory = async (categoryid) => {
        var result = await postData("subcategory/subcategory", { categoryid: categoryid })
        setListsubCategory(result.result)

    }

    const handleCategoryChange = (event) => {
        setcategoryid(event.target.value);
        fetchAllsubCategory(event.target.value);
    };
    const handlesubCategoryChange = (event) => {
        setsubCategoryname(event.target.value);

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
    useEffect(function () {
        fetchAllCategory()
        // fetchAllsubCategory()

    }, [])
    const handleEditPicture = async () => {

        var formData = new FormData()
        formData.append('brandid', brandid)
        formData.append('picture', marblep.bytes)


        var result = await postDataAndImage("brand/editpictureee", formData)

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
        fetchAllBrand()
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
                var result = await postData("brand/deletemarbleee", body)

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
            fetchAllBrand()

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
                                Brand List
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
                                    onChange={(event)=>handleCategoryChange(event)}
                                >
                                    {fillCategory()}
                                </Select>
                            </FormControl>




                        </Grid>
                        <Grid item xs={6}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sub Category Name</InputLabel>
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
                            <TextField value={brandname} onChange={(event) => setBrandname(event.target.value)} fullWidth label="Brand Name" variant="outlined" />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField value={contact} onChange={(event) => setContact(event.target.value)} fullWidth label="Contact No." variant="outlined" />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField value={contactperson} onChange={(event) => setContactPerson(event.target.value)} fullWidth label="Contact" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField value={emailid} onChange={(event) => setEmailid(event.target.value)} fullWidth label="Contact" variant="outlined" />
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

    function displayallb() {
        return (
            <MaterialTable
                title={<AddAction title="Brand List" tooltip="Add Brand" url="/dashboard/brand"/>}
                columns={[
                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'Sub Category Id', field: 'subcategoryid' },
                    { title: 'Brand Id', field: 'brandid' },
                    { title: 'Brand Name', field: 'brandname' },
                    { title: 'Contact Person', field: 'contactperson' },
                    { title: 'Contact', field: 'contact' },
                    { title: 'Emailid', field: 'emailid' },

                    {
                        title: 'Picture', field: 'picture',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 50 }} />
                    },

                ]}
                data={listbrand}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit List',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete List',
                        onClick: (event, rowData) => handleDeleteData(rowData.brandid, rowData.picture)
                    }
                ]}
            />
        )
    }
    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {displayallb()}
                {showDialog()}
            </div>
        </div>)

}
