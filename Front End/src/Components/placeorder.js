import React from 'react';
import axios from 'axios';
import '../Styles/placeorder.css';

class Forms extends React.Component{
    constructor(){
      super();
      this.state= {
        orderId: Math.floor(Math.random()*10000),
        Name:'',
        Phone:'',
        Email:'',
        Address:'',
        Persons:0
      }
    }

    handleChange = (event,state) => {
      this.setState({
        [state] :event.target.value});
    }

    handleSubmit = () => {
      const { orderId, Name, Phone, Email, Address, Persons} = this.state;
      const orderObj = {
        Order_id:orderId,
        Name:Name,
        Phone:Phone,
        Email:Email,
        Address:Address,
        Number_of_Persons:Persons
      };
      axios({
        method:'POST',
        url:'http://localhost:3080/placeorder',
        headers:{ 'Content-Type' : 'application/json' },
        data:orderObj
      }).then(response =>{
          if(response.data.message == 'Order Placed Successfully'){
            alert(response.data.message);
          }
          (this.props.history.push('/'))
      })
      .catch(err => console.log(err))
    }

    handleCancel = () =>{
        this.props.history.push('/')
     }

    render(){
      const{ orderId,Name,Phone,Email,Address,Persons } = this.state;
        return(
            <div className="container">
                <div className="panel panel-success">
                <div className="panel-heading">
                        <h3>PLACE ORDER</h3>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                          <label className="control-label">Order_id:</label>
                          <input type="text" name="order_id" value={orderId} onChange={(event)=>this.handleChange(event,'orderId')} readOnly className="form-control"/>
                        </div>
                        
                        <div className="form-group">
                          <label className="control-label">Name:</label>
                          <input type="text" name="name" value={Name} onChange={(event)=>this.handleChange(event,'Name')}
                          className="form-control"/>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Phone:</label>
                          <input type="text" name="phone" value={Phone} onChange={(event)=>this.handleChange(event,'Phone')} className="form-control"/>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Email:</label>
                          <input type="text" name="email" value={Email} onChange={(event)=>this.handleChange(event,'Email')} className="form-control"/>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Address:</label>
                          <input type="text" name="address" value={Address} onChange={(event)=>this.handleChange(event,'Address')} className="form-control"/>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Number of Persons:</label>
                          <select name="person" className="form-control" value={Persons} onChange={(event)=>this.handleChange(event,'Persons')}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="3">4</option>
                              <option value="5">5</option>
                          </select>
                        </div>
                        <div>
                            <button className="btn btn-lg btn-success" onClick={this.handleSubmit}>Confirm Order</button>&nbsp;&nbsp;
                            <button className="btn  btn-lg btn-danger" onClick={this.handleCancel}>Cancel Order</button>
                        </div>
                    </div> 

                </div>
            </div>
        )
    }
 

}

export default Forms;

