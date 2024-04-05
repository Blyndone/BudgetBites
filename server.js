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
    const {
      name_text,
      desc_text,
      price_text,
      user_id,
      img_select,
      category_text,
      msrp,
      expiration_text,
      count,
    } = req.body;
    var tmpdate = new Date();
    var duration = parseInt(expiration_text);
    tmpdate.setTime(tmpdate.getTime() + duration * 86400000);
    const expdate = tmpdate.toISOString().slice(0, 19).replace('T', ' ');
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let insertId = '';
    for (let index = 0; index < count; index++) {
      [{ insertId }] = await connection.promise().query(
        `INSERT INTO items (name, description, category, msrp, price, count, expiration, location, status, img, listeddate)
        VALUES  
        (?,?, ?, ?, ?, 1, ?, (SELECT locationname FROM users WHERE userID = ?), 'Available', ?, ?);
        
        INSERT INTO listing (itemID, sellerID, createDate)
        VALUES  
        ((SELECT LAST_INSERT_ID()),?,?)
        
        `,
        [
          name_text,
          desc_text,
          category_text,
          msrp,
          price_text,
          expdate,
          user_id,
          img_select,
          date,
          user_id,
          date,
        ],
      );
      // .query(
    }
    //   `INSERT INTO listing (itemID, sellerID, createDate)
    //     VALUES
    //     (?,?,?)`,
    //   [insertId, user_id, date],
    // );

    res.status(200).json({
      message: 'Item Created',
      data: insertId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
});
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
app.post('/reservation', async (req, res) => {
  console.log('add reservation');

  try {
    const { buyerID, itemID } = req.body;
    const joindate_text = new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    if (
      (
        await connection
          .promise()
          .query('SELECT status from items WHERE itemID = ?', [itemID])
      )[0][0].status == 'Available'
    ) {
      const [{ insertId }] = await connection.promise().query(
        `INSERT INTO reserved (buyerID, itemID, status, reservationDate)
        VALUES  
        (?,?,"reserved", ?);
        
        UPDATE items SET status = "Reserved" WHERE itemID = ?;   
        `,
        [buyerID, itemID, joindate_text, itemID],
      );
      res.status(200).json({
        message: 'Reservation Created',
      });
    }
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
    const { username, password, name, email, phone, zip, usertype, joindate } =
      req.body;

    // Check for duplicate user
    const [existingUsers] = await connection
      .promise()
      .query('SELECT * FROM users WHERE username = ? OR email = ?', [
        username,
        email,
      ]);

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Check if password is provided and not empty
    if (typeof password === 'undefined' || password === '') {
      console.error('Password is undefined or empty');
      return res.status(400).json({ message: 'Password is required' });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log({ username, password: hashedPassword });

    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO users (username, password, name, email, phone, zip, usertype, joindate)
          VALUES  
          (?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, name, email, phone, zip, usertype, joindate],
    );

    res.status(200).json({
      message: 'User Created',
      user_id: insertId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
});

//==================
// Add New Location
//==================

app.post('/location', async (req, res) => {
  console.log('addLocation');
  console.log(req.body);

  try {
    // const { id } = req.params;
    const {
      userID,
      locationName,
      locationAddress,
      locationCity,
      locationState,
      locationZip,
      locationPhone,
      locationEmail,
      locationWebsite,
    } = req.body;

    query = `INSERT INTO locations (sellerID, name, address, city, state, zip, phone_number, email, website)
VALUES 
(?,?,?,?,?,?,?,?,?)
`;

    const [{ insertId }] = await connection
      .promise()
      .query(query, [
        userID,
        locationName,
        locationAddress,
        locationCity,
        locationState,
        locationZip,
        locationPhone,
        locationEmail,
        locationWebsite,
      ]);
    res.status(200).json({
      message: 'location Created',
      user_id: insertId,
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
            user_id: data[0].userID,
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
app.get('/items', async (req, res) => {
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
// Get Location By Item Id
// Input Form:
// itemID: itemID
//==================
app.get('/location/:itemID', async (req, res) => {
  console.log('get location by id');
  try {
    const { itemID } = req.params;
    query = `SELECT 
    Loc.name, Loc.address, Loc.city, Loc.state, Loc.zip, Loc.phone_number, Loc.email, Loc.website
    
    FROM
    (((listing L JOIN users U ON L.sellerID = U.userID)
    JOIN items I ON I.itemID = L.itemID)
    JOIN locations Loc ON Loc.sellerID = U.userID)
     
    
    where I.itemID = ?`;

    const data = await connection.promise().query(query, [itemID]);
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

app.get('/reservations/:username', async (req, res) => {
  console.log('get items by username');

  try {
    const { username } = req.params;

    const query = `SELECT I.itemID, I.name, I.description, I.price, I.img, I.status, I.location, I.expiration, I.category FROM 
    items I JOIN 
    reserved R JOIN users U ON U.userID = R.buyerID
    ON I.itemid = R.itemID
    WHERE U.username = ?; 
    `;

    const data = await connection.promise().query(query, [username]);
    // console.log(data);
    res.status(200).json({
      items: data[0],
    });
    // console.log(data);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

//==================
// Retrieve Listing by username
// Input Form:
// userID:
// userType:
//==================

app.get('/listing/:username', async (req, res) => {
  console.log('get listing by username');

  try {
    const { username } = req.params;

    const query = `SELECT I.itemID, I.name, I.description, I.price, I.img, I.status, I.expiration, I.location, I.category, I.msrp FROM 
    items I JOIN 
    listing L JOIN users U ON U.userID = L.sellerID
    ON I.itemid = L.itemID
    WHERE U.username = ?; 
    `;

    const data = await connection.promise().query(query, [username]);
    // console.log(data);
    res.status(200).json({
      items: data[0],
    });
    // console.log(data);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
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

  // const saltRounds = 10; // Adjust the number based on the security requirements
  app.patch('/updateuser/:userID', async (req, res) => {
    console.log('update user info');
    try {
      const userID = req.params.userID;
      let { username, password, name, email, phone, zip, usertype, joindate } =
        req.body;

      // Hash the password if it's provided
      let hashedPassword = password;
      if (password && password.trim() !== '') {
        hashedPassword = await bcrypt.hash(password, saltRounds);
      }

      // Update the user details in the database
      const [updateResult] = await connection
        .promise()
        .query(
          'UPDATE users SET username = ?, password = ?, name = ?, email = ?, phone = ?, zip = ?, usertype = ?, joindate = ? WHERE userID = ?',
          [
            username,
            hashedPassword,
            name,
            email,
            phone,
            zip,
            usertype,
            joindate,
            userID,
          ],
        );

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error on update:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
});

//==================
// Update Item Status

// Input Form:
// itemID:
// status:
//==================

app.patch('/updateitemstatus/:itemID', async (req, res) => {
  console.log('update item status');

  try {
    const itemID = req.params.itemID;
    let status = req.body;
    const update = await connection
      .promise()
      .query('UPDATE items SET status = ? WHERE itemID = ?', [status, itemID]);

    if (update.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item status updated successfully' });
  } catch (error) {
    console.error('Error on update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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

  try {
    const itemID = req.params.itemID;
    let {
      name,
      description,
      category,
      price,
      count,
      expiration,
      location,
      status,
      img,
      listeddate,
    } = req.body;
    const update = await connection
      .promise()
      .query(
        'UPDATE items SET name = ?, description = ?, category = ?, price = ?, count = ?, expiration = ?, location = ?, status = ?, img = ?, listeddate = ? WHERE itemID = ?',
        [
          name,
          description,
          category,
          price,
          count,
          expiration,
          location,
          status,
          img,
          listeddate,
          itemID,
        ],
      );

    if (update.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item details updated successfully' });
  } catch (error) {
    console.error('Error on update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//==================
// Update Reservation status

// Input Form:
// reservationID:
// status:

//==================

app.patch('/updatereservation/:itemID', async (req, res) => {
  console.log('update reservation status');

  try {
    const reservationID = req.params.reservationID;
    let status = req.body;
    const update = await connection
      .promise()
      .query('UPDATE reserved SET status = ? WHERE reservationID = ?', [
        status,
        reservationID,
      ]);

    if (update.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res
      .status(200)
      .json({ message: 'Reservation status updated successfully' });
  } catch (error) {
    console.error('Error on update:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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

  // var userIds = ['3', '4', "4'6dsd"],
  //   result = userIds
  //     .map(function (a) {
  //       return "'" + a.replace("'", "''") + "'";
  //     })
  //     .join();

  // console.log(result);

  try {
    console.log(req.params.itemid);
    const itemID = [req.params.itemid];

    itemlist = String(itemID).split(',');

    console.log('Attempting to delete item with ID:', itemID);

    // Check if the item exists
    const [itemExists] = await connection
      .promise()
      .query('SELECT * FROM items WHERE itemID IN (?)', [itemlist]);
    if (itemExists.length === 0) {
      console.log('Item not found with ID:', itemID);
      return res.status(404).json({ message: 'Item not found' });
    }

    // If the item exists, delete any reservations referencing the item
    await connection
      .promise()
      .query('DELETE FROM reserved WHERE itemID IN (?)', [itemlist]);

    // Delete any listings referencing the item
    await connection
      .promise()
      .query('DELETE FROM listing WHERE itemID IN (?)', [itemlist]);

    // Finally, delete the item
    await connection
      .promise()
      .query('DELETE FROM items WHERE itemID IN (?)', [itemlist]);

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

app.delete('/reservation/:itemID', async (req, res) => {
  console.log('delete reservation');

  try {
    const itemID = req.params.itemID;
    console.log('Attempting to delete reservation with itemID:', itemID);

    // Check if the reservation exists before deleting
    const [reservation] = await connection
      .promise()
      .query('SELECT * FROM reserved WHERE itemID = ?', [itemID]);
    if (reservation.length === 0) {
      console.log('No reservation found with ID:', itemID);
      return res.status(404).json({ message: 'Reservation not found' });
    }
    query =
      'DELETE FROM reserved WHERE itemID = ?;   UPDATE items SET status = "Available" WHERE itemID = ? ';
    await connection.promise().query(query, [itemID, itemID]);
    console.log('Deleted reservation with itemID :', itemID);
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
