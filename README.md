# README

Welcome to my CRUD single page app developed with Ruby on Rails for the backend and ReactJS for the frontend. It was fun to create my first API to consume it in the frontend and a good learning experience.


* Ruby version 3.1.1

* Configuration - You should have installed Ruby on Rails and also Node.JS as it has the NPM and Yarn package management.
    
    Run `bundle install` and `npm install` to install all dependencies for this project, if any problem is encountered run `yarn install` 

* Database information
    
    I've uploaded the DB used while developing so that you can play with it easily, for information about how to change the DB read the next point.
* Database initialization

    You need to go to [seed file](/db/seeds.rb) and input the data you want to seed the DB with, I recommend to seed both tables at once and then run `rails db:seed` in your rails console.

* How to run the test suite
    
    Unfortunately the test suite hasn't been developed due to unforeseen errors.

* How to run this CRUD SPA?
  
  Simply type `rails s` on your rails console and go to localhost:3000 or the link given in the rails console.