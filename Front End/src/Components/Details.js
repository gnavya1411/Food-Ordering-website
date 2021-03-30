import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../Styles/Details.css';
import axios from 'axios';


class Details extends React.Component{
    constructor(){
        super();
        this.state = {
            restaurant:{}
        }
    }

    componentDidMount(){
        const restID = this.props.location.pathname.split('/')[2]; 
        axios({
            method:'GET',
            url:'http://localhost:3080/getResById/'+restID,
            headers: { 'Content-Type' : 'application/json'}
            }).then(response => this.setState({restaurant : response.data.restaurant[0]}))
            .catch(err => console.log(err))
    }

    Back = () => {
        this.props.history.push(`/`)
    }
    placeholder = () => {
        if (sessionStorage.getItem('isLoggedIn')){
                 this.props.history.push(`/placeorder`)
        }
        else{
            alert("Please Login to place the order");
        }
    }

    render(){
        const { restaurant } = this.state;
        return(
            <div style={{marginLeft:'25px',marginRight:'25px', marginTop:'15px'}}>
                {restaurant != null ?
                    
                        
                        <div className="container">
                            
                            <div className="tileComponent">
                                    <img className="img-responsive" src={require("../Images/detailsWalpa.jpg")}/>
                            </div>
                            <div className="top">
                                {restaurant.name} 
                            </div>
                            <br/>
                            
                            <Tabs>
                                <TabList>
                                <Tab><span className="overview" >Overview</span></Tab>
                                <Tab><span className="overview" >Contact</span></Tab>
                                </TabList>
                                <TabPanel>
                                    <div>
                                        <div className="about">About this Place</div>
                                        <br/>
                                        <div className="about">Cuisine</div>
                                        <div className="bakery">{restaurant.cuisine_type}</div>
                                        <br/>
                                        <div className="about">Average Cost</div>
                                        <div className="bakery">{restaurant.min_price}</div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div>
                                        <div className="about">Phone Number</div>
                                        <div className="digit"> { restaurant.contact_number} </div>
                                        <div className="header"> {restaurant.name} </div>
                                        <div className="address"> {restaurant.locality}</div>
                                    </div>
                                </TabPanel>
                                
                                
                                <div className="row">
                                        <button  className="btn btn-danger back " onClick={this.Back}>Back</button>&nbsp;&nbsp;
                                        <button  className="btn  btn-success placeholder " onClick={this.placeholder}>Placeorder</button>
                                </div> 
                            </Tabs>
                             
                        </div>  : null }
            </div>
        )
    }
}

export default Details;