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




export default function DisplaySize(props) {
    const classes = useStyles()
    const [listsize, setListsize] = useState([])
    const [open, setOpen] = useState(false)
  
    const [btnState, setBtnstate] = useState(false)
    const [sizeid, setSizeid] = useState('')
     const [length, setLength] = useState('')
    const [breadth,setBreadth] = useState('')
    const [height,setHeight] = useState('')
    const fetchAllSize = async () => {
        var result = await getData("size/displaysize")
        setListsize(result.result)
    }
    useEffect(function () {

        fetchAllSize()

    }, [])
    const handleClose = () => {
        setOpen(false)
    }
    const handleEdit = (rowData) => {
        setSizeid(rowData.sizeid)
        setLength(rowData.length)
        setBreadth(rowData.breadth)
        setHeight(rowData.height)
        setOpen(true)
    }
    const handleEditData = async () => {



        var body = { length:length,breadth:breadth,height:height,sizeid:sizeid }
        var result = await postData("size/editsize", body)

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
        fetchAllSize()
    }
   
    const handleDeleteData = async (sizeid) => {


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

                var body = { sizeid:sizeid }
                var result = await postData("size/deletesize", body)

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
            fetchAllSize()

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
                title={<AddAction title="Category List" tooltip="Add Category" url="/dashboard/size"/>}
                columns={[
                    { title: 'Size Id', field: 'sizeid' },
                    { title: 'Length', field: 'length' },
                    { title: 'Breadth', field: 'breadth' },
                    { title: 'Height', field: 'height' },
                   
                ]}
                data={listsize}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit List',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete List',
                        onClick: (event, rowData) => handleDeleteData(rowData.sizeid)
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
