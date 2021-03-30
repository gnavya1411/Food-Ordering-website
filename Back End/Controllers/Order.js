const Order = require('../Models/Order');


exports.placeOrder = (req,res) => {
    const Order_id = req.body.Order_id;
    
    const Name = req.body.Name;
    const Phone = req.body.Phone;
    const Email = req.body.Email;
    const Address = req.body.Address;
    const Number_of_Persons = req.body.Number_of_Persons;
                    
    const OrderPlaced = new Order ({ Order_id: Order_id,
                                    
                                     Name: Name,
                                    Phone: Phone, 
                                     Email: Email,
                                     Address: Address,
                                     Number_of_Persons: Number_of_Persons });
    OrderPlaced.save().then(response => {
        res.status(200).json({message : "Order Placed Successfully", Order : response})
    }).catch(err =>{
        res.status(500).json({message : err})
    })
}