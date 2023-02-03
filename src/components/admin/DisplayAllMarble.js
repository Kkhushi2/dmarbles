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




export default function DisplayAllMarble(props) {
    const classes = useStyles()
    const [listmarble, setListmarble] = useState([])
    const [open, setOpen] = useState(false)
    const [categoryid, setcategoryid] = useState('')
    const [marblep, setMarblep] = useState({ bytes: '', file: '/marble.jpg' })
    const [tempIcon, setTempicon] = useState({ bytes: '', file: `${ServerURL}/images/${marblep.file}` })
    const [btnState, setBtnstate] = useState(false)
    const [categoryname, setCategoryname] = useState([])
    const [description, setdescription] = useState('')
    const fetchAllMarble = async () => {
        var result = await getData("marble/displayall")
        setListmarble(result.result)
    }
    useEffect(function () {

        fetchAllMarble()

    }, [])
    const handleClose = () => {
        setOpen(false)
    }
    const handleEdit = (rowData) => {
        setcategoryid(rowData.categoryid)
        setMarblep({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
        setTempicon({ bytes: '', file: `${ServerURL}/images/${rowData.picture}` })
        setCategoryname(rowData.categoryname)
        setdescription(rowData.description)
        setOpen(true)
    }
    const handleEditData = async () => {



        var body = { categoryname: categoryname, categoryid: categoryid, description: description }
        var result = await postData("marble/editmarble", body)

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
        fetchAllMarble()
    }
    const handleEditPicture = async () => {

        var formData = new FormData()
        formData.append('categoryid', categoryid)
        formData.append('picture', marblep.bytes)


        var result = await postDataAndImage("marble/editpicture", formData)

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
        fetchAllMarble()
    }
    const handleDeleteData = async (categoryid, marblep) => {
        alert(JSON.stringify(marblep))

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

                var body = { categoryid: categoryid, picture: marblep }
                var result = await postData("marble/deletemarble", body)

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
            fetchAllMarble()

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
                                Deepak Marbles
                            </div>

                        </Grid>

                        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', padding: 5 }}>
                            <Box sx={{ minWidth: 550 }}>
                                <FormControl fullWidth>
                                    <label id="demo-simple-select-label">Category Name</ label>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoryname}
                                        label="name"

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

                                <TextField value={description} onChange={(event) => setdescription(event.target.value)} fullWidth label="Marble descriptioncription" variant="outlined" />
                            </div>
                        </Grid>




                        <Grid item xs={6}>
                            <label htmlFor="contained-button-file">
                                <input style={{ display: 'none' }} onChange={(event) => handlePictureChange(event)} accept="image/*" id="contained-button-file" multiple type="file" />
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

    function displayall() {
        return (
            <MaterialTable
                title={<AddAction title="Category List" tooltip="Add Category" url="/dashboard/marble" />}
                columns={[
                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'Category Name', field: 'categoryname' },
                    { title: 'description', field: 'description' },
                    {
                        title: 'Picture', field: 'picture',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 50 }} />
                    },

                ]}
                data={listmarble}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit List',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete List',
                        onClick: (event, rowData) => handleDeleteData(rowData.categoryid, rowData.picture)
                    }
                ]}
            />
        )
    }
    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {displayall()}
                {showDialog()}
            </div>
        </div>)

}
