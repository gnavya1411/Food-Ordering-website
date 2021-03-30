import React from 'react';
import '../Styles/Search.css';
import axios from 'axios';
import queryString from 'query-string';

class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            restaurants:[],
            locationList:[],
            pageCount:[],
            location:undefined,
            cuisine:[],
            mealtype_id:undefined,
            hcost:undefined,
            lcost:undefined,
            page:1,
            sort:1
        }
    }
    componentDidMount(){
        const queryParams = queryString.parse(this.props.location.search);
        const mealtype_id =queryParams.mealtype;

        let filterObject = {
            "mealtype_id":String(mealtype_id)
            
            
        };
        
            axios({
                method:'POST',
                url:'http://localhost:3080/restaurantfilter',
                headers:{'Content-Type' : 'application/json'},
                data:filterObject
            })
            .then(res => this.setState({ restaurants : res.data.restaurant,
                                        pageCount:res.data.pageCount,
                                        "mealtype_id":String(mealtype_id)
                                       
                                    }))
            .catch(err => console.log(err))
            
            axios({
                method:'GET',
                url:'http://localhost:3080/cities',
                headers:{'Content-Type' : 'application/json'}
            })
            .then(res => this.setState({ locationList : res.data.City}))
            .catch(err => console.log(err))

    }

    handleClick = (Id) => {
        this.props.history.push(`/Details/${Id}`);
    }

    
    locationChange = (event) => {
        
        
        const area = event.target.value.split('-')[0];
        const city = event.target.value.split('-')[1];
        const { cuisine,  hcost, mealtype_id, lcost , page ,sort } = this.state;

         let   filterObject = {
                location_id:area,
                mealtype_id:mealtype_id,
                cuisine_id:cuisine.length != 0 ? cuisine:undefined,
                hcost:hcost,
                lcost:lcost,
                sort:sort,
                page:page
            };
        
        this.props.history.push(`/Search/?area=${area}&cuisine=${cuisine}&mealtype=${mealtype_id}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);
        
        axios({
            method:'POST',
            url:'http://localhost:3080/restaurantfilter',
            headers:{'Content-Type' : 'application/json'},
            data:filterObject
        })
        .then(res => this.setState({ restaurants : res.data.restaurant, pageCount:res.data.pageCount, location:area }))
        .catch(err => console.log(err))
    }

    sortChange = (sortid) => {
        const { location,cuisine,hcost,lcost,page } = this.state ;

        let   filterObject = {
            location:location,
            cuisine_id:cuisine.length != 0 ? cuisine:undefined,
            hcost:hcost,
            lcost:lcost,
            sort:Number(sortid),
            page:page
        };

        this.props.history.push(`/Search/?area=${location}&cuisine=${cuisine}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sortid}`);
        axios({
            method:'POST',
            url:'http://localhost:3080/restaurantfilter',
            headers:{'Content-Type' : 'application/json'},
            data:filterObject
        }).then(res => this.setState({ restaurants : res.data.restaurant, sort:Number(sortid),pageCount:res.data.pageCount }))
            .catch(err => console.log(err))
    }

    costChange = (lcost,hcost) => {
        const { location,cuisine,sort,page } = this.state ;

        let   filterObject = {
            location_id:location,
            cuisine_id:cuisine.length != 0 ? cuisine:undefined,
            hcost:Number(hcost),
            lcost:Number(lcost),
            sort:sort,
            page:page
        };

        this.props.history.push(`/Search/?area=${location}&cuisine=${cuisine}&costlessthan=${Number(hcost)}&costmorethan=${Number(lcost)}&page=${page}&sort=${sort}`);
        axios({
            method:'POST',
            url:'http://localhost:3080/restaurantfilter',
            headers:{'Content-Type' : 'application/json'},
            data:filterObject
        }).then(res => this.setState({ restaurants : res.data.restaurant,
                                        lcost:Number(lcost),
                                        hcost:Number(hcost), 
                                        pageCount:res.data.pageCount }))
            .catch(err => console.log(err))
    }

    cuisineChange = (cuisineid) => {
        const { location,cuisine,hcost,lcost,sort,page } = this.state ;

        if (cuisine.indexOf(cuisineid) == -1){
            cuisine.push(cuisineid);
        }
        else{
            var index = cuisine.indexOf(cuisineid);
            cuisine.splice(index,1);
        }

        let   filterObject = {
            location_id:location,
            cuisine_id:cuisine.length != 0 ? cuisine:undefined,
            hcost:hcost,
            lcost:lcost,
            sort:sort,
            page:page
        };

        this.props.history.push(`/Search/?area=${location}&cuisine=${cuisine}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);

        axios({
            method:'POST',
            url:'http://localhost:3080/restaurantfilter',
            headers:{'Content-Type' : 'application/json'},
            data:filterObject
        }).then(res => this.setState({ restaurants : res.data.restaurant, pageCount:res.data.pageCount, cuisine:cuisine }))
            .catch(err => console.log(err))
    }

    pageChange = (pageNumber) => {
        const page = pageNumber;
        const { location,cuisine,hcost,lcost,sort } = this.state ;

        let   filterObject = {
            location_id:location,
            cuisine_id:cuisine.length != 0 ? cuisine:undefined,
            hcost:hcost,
            lcost:lcost,
            sort:sort,
            page:page
        };

        this.props.history.push(`/Search/?area=${location}&cuisine=${cuisine}&costlessthan=${hcost}&costmorethan=${lcost}&page=${page}&sort=${sort}`);

        axios({
            method:'POST',
            url:'http://localhost:3080/restaurantfilter',
            headers:{'Content-Type' : 'application/json'},
            data:filterObject
        })
        .then(res => this.setState({ restaurants : res.data.restaurant, pageCount:res.data.pageCount, page:page }))
        .catch(err => console.log(err))
     }


    

    render(){
        const { restaurants,locationList, pageCount ,sort} = this.state;
        return(
            <div >
                <div >
                    <div id="myId" className="heading">Restaurant Places</div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4 col-md-4 col-lg-4 filter-options" >
                                <span className="glyphicon glyphicon-th-list toggle-span" data-toggle="collapse"
                                    data-target="#demo"></span>
                                <div id="demo" className="collapse show">
                                    <div className="filter-heading">Filters</div>
                                    <div className="Select-Location">Select Location</div>
                                    <select className="Rectangle-2236" onChange={(event) => this.locationChange(event)}>
                                        <option hidden >Select</option>
                                        {locationList.map((item) =>{
                                            return <option value={`${item.locationId}-${item.cityId}`}>{`${item.locality}, ${item.cityName}`}</option>
                                        })}
                                    </select>
                                    <div className="Cuisine">Cuisine</div>
                                    <div className="CuisineDiv">
                                        <input type="checkbox" value="1" onChange={() =>this.cuisineChange('1')}/>
                                        <span className="checkbox-items">North Indian</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="checkbox" value="2" onChange={() =>this.cuisineChange('2')}/>
                                        <span className="checkbox-items">South Indian</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="checkbox" value="3" onChange={() =>this.cuisineChange('3')}/>
                                        <span className="checkbox-items">Chineese</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="checkbox" value="4" onChange={() =>this.cuisineChange('4')}/>
                                        <span className="checkbox-items">Fast Food</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="checkbox" value="5" onChange={() =>this.cuisineChange('5')} />
                                        <span className="checkbox-items">Street Food</span>
                                    </div>
                                    <div className="Cuisine">Cost For Two</div>
                                    <div className="CuisineDiv">
                                        <input type="radio" name="cost" onChange={() =>this.costChange('1','500')} />
                                        <span className="checkbox-items">Less than &#8377; 500</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="radio"name="cost" onChange={() =>this.costChange('501','1000')}/>
                                        <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="radio" name="cost" onChange={() =>this.costChange('1001','1500')} />
                                        <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="radio" name="cost" onChange={() =>this.costChange('1501','2000')}/>
                                        <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="radio" name="cost" onChange={() =>this.costChange('2001','10000')}/>
                                        <span className="checkbox-items">&#8377; 2000 to &#8377; 10000</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="radio" name="cost" onChange={() =>this.costChange('1','10000')}/>
                                        <span className="checkbox-items"> All </span>
                                    </div>
                                    <div className="Cuisine">Sort</div>
                                    <div className="CuisineDiv">
                                        <input type="radio" name="sort" onChange={() =>this.sortChange('1')} />
                                        <span className="checkbox-items">Price low to high</span>
                                    </div>
                                    <div className="CuisineDiv">
                                        <input type="radio" name="sort" onChange={() =>this.sortChange('-1')}/>
                                        <span className="checkbox-items">Price high to low</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-8 col-md-8 col-lg-8 right-Block scroll">
                                {restaurants.length > 0 ? restaurants.map((item) => {
                                    return<div className="Item" onClick={() => this.handleClick(item.resId)}>
                                                <div className="row">
                                                    <div className="col-sm-4 col-md-4 col-lg-4">
                                                        <img className="img" src={require("../Images/breakfast.jpg")} />
                                                    </div>
                                                    <div className="col-sm-8 col-md-8 col-lg-8">
                                                        <div className="rest-name">{item.name}</div>
                                                        <div className="res-location">FORT</div>
                                                        <div className="rest-address">{item.locality}</div>
                                                    </div>
                                                </div>
                                                <hr className="horizonta-line"/>
                                                <div className="row padding-left">
                                                    <div className="col-sm-12 col-md-12 col-lg-12">
                                                        <div className="rest-address">CUISINES : {item.cuisine_type}</div>
                                                        <div className="rest-address">COST FOR TWO : &#8377; {item.min_price}</div>
                                                    </div>
                                                </div>
                                            </div> 
                                    } ) : <div className='noData'>No Data Found</div>}
                                
                                
                                <div className="pagination">
                                    <a href="#">&laquo;</a>

                                    { pageCount.map((item) =>{
                                        return <a href="#" onClick={()=>{this.pageChange(item)}}>{item} </a>
                                    }) }

                                    <a href="#">&raquo;</a>
                                </div>
                            </div>
                        </div>
        </div>
    </div>
            </div>
        )
    }
}

export default Search;