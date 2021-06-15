import React, { Component } from 'react';
import axios from 'axios';

class Header2 extends Component {
    constructor(props) {
        super(props)
        // console.log(this.props)
        this.onSubmitLogout = this.onSubmitLogout.bind(this);
    }
    onSubmitLogout(e) {
        e.preventDefault()
        
        axios.get('http://localhost:5000/logout')
            .then((res) => {
                // console.log(this.props);
                console.log(this.props.loginstatus());
                this.props.logout();
                console.log(this.props.loginstatus());
            }).catch((error) => {
                console.log(error)
            });

    }

    
    state = {}
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">

                    <a className="navbar-brand" href="/">Navbar</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">

                        <span className="navbar-toggler-icon"></span>

                    </button>

                    

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item active">

                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>

                            </li>

                            <li className="nav-item">

                                <a className="nav-link" href="/">Link</a>

                            </li>

                            <li className="nav-item dropdown">

                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                    Dropdown
                                    
</a>

                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <a className="dropdown-item" href="/">Action</a>

                                    <a className="dropdown-item" href="/">Another action</a>

                                    <div className="dropdown-divider"></div>

                                    <a className="dropdown-item" href="/">Something else here</a>

                                </div>

                            </li>

                            <li className="nav-item">

                                <a className="nav-link disabled" href="/">Disabled</a>

                            </li>

                        </ul>

                        <div className="login">
{/* 
                            <button type="button" className="btn  btn-round btn-primary my-2 my-sm-0 " id="login-button" data-toggle="modal" data-target="#loginModal">
                                Login
                                </button>


                            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header border-bottom-0">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-title text-center">
                                                <h4>Login</h4>
                                            </div>
                                            <div className="d-flex flex-column text-center">
                                                <form  onSubmit={this.onSubmit}>
                                                    <div className="form-group">
                                                        <input type="text" name="username" className="form-control" id="email1" value={this.state.name} onChange={this.onChangeUserName} placeholder="Enter username..." />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" name="password" className="form-control" id="password1" value={this.state.password} onChange={this.onChangePassword} placeholder="Your password..." />
                                                    </div>
                                                    <button type="submit" className="btn btn-info btn-block btn-round">Login</button>
                                                </form>



                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <button className="btn btn-success my-2 my-sm-0 " type="submit " id="signup-button ">Sign-Up</button>

                            </div> */}



                        <button type="button" onClick={this.onSubmitLogout} className="btn  btn-round btn-success my-2 my-sm-0 " id="logout-button" >
                                logout
                      </button>


                            {/* <div className="modal fade" id="signUpModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header border-bottom-0">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-title text-center">
                                                <h4>Sign-Up</h4>
                                            </div>
                                            <div className="d-flex flex-column text-center">
                                                <form onSubmit={this.onSubmitSignup}>
                                                    <div className="form-group">
                                                        <input type="text" name="username" className="form-control" id="email1" value={this.state.nameSignup} onChange={this.onChangeUserNameSignup} placeholder="Enter username..." />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="password" name="password" className="form-control" id="password1" value={this.state.passwordSignup} onChange={this.onChangePasswordSignup} placeholder="Your password..." />
                                                    </div>
                                                    <div id="user">

                                                        <label className="radio-inline" id="teacherInput">

                                                            <input type="radio" value="teacher" name="role"  checked={this.state.roleSignup === "teacher"} onChange={this.onRadioChange} id="teacherButton" />Teacher

                                            </label>

                                                        <label className="radio-inline" id="studentInput">

                                                            <input type="radio" value="student" name="role" checked={this.state.roleSignup === "student"} onChange={this.onRadioChange} id="studentButton" />Student

                                            </label>

                                                    </div>
                                                    <button type="submit" className="btn btn-info btn-block btn-round">Sign Up</button>
                                                </form>


                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <button className="btn btn-success my-2 my-sm-0 " type="submit " id="signup-button ">Sign-Up</button>

                            </div> */}
                        </div>
                    </div>



                </nav>
            </div>
        );
    }
}

export default Header2;