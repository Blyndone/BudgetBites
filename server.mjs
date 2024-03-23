import express from 'express';
import * as fs from 'fs';

// const bcrypt = require('bcrypt');
// var cors = require('cors');
// const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

import mysql from 'mysql2';

//===========================================

// connecting Database

//===========================================
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'budgetbites',
  database: 'budgetbites',
  multipleStatements: true,
});

//===========================================

//SETUP Testing Database

//===========================================

const droptables = fs.readFileSync('sqlScripts/droptables.sql').toString();
const createtables = fs.readFileSync('sqlScripts/tablescreate.sql').toString();
const adddata = fs.readFileSync('sqlScripts/adddata.sql').toString();

connection.query(
  droptables + createtables + adddata,
  (error, results, fields) => {
    if (error) {
      console.error('Error executing SQL command:', error.message);
    } else {
      console.log('SQL command executed successfully.');
      // Process the results if needed
      console.log(results);
    }
  },
);

//===========================================

//INSERT
//Needed Functions
//Add User
//Add Item
//Add Listing
//===========================================

//==================
// Add New Item
// Input Form:
// name: name_text
// description: description_text
// category:
// price:
// count:
// expiration:
// location:
// status:
// img:
// listeddate:

//==================
app.post('/additem', async (req, res) => {
  console.log('AddItems');
  try {
    // const { id } = req.params;
    const { name_text, desc_text, price_text } = req.body;
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO items (name, description, category, price, count, expiration, location, status, img, listeddate)
          VALUES  
          (?,?, 'CATEGORY', ?, 1, '2024-12-31', 'LOCATION', 'Available', 'IMAGE', '2024-01-01')`,
      [name_text, desc_text, price_text],
    );
    res.status(200).json({
      message: 'Item Created',
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

//==================
// Add New User
// Input Form:
// username:
// password:
// email:
// userType:
// joinDate:
//==================

app.post('/adduser', async (req, res) => {
  console.log('addUser');
  console.log(req.body);
  try {
    // const { id } = req.params;
    const {
      user_text,
      pass_text,
      name_text,
      email_text,
      phone_text,
      zip_text,
      usertype_text,
      joindate_text,
    } = req.body;
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO users (username, password, name, email, phone, zip, usertype, joindate)
          VALUES  
          (?,?,?,?,?,?,?,?)`,
      [
        user_text,
        pass_text,
        name_text,
        email_text,
        phone_text,
        zip_text,
        usertype_text,
        joindate_text,
      ],
    );
    res.status(200).json({
      message: 'User Created',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
});

//==================
// Authentication
// Input Form:
// username:
// password:

//==================
app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  console.log('Auth');
  console.log(req.body);
  console.log(username, password);

  // Look up the user entry in the database
  // const user = db
  //   .get('users')
  //   .value()
  //   .filter((user) => email === user.email);
  const data = await connection
    .promise()
    .query(`SELECT *  from users where username = ?;`, [username]);
  console.log(data);
  console.log(data.length);

  // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password

  // // If found, compare the hashed passwords and generate the JWT token for the user
  // if (data.length === 1) {
  //   bcrypt.compare(password, user[0].password, function (_err, result) {
  //     if (!result) {
  //       return res.status(401).json({ message: 'Invalid password' });
  //     } else {
  //       let loginData = {
  //         email,
  //         signInTime: Date.now(),
  //       };

  //       const token = jwt.sign(loginData, jwtSecretKey);
  //       res.status(200).json({ message: 'success', token });
  //     }
  //   });
  //   // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
  // } else if (user.length === 0) {
  //   bcrypt.hash(password, 10, function (_err, hash) {
  //     console.log({ email, password: hash });
  //     db.get('users').push({ email, password: hash }).write();

  //     let loginData = {
  //       email,
  //       signInTime: Date.now(),
  //     };

  //     const token = jwt.sign(loginData, jwtSecretKey);
  //     res.status(200).json({ message: 'success', token });
  //   });
  // }
  res.status(200).json({ message: 'success', data });
});

//==================
// Add Listing
// Input Form:
// itemID:
// sellerID:
// createDate:

//==================

app.post('/addlisting', async (req, res) => {
  console.log('addlisting');
});

//===========================================

//QUERY
//Needed Functions
//Retrieve Full Item List
//Retrieve Item by Id
//Retrieve Password Hash
//Retrive Search Item List?
//Retrieve Reservations

//===========================================

//==================
// Get All Items
//==================
app.get('/getitems', async (req, res) => {
  console.log('get all items');
  try {
    const data = await connection.promise().query(`SELECT *  from items;`);
    res.status(200).json({
      items: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

//==================
// Get Items By Id
// Input Form:
// itemID: itemID
//==================
app.get('/getitems/:itemID', async (req, res) => {
  console.log('get items by id');
  try {
    const { itemID } = req.params;
    const data = await connection
      .promise()
      .query(`SELECT *  from items where itemID = ?`, [itemID]);
    res.status(200).json({
      items: data[0],
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

//==================
// Retrieve Password
//
//==================

app.get('/verifypassword/:password', async (req, res) => {
  console.log('retrieve password');
});

//==================
// Retrieve Reservations by UserID
// Input Form:
// userID:
// userType:
//==================

app.get('/getreservations/:userID', async (req, res) => {
  console.log('get reservations');
});

//===========================================

// UPDATE
// Update user Information
// Update Item Status
// Update Item Info
// Update Reservation Information

//===========================================

//==================
// Update User Information

// Input Form:
// userID:
// username:
// password:
// email:
//==================

app.patch('/updateuser/:userID', async (req, res) => {
  console.log('update user info');
});

//==================
// Update Item Status

// Input Form:
// itemID:
// status:
//==================

app.patch('/updateitemstatus/:itemID', async (req, res) => {
  console.log('update item status');
});

//==================
// Update Item Information

// Input Form:
// name:
// description:
// category:
// price:
// count:
// expiration:
// location:
// status:
// img:
// listeddate:
//==================

app.patch('/updateitem/:itemID', async (req, res) => {
  console.log('update item information');
});

//==================
// Update Reservation status

// Input Form:
// reservationID:
// status:

//==================

app.patch('/updatereservation/:itemID', async (req, res) => {
  console.log('update reservation status');
});

// EXAMPLE CODE FRAGMENT
// app.patch('/user/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, address, country } = req.body;
//     const update = await connection
//       .promise()
//       .query(
//         `UPDATE testtable set name = ?, address = ?, country = ? where id = ?`,
//         [name, address, country, id],
//       );
//     res.status(200).json({
//       message: 'updated',
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err,
//     });
//   }
// });

//===========================================

//DELETE
//Needed Functions
//Delete Item
//Delete Reservation

//===========================================

//==================
// Delete Item

// Input Form:
// itemID:
//==================

app.delete('/deleteitem/:itemid', async (req, res) => {
  console.log('delete item');

  // EXAMPLE CODE FRAGMENT
  // try {
  //   const { id } = req.params;
  //   const update = await connection
  //     .promise()
  //     .query(`DELETE FROM  testtable where id = ?`, [id]);
  //   res.status(200).json({
  //     message: 'deleted',
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     message: err,
  //   });
  // }
});

//==================
// Delete Reservation

// Input Form:
// reservationID:

//==================

app.delete('/deletereservation/:reservationid', async (req, res) => {
  console.log('delete reservation');

  // EXAMPLE CODE FRAGMENT
  // try {
  //   const { id } = req.params;
  //   const update = await connection
  //     .promise()
  //     .query(`DELETE FROM  testtable where id = ?`, [id]);
  //   res.status(200).json({
  //     message: 'deleted',
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     message: err,
  //   });
  // }
});

//==================
// Server Listen
//==================
app.listen(5000, () => {
  console.log('Server listening in http://localhost:5000');
});
