# Charting the Olympics

## Setup and modules

This repository contains a Node application written using Express.js and Jade. The routes folder contains the JavaScript files for loading the web pages, and the views folder contains the Jade template files. To run, simply run the commands `npm install` (to install all of the required depenendices) and then `node app.js` to run the application on localhost.

## Objective

The motivation behind our project was to gain an understanding of how performance in the Olympics relates to general facts about countries such as population, crime rates, and other statistics. We wanted to enable users to view possible correlations between these data points, hopefully sparking some conversation or reflection on how these correlations may have come about. We wanted to create a very usable and intuitive web app that enabled the user to view these data relationships in a clean and elegant manner.

## Features

Our application has a few main features. The first feature is the homepage where the user will see sample graphs of relationships between country statistics and Olympic medal data. There will be a set of such graphs and every time the user loads the page, a different graph is shown. Another page allows users to interact with our database by taking their input and creating graphs for them. The application also has an about page that displays information about each of our team members. Finally, there is a contact page, where the user can submit feedback or questions and provide their emails for receiving a response. The list of feedback or comments submitted through the contact page is stored in a NoSQL database.

## Developing

The technology used in this application is a web stack built with JavaScript. We use an Express server with Node.js and our frontend is done with Jade. We have a MySQL instance set up on Amazon Web Services, and our NoSQL database is hosted on Firebase. We use Chart.js as our primary data visualization library. We also use Bootstrap for styling of our application.

## Database

We used a few complementary data sources in order to get data on different countries. We used the UN data website (found here http://data.un.org/Default.aspx), that hosts a bunch of databasees with all kinds of data points including literacy rate, population, crime rates, and more. We also scraped a report by UNESCO on global literacy rates. Our primary additional source of data was the many tables found in the UN data repository.

### Tools

Created with [Nodeclipse v0.5](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   
