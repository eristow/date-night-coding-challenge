/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

/**********************
 * Example get method *
 **********************/

app.get('/questions', function (req, res) {
  // Add your code here
  // res.json({success: 'get call succeed!', url: req.url});
  const questions = [
    'What’s your favorite book/movie of all time and why did it speak to you so much?',
    'What would you do if you had enough money to not need a job?',
    'Alternate sharing something you consider a positive characteristic of your partner. Share a total of five items.',
    'Name three things you and your partner appear to have in common.',
    'What are some accomplishments that you are really proud of?',
    'What is a relationship deal breaker for you?',
    'What roles do love and affection play in your life?',
    'What is your biggest irrational fear?',
    'Given the choice of anyone in the world, whom would you want as a dinner guest?',
    'What, if anything, is too serious to be joked about?',
    'If you could give everyone just one piece of advice, what would it be?',
    'Is what you’re doing now what you always wanted to do growing up?',
    'Is there something that you’ve dreamed of doing for a long time? Why haven’t you done it?',
    'How have you changed from when you were in high school?',
    'When did you last sing to yourself? To someone else?',
    'When do you feel most out of place?',
    'Your house, containing everything you own, catches fire. After saving your loved ones and pets, you have time to safely make a final dash to save any one item. What would it be? Why?',
    'What would constitute a “perfect” day for you?',
    'What is your biggest regret?',
    'What do you value most in a friendship?',
    'What’s something you’ve worked really hard for?',
    'What makes you feel accomplished?',
    'If you knew you were going to die in a year, what would you change about how you live?',
    'If a crystal ball could tell you the truth about yourself, your life, the future or anything else, what would you want to know?',
    'When did you last cry in front of another person? By yourself?',
    'Would you like to be famous? In what way?',
    'For what in your life do you feel most grateful?',
  ];
  res.json({
    questions,
  });
});

app.get('/questions/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

app.post('/questions', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

app.post('/questions/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put('/questions', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/questions/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/questions', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/questions/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
