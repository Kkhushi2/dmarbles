import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  logoStyle: {
    flexGrow: 1,
    fontSize: 20,
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
  userNameStyle: {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: 'black',
    padding: 2



  }

});


export { useStyles }