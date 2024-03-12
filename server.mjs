import express from 'express';
import * as fs from 'fs';

const app =express();

app.use(express.json());

import mysql from 'mysql2';

// connecting Database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "budgetbites",
    database: "budgetbites",
    multipleStatements: true
  });



//SETUP Testing Database

const droptables = fs.readFileSync('sqlScripts/droptables.sql').toString()
const createtables = fs.readFileSync('sqlScripts/tablescreate.sql').toString()
const adddata = fs.readFileSync('sqlScripts/adddata.sql').toString()


connection.query(droptables+createtables+adddata, (error, results, fields) => {
  if (error) {
    console.error('Error executing SQL command:', error.message);
  } else {
    console.log('SQL command executed successfully.');
    // Process the results if needed
    console.log(results);
  }
});






app.post("/testtable", async (req, res) => {
  try {
    const { name, address, country } = req.body;
    const [{ insertId }] = await connection.promise().query(
      `INSERT INTO testtable (name, address, country) 
      VALUES (?, ?,?)`,
      [name, address, country]
      );
      res.status(202).json({
        message: "User Created",
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  });


  
  app.post("/additem", async (req, res) => {
    console.log("AddItems")
    try {
      // const { id } = req.params;
      const { name_text, desc_text, price_text } = req.body;
      const [{ insertId }] = await connection.promise().query(
          `INSERT INTO items (name, description, category, price, count, expiration, location, status, img, listeddate)
          VALUES  
          (?,?, 'CATEGORY', ?, 1, '2024-12-31', 'LOCATION', 'Available', 'IMAGE', '2024-01-01')`, 
          [name_text, desc_text, price_text]
        );
      res.status(200).json({
        message: "Item Created",
      });

    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  });






  app.get("/testtable", async (req, res) => {
    try {
      const data = await connection.promise().query(`SELECT *  from testtable;`);
      res.status(200).json({
        testtable: data[0],
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  });
  
  app.get("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = await connection
        .promise()
        .query(`SELECT *  from testtable where id = ?`, [id]);
      res.status(200).json({
        user: data[0][0],
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  });
  
  
  app.get("/items/:itemID", async (req, res) => {
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


  app.get("/items", async (req, res) => {
    console.log('Items')
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












  app.patch("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address, country } = req.body;
      const update = await connection
        .promise()
        .query(
          `UPDATE testtable set name = ?, address = ?, country = ? where id = ?`,
          [ name, address, country,id]
        );
      res.status(200).json({
        message: "updated",
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  });
  
  app.delete("/user/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const update = await connection
          .promise()
          .query(
            `DELETE FROM  testtable where id = ?`,
            [id]
          );
        res.status(200).json({
          message: "deleted",
        });
      } catch (err) {
        res.status(500).json({
          message: err,
        });
      }
    });
  
  app.listen(5000, () => {
    console.log("Server listening in http://localhost:5000");
  });