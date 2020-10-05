
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
import history from "../history.js";
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
  avatar: {
    margin: theme.spacing(1),
    textAlign:"center",
    backgroundColor: theme.palette.secondary.main,
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
  
  //const [storeId, setStoreId]=React.useState(undefined);
  
  
  React.useEffect(()=>{
            setIsActive(true)
            axios.get("https://martek.herokuapp.com/api/campuses")
            .then(res=>{
                const campuses = res.data;
                if(res.status === 200){
                  setCampusList(campuses)
                }
                
            });
  
            axios.get("https://martek.herokuapp.com/api/shop-types")
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
    axios.post('https://martek.herokuapp.com/api/register-merchandiser',
    {company_name, email,phone:`233${phone}`,password, campus_id,company_description,shop_type_id}
  ).then(res => {
    console.log(res.data)
      if(res.data.merchandiser_id !== null){
        const storeId=res.data.merchandiser_id;
        setTimeout(
          function(){
            history.push("/auth/upload-avatar",{storeId});
          },
          100
      )
      }
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
    <IndexNavbar />
    
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
            <Grid container>
              <Grid item xs={6}>
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
            <Grid item xs={6}>
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
              <Grid item xs={5}>
                <Grid container>
                  <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Campus</InputLabel>
              </Grid>
              <Grid item xs={3}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={campus_id}
                    onChange={e => setCampus_id(e.target.value)}
                >
                {campusList.map(value => <MenuItem value={value.id} key={value.id}>{value.campus}</MenuItem>)}
                </Select>
                </Grid>
                </Grid>

              </Grid>
              <Grid item xs={7}>
                <Grid container>
                  <Grid item xs={6}>
              <InputLabel id="demo-simple-select-label">Shop Type</InputLabel>
              </Grid>
              <Grid item xs={3}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={shop_type_id} name="shop_type" onChange={e => setshop_type_id(e.target.value)}
                >
                {shop_type_list.map(value => <MenuItem value={value.id} key={value.id}>{value.shop_type}</MenuItem>)}
                </Select>
                </Grid>
                </Grid>
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
              type="password"
              id="password"
              autoComplete="current-password"
              value={password} onChange={e=>setPassword(e.target.value)} 
            />
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
              value={confrimPassword} onChange={e=>setConfirmPassword(e.target.value)} 
            />

            By clicking this you agree to our  <Link to="#" style={{color:"#0b7dda"}}>Terms</Link> & <Link to="#" style={{color:"#0b7dda"}}>Privacy Policy</Link> <Checkbox style={{float:"right" , marginRight:"20px"}} type="checkbox" value="1" required onChange={e=>setCheckbox(!checkbox)}/>
          
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
            
          </form>
          </div>
        </Container>
        </div>
        </div>
        <DemoFooter />
    </div>
  );
}