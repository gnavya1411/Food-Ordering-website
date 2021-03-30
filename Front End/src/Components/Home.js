import React from 'react';
import '../Styles/Home.css';
import HomePart1 from './HomePart1';
import HomePart2 from './HomePart2';
import axios from 'axios';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            Locations : [],
            mealtypes : []
        }
    }

    componentDidMount(){
        sessionStorage.setItem('area',undefined);
        sessionStorage.setItem('city',undefined);
        
        axios({
            method :"GET",
            url:"http://localhost:3080/cities",
            headers: {'Content-Type' : 'application/json'}
        }).then(response => this.setState({ Locations : response.data.City }))
            .catch(err => console.log(err))

        axios({
            method : 'GET',
            url : 'http://localhost:3080/mealtypes',
            headers : {'Content-Type' : 'application/json'}
        }).then(response => this.setState({ mealtypes : response.data.MealType}))
            .catch(err => console.log(err))
    }
    
    render(){
        const { Locations, mealtypes } = this.state;
        return(
            <React.Fragment>
                <HomePart1 Locations={Locations}/>
                <HomePart2 mealtypes={mealtypes}/>
            </React.Fragment>
        )
    }
}

export default Home;