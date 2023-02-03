import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useStyles } from "./TopBarcss.js"

export default function TopBar(props) {
  const classes = useStyles()
  return (
    <div>
      <AppBar position="static" color="inherit" style={{backgroundColor:'#95afc0'}} >

        <Toolbar>

          <div className={classes.logoStyle}>
          Tile
            
          </div>


          <div className={classes.avatarStyle}>
            <Avatar alt="Travis Howard" src="/1.jpg" />
          </div>
          <div className={classes.userNameStyle}>
            Khushi Sappal
          </div>

        </Toolbar>
      </AppBar>
    </div>

  )



}

export { useStyles }