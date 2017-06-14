'use strict';
const express = require('express');
const router = express.Router();
const util = require('util');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const Promise = require('bluebird');
const moment = require('moment');
const passport = require('../middleware/passport');
const middleware = require('../middleware');
const Pgb = require('pg-bluebird');
var pgb = new Pgb();
var connects;


// create DB once server Starts

pgb.connect(connectionString)
  .then(function(connection) {
    connects = connection;
    return connection.client.query('CREATE TABLE IF NOT EXISTS test1 (id serial unique primary key, profile_id int, time_stamp text, project_name text, object text, description text, foreign key (profile_id) references profiles(id))');
  })
  .then(function(result) {
    connects.done();
  })
  .catch(function(error) {
    return error;
  });

router.route('/tree')
  .post(middleware.auth.verify, (req, res) => {

    // Post and Query Postgres DB
    var user_id = req.user.id;
    var time_stamp = moment().format('MMMM Do YYYY, h:mma');
    var project_name = req.body.projectName;
    var object = JSON.stringify(req.body.codeTree);
    var description = req.body.projectDescription;
    var cnn;

    pgb.connect(connectionString) 
      .then (function(connection) {
        cnn = connection;
        var uniqueName = connection.client.query("select id from test1 where project_name = '" + project_name + "'");
        return uniqueName;
      })
      .then(function(uniqueName) {
        // check if name exists
        if (uniqueName.rows.length > 0) {
          throw 'POST ERROR';
          cnn.done();
        } else {
          return cnn.client.query("insert into test1 (profile_id, time_stamp, project_name, object, description) values('" + user_id + "', '" + time_stamp + "', '" + project_name + "', '" + object + "', '" + description + "')");
        }
      })
      .then(function() {
        cnn.done();
        res.status(200).send(JSON.stringify(project_name));
      })
      .catch(function(error) {
        console.log('ERROR ON SERVER-SIDE POST REQUEST!', error);
        cnn.done();        
        res.status(500).send(error);
      });
  })

  //  get request calls for user ID first, then inserts to DB
  .get(middleware.auth.verify, (req, res) => {
    var user_id = req.user.id;
    var cnn;
    pgb.connect(connectionString)
      .then (function(connection) {
        cnn = connection;
        const query = cnn.client.query("select profiles.email, test1.time_stamp, test1.project_name, test1.object, test1.description from profiles join test1 on profiles.id = test1.profile_id where test1.profile_id ='" + user_id + "'");
        return query;
      })
      .then(function(query) {
        var resData = {user_name: req.user.display, query_rows: query.rows};
        return resData;
      })
      .then(function(responseData) {

        cnn.done();
        res.status(200).send(JSON.stringify(responseData));
      })
      .catch(function(error) {
        console.log('ERROR ON SERVER-SIDE GET REQUEST!', error);
        cnn.done();
        return res.status(500).json({success: false, fatal: err}); 
      });
  });

module.exports = router;

// DB queriers below.... DELETE when finished with project.
// select profiles.email, test5.object from profiles join test5 on profiles.id = test5.profile_id where test5.profile_id = 1;
// select profiles.email, test6.project_name, test6.object from profiles join test6 on profiles.id = test6.profile_id where test6.profile_id ='"+user_id+"';
//  select profiles.email, test5.object from profiles join test5 on profiles.id = test5.profile_id where test5.profile_id = ('1');
