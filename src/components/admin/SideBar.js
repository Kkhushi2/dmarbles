import { useState, useEffect } from "react";
import {useStyles} from "./SideBarcss.js"
import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import {Link} from "react-router-dom";
export default function SideBar(){
    const classes = useStyles()
return(
    <div className={classes.rootDiv}>

<div sx={{ width:250, maxWidth: '100%' }}>
<div className={classes.divStyle}>
    <DashboardSharpIcon fontSize="small" className={classes.iconStyle}/>
 <div className={classes.dashboardTextStyle}>
     DashBoard
 </div>
 
</div>
      <MenuList>
      <Link to="/dashboard/displayall" style={{textDecoration:'none',color:'black'}}>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Category</ListItemText>
       
        </MenuItem>
        </Link>
        <Link to="/dashboard/DisplaysubCategory" style={{textDecoration:'none',color:'black'}}>
        <MenuItem>
      
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add SubCategory</ListItemText>
        
        </MenuItem>
        </Link>
        <Link to="/dashboard/displaymodel" style={{textDecoration:'none',color:'black'}}>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Model</ListItemText>
       </MenuItem>
        </Link>
<Link to="/dashboard/displaybrand" style={{textDecoration:'none',color:'black'}}>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Brand</ListItemText>
       
        </MenuItem>
        </Link>

        <Link to="/dashboard/displaysize" style={{textDecoration:'none',color:'black'}}>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Size</ListItemText>
         </MenuItem>
        </Link>

        <Link to="/dashboard/displayproduct" style={{textDecoration:'none',color:'black'}}>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Product</ListItemText>
       
        </MenuItem>
        </Link>
      <Divider />
        </MenuList>
        
    </div>
  
</div>

)



}