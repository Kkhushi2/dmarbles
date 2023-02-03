import Tooltip from '@mui/material/Tooltip';
import {Link} from "react-router-dom";
import {Grid} from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function AddAction(props){
return(
<div>
<Grid container spacing={2}>
                <Grid item xs={4}>
<div style={{fontSize:18,fontWeight:'bold',margintop:'30',padding:'20'}}>
                {props.title}
                    </div>
                </Grid>
                <Grid item xs={4}>

                    <Link to={props.url} style={{textDecoration:'none',color:'black',padding:'20',fontWeight:'bold'}}>
                    <Tooltip title={props.tooltip}>
                    < AddCircleOutlineIcon  style={{color:'black',margintop:'20',padding:'20'}}/>
  
</Tooltip>
                  
                      
                       
                    </Link>


                </Grid>
            </Grid>


</div>

);


}
export default AddAction;