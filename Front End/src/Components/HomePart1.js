import React from 'react';
import '../Styles/Home.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class HomePart1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            suggestions:[],
            text:'',
            restaurants:[]
        }
    } 

    onTextChange = (e) => {
        const value = e.target.value;
        const { restaurants} = this.state;
        let suggestions = [];

        if(value.length > 0){
            suggestions = restaurants.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        }
        this.setState(() => ({
            suggestions:suggestions,
            text:value
        }))
    }

    selectedText = (itemObj) =>{
        this.setState({
            text:itemObj.name,
            suggestions:[],
        }, () => {
            this.props.history.push(`/Details/${itemObj.resId}`)
        })
    }

    renderSuggestions = () => {
        let { suggestions} = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return(
            <ul>
                {
                    suggestions.map((item,index) => ( <li key={index} onClick={() => this.selectedText(item)}> {item.name} </li>))
                }
            </ul>
        )
    };

   

    handleDropdown = (event) => {
        const area = event.target.value.split('-')[0];
        const city = event.target.value.split('-')[1];

        sessionStorage.setItem('area', area);
        sessionStorage.setItem('city', city);

        axios({
            method:'GET',
            url:`http://localhost:3080/RestByCity/${area}`,
            headers:{'Content-Type': 'application/json'}
        }).then(res => this.setState({restaurants: res.data.Restaurant}))
            .catch(err => console.log(err))

    }

    render(){
        const { Locations } = this.props;
        const {text } =this.state;
            
        return(
            <div>
                <img src={require("../Images/homepageimg.png")} style={{ width:'100%', height:'450px', margin:'auto'}} />
                <div>
                    <div className="logo">
                        <b>e!</b>
                    </div>
                    <div className="headings">
                        Find the best restaurants, cafés, and bars!
                    </div>
                    <div className="locationSelector" >
                        <select className="locationDropdown" onChange={this.handleDropdown}>
                            <option value="0" selected disabled> Select Location </option>
                            {Locations.map((item, index) => {
                                    return <option key={index} value={item.cityName}>{`${item.locality}, ${item.cityName}`}</option>
                            })}
                        </select>
                        <div  className="notebooks">
                            
                            <input id="query " type="text" className="restaurantsinput" value={text} onChange={this.onTextChange} placeholder="Please Enter Restaurant Name"/>
                             {this.renderSuggestions()}
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HomePart1);