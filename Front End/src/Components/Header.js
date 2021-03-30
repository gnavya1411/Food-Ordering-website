
import React from 'react';
import '../Styles/Header.css';
import Modal from 'react-modal';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 :'400px'
    }
  };

class Header extends React.Component{
    constructor(){
        super();
        this.state ={
            signUpModalIsOpen : false,
            loginModalIsOpen : false,
            Email : '',
            FN : '',
            LN : '',
            Password : '',
            isLoggedIn :false

        }
    }

    handleIcon = () => {
        this.props.history.push(`/`);
    }

    signUp = () => {
        this.setState({signUpModalIsOpen : true});

    }

    signUpuser = () => {
        this.setState({loginModalIsOpen : false,
        signUpModalIsOpen : true});
    }

    login = () => {
        this.setState({loginModalIsOpen : true});

    }

    handleCancel = () => {
        this.setState({signUpModalIsOpen : false});
    }

    handleCancellogin = () => {
        this.setState({loginModalIsOpen : false});
    }

    handleChange = (event, state) => {
        this.setState({[state]: event.target.value});
    }

    handleChangelogin = (event,state) =>{
        this.setState({[state]: event.target.value}); 
    }

    handlesignup = () =>{
        const { Email, FN,LN,Password } = this.state;
        const signupObj = {
            email:Email,
            firstName:FN,
            lastName:LN,
            password:Password
        }

        axios({
            method:'POST',
            url:'http://localhost:3080/signup',
            headers:{ 'Content-Type' : 'application/json'},
            data:signupObj
        }).then(res => {
            if(res.data.message == 'user signed Up Successfully'){
                
                this.setState({ signUpModalIsOpen : false,
                    Email : '',
                    FN : '',
                    LN : '',
                    Password : ''
        
                });
                alert(res.data.message);
            }
        } )
            .catch(err => console.log(err))

    }

    handlelogin = () => {
        const { Email, Password } = this.state;
        const loginpObj = {
            email:Email,
            password:Password
        }

        axios({
            method:'POST',
            url:'http://localhost:3080/login',
            headers:{ 'Content-Type' : 'application/json'},
            data:loginpObj
            
        }).then(response => {
            if(response.data.message == "user Logged in Successfully"){
            
                this.setState({ 
                    isLoggedIn:response.data.isAuthenticated,
                    loginModalIsOpen : false,
                    Email : '',
                    Password : ''
                });
                alert(response.data.message);
                
            }
            else{
                alert("Incoorect email address or password")
                this.setState({ loginModalIsOpen : true,
                    Email : '',
                    Password : ''
        
                });
            }
            sessionStorage.setItem('isLoggedIn',response.data.isAuthenticated);
        } )
            .catch(err => console.log(err))

    }

    render(){
        const { signUpModalIsOpen, loginModalIsOpen, Email, FN, LN, Password } = this.state;
        return(
            <div>
                <div id="division1" className="container-fluid">
                    <div id="icon" onClick={this.handleIcon}>e!</div>
                
                    <div id="login" className="right-part">
                    <a className="anchor" onClick={this.login}>Login</a>
                    </div> 
                    <div id="account" className="left-part" >
                        <a className="anchor" onClick={this.signUp}>Create Account</a>
                    </div>
                    <Modal
                        isOpen={signUpModalIsOpen}
                        
                        style={customStyles}
                        
                        
                        >
                            
                        <div className="form-signin">
                        <div className="signUplogo">Food Shaala</div>
                        <h1 className="h2 mb-3">Please sign up</h1>

                        <label for="inputEmail" className="sr-only">Email address</label>
                        <input type="email" onChange={(event) => this.handleChange(event,'Email')} value={Email} id="inputEmail" class="form-control" placeholder="Email address" required autofocus></input>

                        <label for="inputFN" className="sr-only">First Name</label>
                        <input type="text" onChange={(event) => this.handleChange(event,'FN')} value={FN} id="inputFN" class="form-control" placeholder="First Name"></input>

                        <label for="inputLN" className="sr-only">Last Name</label>
                        <input type="text" onChange={(event) => this.handleChange(event,'LN')} value={LN} id="inputLN" class="form-control" placeholder="Last Name"></input>

                        <label for="inputPassword" class="sr-only">Password</label>
                        <input type="password" onChange={(event) => this.handleChange(event,'Password')} value={Password} id="inputPassword" class="form-control" placeholder="Password" required></input>

                        <button class="btn btn-lg btn-success btn-block signbutton" type="submit" onClick={this.handlesignup} >Sign up</button>
                        <button class="btn btn-lg btn-danger btn-block" type="submit" onClick={this.handleCancel}>Cancel</button>
                        </div>
                        
                        
                    </Modal>
                    <Modal
                        isOpen={loginModalIsOpen}
                        
                        style={customStyles}
                        
                        
                        >
                            
                        <div className="form-signin">
                        <div className="signUplogo">Food Shaala</div>
                        <h1 className="h2 mb-3">Please Login</h1>

                        <label for="inputEmail" className="sr-only">Email address</label>
                        <input type="email" value={Email} onChange={(event) => this.handleChangelogin(event,'Email')} id="inputEmail" class="form-control" placeholder="Email address" required autofocus></input>

                        

                        <label for="inputPassword" class="sr-only">Password</label>
                        <input type="password" value={Password} onChange={(event) => this.handleChangelogin(event,'Password')} id="inputPassword" class="form-control" placeholder="Password" required></input>

                        
                        

                        <button class="btn btn-lg btn-success btn-block signbutton" type="submit" onClick={this.handlelogin} >Login</button>
                        <button class="btn btn-lg btn-danger btn-block" type="submit" onClick={this.handleCancellogin}>Cancel</button>
                        <h4>Don't you have an account? <a onClick={this.signUpuser} >signUp</a></h4>
                        </div>
                        
                        
                    </Modal>
                   
                 </div>
            </div>
        )
    }
}

export default withRouter(Header);