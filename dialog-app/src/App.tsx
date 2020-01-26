import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import './App.css';

class App extends React.Component<any, any> {

  constructor (props:any) {
    super(props);
    this.state = {
      open:false,
      registeropen:false,
      viewopen:false,
      checkA:false,
      checkB:false,
      checkC:false,
      username:'',
      allData:[],
      hideData:false,
      CalFirst:'',
      operator:'',
      CalSecond:'',
    };
  }

  CalculatorCount = 0;
  // View Functions 

  handleViewOpen = () => {
    this.setState({viewopen:true});
  }

  handleViewClose = () => {
    this.setState({viewopen:false});
  }

  getdata = () => {
    this.setState({hideData:false});
      let data = fetch('https://jsonplaceholder.typicode.com/users');
      data.then(response => {
        return response.json();
      }).then(result =>{
        this.setState({allData:result});
      }); 
  }

  handleHideData = () => {
    this.setState({allData:[]});
    this.setState({hideData:true});
  }

  // Login Functions
  handleClick = () => {
    this.setState({open:true});
  }

  handleClose = () => {
    this.setState({open:false});
  }

  // handleEmailState = (evt:any) => {
  //   this.setState({email:evt.target.value});
  // }

  handleCheckA = () => {
    if (!this.state.checkA){
    this.setState({checkA:true});
    this.setState({checkB:false});
    this.setState({checkC:false});
    // console.log('checkA', this.state.checkA)
    }else {
      this.setState({checkA:false});
      // console.log('checkA', this.state.checkA)
    } 
  }

  handleCheckB = () => {
    if (!this.state.checkB){
      this.setState({checkB:true});
      this.setState({checkA:false});
      this.setState({checkC:false});
    }else {
      this.setState({checkB:false});
    }
  }

  handleCheckC = () => {
    if (!this.state.checkC) {
      this.setState({checkC:true});
      this.setState({checkA:false});
      this.setState({checkB:false});

    }else {
      this.setState({checkC:false});
    }
  }
  handleNameChange = (evt:any) => {
    this.setState({username:evt.target.value});
  }

  performaction = () => {
    if (this.state.checkA === true) {
      let value = this.state.username.toLowerCase();
      this.setState({username:value});
    } else if (this.state.checkB === true) {
      let value = this.state.username.toUpperCase();
      this.setState({username:value});
    } else {
      alert('Please Check the Switch ')
    }
  }


  // Register Functions
  handleRegisterOpen = () => {
    this.setState({registeropen:true});
  }

  handleRegisterClose = () => {
    this.setState({registeropen:false});
  }

    // Calculator Functions

    CalculatorValue = (evt:any, value:any) => {
      if (this.CalculatorCount === 0) {
        this.setState({CalFirst: Number(value)});
        this.CalculatorCount++;
      }
      if (this.CalculatorCount > 0) {
        let getFistValue = this.state.CalFirst;
        if (Number(getFistValue) === 0){
          this.setState({CalFirst:value});
        } else{
        getFistValue = getFistValue + Number(value);
        this.setState({CalFirst:getFistValue});
      }
    }
  }

  handleDelValue = () => {
    this.setState({CalFirst:'0'})
    this.operator_added = true;
  }
  operator_added:boolean = true;
  CalculatorOperator = (evt:any,value:any) => {
    let getOperator = value;
    // this.setState({operator:getOperator});
    
    if (this.operator_added) {
    let calFirstwithOperator = this.state.CalFirst + getOperator; 
    this.setState({CalFirst:calFirstwithOperator});
    this.operator_added = false;
    }
  }
  calculateResult = () => {
    let s:any[] = [];
    let totalValue = this.state.CalFirst;
    s = totalValue.split('');
    // console.log(s);
    if (s.includes('+')) {
      let s1 = totalValue.split('+');
      let finalResult = Number(s1[0]) + Number(s1[1]);
      this.setState({CalFirst:finalResult});
      // console.log(s1);
    }
  }

  render(){
    console.log('AllData', this.state.allData);
  return (
    <div>
      <header>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Blog
          </Typography>
          <div className='button'>
          <Button type="button" onClick={this.handleViewOpen} style={{backgroundColor:'gray', margin:"0px"}}>View</Button>
          <Button type="button" onClick={this.handleClick} style={{backgroundColor:'gray', marginLeft:'10px'}}>Login</Button>
          <Button type="button" onClick={this.handleRegisterOpen} style={{backgroundColor:'gray',marginLeft:'10px'}}>Register</Button>
          </div>
        </Toolbar>
      </AppBar>
      </header>
                {/* View Dialog Box */}
                <Dialog open={this.state.viewopen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <Button onClick={this.getdata} color="primary">
                      View Data
                    </Button>
                    <Button onClick={this.handleHideData} color="primary">
                      Hide Data
                    </Button>
                  </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Click On View To See Latest Data
                  </DialogContentText>
                  {/* (this.state.allData !== '' || this.state.allData !== undefined) ? */}
                  <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Website</TableCell>
                            <TableCell>Email</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {(this.state.hideData) ? '' :
                            this.state.allData.map((data:any) => {
                              return <TableRow>
                                <TableCell>{data.id}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.username}</TableCell>
                                <TableCell>{data.website}</TableCell>
                                <TableCell>{data.email}</TableCell>
                              </TableRow>
                            })
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleViewClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>


                {/* Login Dialog Box */}
              <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Login with Username or Email Address
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="User Name"
                    value={this.state.username}
                    type="email"
                    fullWidth
                    onChange={this.handleNameChange}
                  /><br/><br/>

                  <TextField
                    autoFocus
                    margin='dense'
                    id='pass'
                    label='Password'
                    type='password'
                    fullWidth
                  /><br/><br/>

                  <Switch
                    checked={this.state.checkA}
                    onChange={this.handleCheckA}
                    color='primary'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />LowerCase

                  <Switch
                    checked={this.state.checkB}
                    onChange={this.handleCheckB}
                    color='primary'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />UperCase
                  
                  <Switch
                    checked={this.state.checkC}
                    onChange={this.handleCheckC}
                    color='primary'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />Space Count<br/>

                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.performaction} color="primary">
                    Perform Action
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Register Dialog Box*/}
              <Dialog open={this.state.registeropen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Registration</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter Your Information To Login Page
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="fname"
                    label="First Name"
                    type="text"
                    // fullWidth
                  />

                  <TextField
                    autoFocus
                    margin='dense'
                    id='lname'
                    label='LastName'
                    type='text'
                    // fullWidth
                    style={{ marginLeft: 15 }}
                  /><br/>

                  <TextField
                    autoFocus
                    margin='dense'
                    id='email'
                    label='Email'
                    type='email'
                    // fullWidth 
                  />

                  <TextField
                    autoFocus
                    margin='dense'
                    id='Mobile'
                    label='Mobile'
                    type='Number'
                    // fullWidth
                    style={{ marginLeft: 15 }}
                  /><br/>

                  <TextField
                    autoFocus
                    margin='dense'
                    id='pass'
                    label='Password'
                    type='Password'
                    // fullWidth
                  />    

                  <TextField
                    autoFocus
                    margin='dense'
                    id='pass2'
                    label='Confirm Password'
                    type='password'
                    // fullWidth
                    style={{ marginLeft: 15 }}
                  /><br/><br/> 
                  
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleRegisterClose} color="primary">
                    Cancel
                  </Button>
                  <Button color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
      <Contents/>
    </div>
  );
}
}

class Contents extends App {

 
  render(){
    return (
      <div className='container'>
        <Button type='button' style={{backgroundColor:'darkgray', margin:'50px 0px 0px 130px'}}>Calculator</Button>
        <Paper style={{backgroundColor:'darkgray',width:'350px',height:'450px',margin:'10px 0px 0px 15px',borderRadius:'8px'}}>
        <TextareaAutosize
          style={{width:'344px', height:'130px',backgroundColor:'lightgray',textAlign:'right',fontSize:'40px',borderTopLeftRadius:'8px',borderTopRightRadius:'8px'}}
          disabled
          value={this.state.CalFirst}
        />

        <div style={{marginLeft:'11px',marginTop:10}}>

        <Button 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"1")}>
          1
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"2")}>
          2
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"3")}>
          3
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorOperator(e, "/")}
        >
          /
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"4")}>
          4
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"5")}>
          5
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"6")}>
          6
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorOperator(e, "*")}
        >
          x
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"7")}>
          7
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"8")}>
          8
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"9")}>
          9
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorOperator(e, "-")}
        >
          -
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorValue(e,"0")}>
          0
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:162,height:50,marginRight:3,marginBottom:10}}
        onClick={this.calculateResult}
        >
          =
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}
        onClick={(e:any) => this.CalculatorOperator(e, "+")}
        >
          +
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:245,height:50,marginRight:3,marginBottom:10}}
        onClick={this.handleDelValue}>
          C
        </Button>
        <Button type='button' 
        style={{backgroundColor:'gray',width:80,height:50,marginRight:3,marginBottom:10}}>
          del
        </Button>
        {/* {this.state.operator} */}
        </div>
        </Paper>
      </div>

    );
  }
}

export default App;
