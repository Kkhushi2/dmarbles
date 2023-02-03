import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    rootDiv: {
       marginTop:10
        
      },
    divStyle: {
        display:'flex',
        flexDirection:'row',
        padding:2,
        justifyContent:'left',
        
      },
  dashboardTextStyle: {
    flexGrow: 1,
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#000'
    
  },
  avatarStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconStyle: {
    fontSize: 20,
    color: "#273c75",
    padding: 2



  }

});


export { useStyles }