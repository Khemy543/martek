
import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
//import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import LoadingOverlay from "react-loading-overlay";
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import BounceLoader from "react-spinners/BounceLoader";
import Container from '@material-ui/core/Container';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import history from "../history.js";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import {Alert} from "reactstrap";
 
import axios from "axios";
import IndexNavbar from 'components/Navbars/IndexNavbar.js';
import DemoFooter from "components/Footers/DemoFooter"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    textAlign:"center",
    backgroundColor: theme.palette.secondary.main,
  },
  textField:{
    width:"100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function OwnShop(props){

  const [company_name, setCompany_name] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [campus_id, setCampus_id] = React.useState(1);
  const [company_description, setCompany_description]=React.useState("");
  const [campusList, setCampusList]=React.useState([]);
  const [shop_type_list, setShop_type_list]=React.useState([]);
  const [shop_type_id, setshop_type_id]=React.useState(1);
  const [isActive, setIsActive] = React.useState(false);
  const [checkbox, setCheckbox] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [errorMessage, setErrorMessage ] = React.useState("");
  const [confrimPassword, setConfirmPassword] = React.useState("");
  const [error, setError]= React.useState(false)
  const [eye, setEye] = React.useState(false);
  const [eye2, setEye2] = React.useState(false);
  
  //const [storeId, setStoreId]=React.useState(undefined);
  
  
  const toggleEye =()=> setEye(!eye);
  const toggleEye2 =()=> setEye2(!eye2);

  React.useEffect(()=>{
            setIsActive(true)
            axios.get("http://backend-api.martekgh.com/api/campuses")
            .then(res=>{
                const campuses = res.data;
                if(res.status === 200){
                  setCampusList(campuses)
                }
                
            });
  
            axios.get("http://backend-api.martekgh.com/api/shop-types")
            .then(res=>{
                const shop_type_data = res.data;
                
                 setShop_type_list(shop_type_data)
                 setIsActive(false)
                
            });
          },[]);
          
  
  const handleSubmit=(e)=>{
      e.preventDefault();
      if(password != confrimPassword){
        setIsActive(false)
        setErrorMessage("Passwords do not match");
        setAlert(true);
        
      }else{
      if(phone.length === 9){

      setIsActive(true);
    axios.post('http://backend-api.martekgh.com/api/register-merchandiser',
    {company_name, email,phone:`233${phone}`,password, campus_id,company_description,shop_type_id}
  ).then(res => {
    console.log(res.data)
        setTimeout(
          function(){
            history.push("/auth/upload-avatar",{id:res.data.merchandiser_id});
          },
          100
      )
    }).catch(error => {
      console.log("error",error);
      console.log(error.response.data)
      setIsActive(false);
      setAlert(true);
      if(error){
      setErrorMessage(error.response.data.errors.email || error.response.data.errors.phone)
      }
    })
  
  }
}
}
  const classes = useStyles();

  return (
    <div>
    <div className="main">
      <div className="section">
        <Container component="main" maxWidth="sm" style={{marginTop:"60px"}}>
          <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5" style={{textAlign:"center"}}>
            Own your Shop
          </Typography>
          {alert?
                  <Alert color="warning" fade={true} style={{textAlign:"center", fontWeight:500}}>
                  {errorMessage}
                </Alert>
                :
                <div>
                </div>
                }
          <form className={classes.form} onSubmit={handleSubmit}>
          <Container>
          <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              id="shop_name"
              label="Shop Name"
              name="shop_name"
              autoComplete="shop_name"
              autoFocus
              type="text"
              value={company_name} onChange={e=>setCompany_name(e.target.value)}
            />
            </Grid>
            </Grid> 
            <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="current-password"
              value={email} onChange={e=>setEmail(e.target.value)}
              
            />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" required margin="normal">
            <InputLabel htmlFor="outlined-error-helper-text">Phone</InputLabel>
            <OutlinedInput
              error={error}
              variant="outlined"
              margin="normal"
              helperText="Incorrect entry."
              required={true}
              value={phone} onChange={e=>{if(e.target.value.length !== 9){setError(true);setPhone(e.target.value)}
              else{setError(false);setPhone(e.target.value)}
              }}
              fullWidth
              name="country_code"
              label="Phone"
              type="text"
              id="outlined-error-helper-text"
              startAdornment={
              <InputAdornment position="start">
                +233
              </InputAdornment>
            }
            />
            </FormControl>
            </Grid>
            </Grid>
            <br/>
            <Grid container>
              <Grid item md={6} sm={12} xs={12} lg={6} xl={12} style={{marginLeft:"-5px"}}>
              <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="demo-simple-select-outlined-label">Campus</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={campus_id}
                onChange={e => setCampus_id(e.target.value)}
                label="Campus">
                {campusList.map(value => <MenuItem value={value.id} key={value.id}>{value.campus}</MenuItem>)}
                </Select>
              </FormControl>
              </Grid>
              <Grid item md={6} sm={12} xs={12} lg={6} xl={6}>
                <FormControl variant="outlined" className={classes.formControl} >
                <InputLabel id="demo-simple-select-outlined-label">Shop Type</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={shop_type_id} name="shop_type" onChange={e => setshop_type_id(e.target.value)}
                label="Shop Type">
                {shop_type_list.map(value => <MenuItem value={value.id} key={value.id}>
                {value.id === 1?
                <>Mini Shop (Gh¢ 20/Mo)</>:
                <>
                {value.id === 2?
                <>Max Shop (Gh¢ 40/Mo)</>:
                <>Non Student Shop (Gh¢ 80/Mo)</>
                }
                </>
                }
                </MenuItem>)}
                </Select>
                </FormControl>
                </Grid>
                </Grid>
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              name="description"
              label="Tell us about your shop..."
              type="text"
              id="description"
              autoComplete="current-password"
              value={company_description} onChange={e=>setCompany_description(e.target.value)} 
            />
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              name="password"
              label="Password"
              type={eye?"text":"password"}
              id="password"
              autoComplete="current-password"
              value={password} onChange={e=>setPassword(e.target.value)} 
              InputProps={{
                endAdornment:<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleEye}
                >
                  {eye ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type={eye2?"text":"password"}
              id="confirm-password"
              autoComplete="current-password"
              value={confrimPassword} onChange={e=>setConfirmPassword(e.target.value)} 
              InputProps={{
                endAdornment:<InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleEye2}
                >
                  {eye2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }}
            />

            Agree to our  <Link to="#" style={{color:"#0b7dda"}}>Terms</Link> & <Link to="#" style={{color:"#0b7dda"}}>Privacy Policy</Link> <Checkbox style={{float:"right" , marginRight:"20px"}} type="checkbox" value="1" required onChange={e=>setCheckbox(!checkbox)}/>
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!checkbox}
              style={{marginTop:"-5px"}}
            >
              Next
            </Button>
            </Container>
          </form>
          </div>
        </Container>
        </div>
        </div>
    </div>
  );
}