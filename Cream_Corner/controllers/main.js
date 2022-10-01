import fs from 'fs'
import OrderModel from '../model/receipt.js';
import UserModel from '../model/user.js';

//Create Orders
export const createOrder = async (req, res) => {

  let {name, customer_number, chocoloate_blizzards, strawberry_sundaes, blueberry_shakes} = req.body

    let bliz_price = 7.98;
    let sundae_price = 5.99;
    let berry_shake_price = 5.49;
    let subtotal = 0;
    let customer_number_format = /^[0-9][0-9][-][A-Z][A-Z][-][0-9][0-9]$/;

//Validation for Customer Name and Number
    if(name.trim() == ''){  
      res.send("Invalid Customer Name")
    }else if(!customer_number_format.test(customer_number)){
        res.send('Invalid Customer Number format');
    }else{

      if(chocoloate_blizzards == ''){
        chocoloate_blizzards = 0
      }
  
      if(strawberry_sundaes == ''){
        strawberry_sundaes = 0
      }
  
      if(blueberry_shakes == ''){
        blueberry_shakes = 0
      }
      
      subtotal += chocoloate_blizzards*bliz_price;
      subtotal += strawberry_sundaes*sundae_price;
      subtotal += blueberry_shakes*berry_shake_price;
      let tax =  (subtotal * 13)/100;
      let total_cost = subtotal + tax;
  
    const newData = new OrderModel({
      name : name,
      customer_number : customer_number,
      chocoloate_blizzards : chocoloate_blizzards,
      strawberry_sundaes : strawberry_sundaes,
      blueberry_shakes: blueberry_shakes,
      sub_total : subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total_cost : total_cost.toFixed(2),
  });
  
  try {
     await newData.save();
    console.log(`Created Data`)
       res.redirect('/successSubmit')
  } catch (error) {
      res.status(404).json( {message : error.message} )
  }
    }

    //Validation for item quantities 
}

export const fetch = async (req, res) => {

    try {
        res.render('form')
    } catch (error) {
        res.status(404).json( {message : error.message} )
    }
}
export const logout = async (req, res) => {

    try {
        res.render('logout')
    } catch (error) {
        res.status(404).json( {message : error.message} )
    }
}
export const loginInterface = async (req, res) => {

    try {
        res.render('login')
    } catch (error) {
        res.status(404).json( {message : error.message} )
    }
}

export const success = async (req, res) => {
  
  try {
    res.render('success')
  } catch (error) {
    res.status(404).json( {message : error.message} )
  }
}
export const successSubmit = async (req, res) => {
  
  try {
    const fetchData = await OrderModel.findOne({}).sort({ 'createdAt' : -1 }).limit(1);
    // const fetchData = await OrderModel.find().sort({x:1});
    console.log(fetchData)
    res.render('successSubmit', {data : fetchData})
  } catch (error) {
    res.status(404).json( {message : error.message} )
  }
}

export const deletedMsg = async (req, res) => {
  
  try {
    res.render('delete')
  } catch (error) {
    res.status(404).json( {message : error.message} )
  }
}

//Admin Login/Logout 
export const login = async (req, res) => {
  const {username, password} = req.body
  try {
    const oldUser = await UserModel.findOne({ username });
      if (!oldUser) return res.status(404).send('Invalid User');

      if(password === oldUser.password){
        res.redirect('/dashboard')
      }else{
        res.send('Invalid Creds')
      }
      
    } catch (error) {
      res.status(404).json( {message : error.message} )
    }
  }
  export const dashboard = async (req, res) => {
    
    try {
      const data = await OrderModel.find()
      res.render('dashbord', {data : data})
    } catch (error) {
      res.status(404).json( {message : error.message} )
    }
  }

//View Orders 
export const fetchAllTransctions = async (req, res) => {

  try {
    const fetchData = await OrderModel.find()
    //console.log(OrderModel.db.name)  //.limit(how many data you want)
    // const print = fetchData.map((dataItem) => dataItem._id);
    // const print = fetchData.filter((dataItem) => dataItem.title === 'Adseeb');
    res.status(200).json(fetchData)
} catch (error) {
    res.status(404).json( {message : error.message} )
}
}

//Delete Orders
export const deleteRequest = async (req, res) => {
      const {id} = req.params
  try {
      const deleteData =  await OrderModel.deleteOne({_id: id})
      console.log(`deleted Data`)
      res.redirect('/deletedMsg')
  } catch (error) {
      res.status(404).json( {message : error.message} ) 
  }
}
