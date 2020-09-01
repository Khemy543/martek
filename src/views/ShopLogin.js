
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import { Alert } from "reactstrap";
import clsx from 'clsx';
import history from "../history.js";

import axios from "axios";

function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        martek
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    width: '100%',
  }
}));

export default function ShopLoginPage(props) {

  axios.defaults.withCredentials = false;
  //axios.defaults.headers.common['Auth-Token'] = 'foo bar';
  const config = {
    withCredentials: false, 
    headers : {
    "Access-Control-Allow-Origin":"*",
    "Content-Type": "application/json",
    "Accept": "application/json"
    
    },
  
  };


  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isActive, setIsActive] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [eye, setEye] = React.useState(false);
  //const [loggedin, setLoggedin] =React.useState(false);
  //const [modal, setModal] = React.useState(false);

  const toggleEye = () => setEye(!eye);
  //const [loggedin, setLoggedin] =React.useState(false);
  var storageData= [];

  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsActive(true)
  axios.post('https://martek.herokuapp.com/api/merchandiser/login', {
    config, email, password
  }).then(res => {
    console.log(res.data)
    if(res.data.statusCode === 200){
        localStorage.setItem('shop_access_token', res.data.access_token)
        setIsActive(false)
        history.push("/shop/shop-page")
    }
    
  }).catch(error => {
    setIsActive(false);
    setAlert(true)
  })

}


  const classes = useStyles();

  return (
    <LoadingOverlay 
    active = {isActive}
    spinner={<BounceLoader color={'#4071e1'}/>}
    >
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {alert?
                  <Alert color="warning" fade={true} style={{textAlign:"center"}}>
                  Incorrect Credentials
                </Alert>
                :
                <div>
                </div>
                }
                
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email} onChange={e => setEmail(e.target.value)}
            />
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" required margin="normal">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={password} onChange={e => setPassword(e.target.value)}
            name="password"
            type={eye?"text":"password"}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
              <i className={eye?"fa fa-eye-slash":"fa fa-eye"} onClick={toggleEye} style={{cursor:"pointer"}}/>
              </InputAdornment>
            }
          />
        </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/shop-register" variant="body2">
                  {"Don't own a shop? Register"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </LoadingOverlay>
  );
}