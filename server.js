// import express from 'express';
// import * as fs from 'fs';
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
var cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

// import mysql from 'mysql2';
const mysql = require('mysql2');
//===========================================

// connecting Database

//===========================================
const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});
const saltRounds = 10;

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

    const hashedpass = await bcrypt.hash(pass_text, saltRounds);
    console.log({ user_text, password: hashedpass });

    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO users (username, password, name, email, phone, zip, usertype, joindate)
          VALUES  
          (?,?,?,?,?,?,?,?)`,
      [
        user_text,
        hashedpass,
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
app.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;
  console.log('Authenticate');

  const [data, fields] = await connection
    .promise()
    .query(`SELECT *  from users where username = ?;`, [username]);

  if (data.length === 1) {
    result = bcrypt.compare(password, data[0].password).then((result) => {
      if (!result) {
        console.log('Invalid password');
        return res.status(401).json({ message: 'Invalid password' });
      } else {
        let loginData = {
          username,
          signInTime: Date.now(),
        };

        const token = jwt.sign(username, process.env.jwtSecretKey);

        res.status(200).json({
          token: token,
          message: 'Correct Password',
          data: {
            user_name: data[0].username,
            user_type: data[0].usertype,
          },
        });
      }
    });
  } else if (data.length === 0) {
    console.log('User Not Found');
    res.status(500).json({ message: 'User Not Found' });
  }
});

//==================
// Authorize
// Input Form:
// username:
// jwt

//==================
app.post('/auth', async (req, res) => {
  try {
    const { user_text, token } = req.body;
    if (token != null) {
      console.log('Auth');
      console.log(user_text, token);
      console.log(jwt.verify(token, process.env.jwtSecretKey));
      if (jwt.verify(token, process.env.jwtSecretKey) == user_text) {
        console.log('Correct Token');
        try {
          const data = await connection
            .promise()
            .query(
              `SELECT usertype  from users where username = ?;`,
              user_text,
            );

          res.status(200).json({
            message: 'Correct Token',
            status: 'Accepted',
            data: {
              user_name: user_text,
              user_type: data[0][0].usertype,
            },
          });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      res.status(500).json({ message: 'No Token', status: 'Rejected' });
      console.log('No Token Provded');
    }
  } catch (err) {
    res.status(500).json({ message: 'Incorrect Token', status: 'Rejected' });
    console.log(err);
  }
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

app.delete('/items/:itemid', async (req, res) => {
  console.log('delete item');

  try {
    const itemID = req.params.itemid;
    console.log('Attempting to delete item with ID:', itemID);

    // Check if the item exists
    const [itemExists] = await connection
      .promise()
      .query('SELECT * FROM items WHERE itemID = ?', [itemID]);
    if (itemExists.length === 0) {
      console.log('Item not found with ID:', itemID);
      return res.status(404).json({ message: 'Item not found' });
    }

    // If the item exists, delete any reservations referencing the item
    await connection
      .promise()
      .query('DELETE FROM reserved WHERE itemID = ?', [itemID]);

    // Delete any listings referencing the item
    await connection
      .promise()
      .query('DELETE FROM listing WHERE itemID = ?', [itemID]);

    // Finally, delete the item
    await connection
      .promise()
      .query('DELETE FROM items WHERE itemID = ?', [itemID]);

    console.log('Item with ID:', itemID, 'has been deleted successfully.');
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error:', err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});

//==================
// Delete Reservation

// Input Form:
// reservationID:
//fetch call:
//DELETE
//http://localhost:5000/deletereservation/1
//==================

app.delete('/reservation/:reservationID', async (req, res) => {
  console.log('delete reservation');

  try {
    const reservationID = req.params.reservationID;
    console.log('Attempting to delete reservation with ID:', reservationID);

    // Check if the reservation exists before deleting
    const [reservation] = await connection
      .promise()
      .query('SELECT * FROM reserved WHERE reservationID = ?', [reservationID]);
    if (reservation.length === 0) {
      console.log('No reservation found with ID:', reservationID);
      return res.status(404).json({ message: 'Reservation not found' });
    }

    await connection
      .promise()
      .query('DELETE FROM reserved WHERE reservationID = ?', [reservationID]);
    console.log('Deleted reservation with ID:', reservationID);
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    console.error('Error:', err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});

//==================
// Delete Listing

// Input Form:
// reservationID:
//fetch call:
//DELETE
//http://localhost:5000/deletereservation/1
//==================

app.delete('/listing/:listingID', async (req, res) => {
  console.log('delete listing');

  try {
    const listingID = req.params.listingID;
    console.log('Attempting to delete listing with ID:', listingID);

    // Check if the listing exists before deleting
    const [listing] = await connection
      .promise()
      .query('SELECT * FROM listing WHERE listingID = ?', [listingID]);
    if (listing.length === 0) {
      console.log('No listing found with ID:', listingID);
      return res.status(404).json({ message: 'Listing not found' });
    }

    await connection
      .promise()
      .query('DELETE FROM listing WHERE listingID = ?', [listingID]);
    console.log('Deleted listing with ID:', listingID);
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error('Error:', err);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
  }
});

//==================
// Server Listen
//==================
app.listen(process.env.PORT, () => {
  console.log('Server listening in http://localhost:5000');
});
