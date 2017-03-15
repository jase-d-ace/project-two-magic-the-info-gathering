# Turtle Project Two: Magic: the Info Gathering
## by Jason Andrada
My second solo project. Edited to show persisting problems.

## Heroku App
[Heroku](lit-springs-78817.herokuapp.com)

## Expected Behaviors
* Full CRUD functionality
* Operational API calls to my own API and to the Magic: the Gathering API
* MVC architecture using modularized models, controllers and views
* ReSTful routing convention
* Idea is to be a deck building app

## Persisting Problems
* API Limitation is that I couldn't account for double-sided cards because each face was treated as its own separate entry with no way to join them
* Issue with persistent login - having to log in again and again
* Responsive design didn't happen

## Techs used
* Front End: HTML, CSS, JavaScript
    * for JavaScript, specifically focusing on AJAX (therefore jQuery by extension)
* Back End: Express, Node, PG-Promise, Body-Parser
* Database: pSQL
* Morgan.js as a logging tool to keep track of AJAX calls
* Passport.js and standard Bcrypt for authentication

## Wireframes

* [Landing Page](https://wireframe.cc/N43aGu)
* [Card Search Page](https://wireframe.cc/S8nGSV)
* [Card Show Page](https://wireframe.cc/hihj9U)
* [Deck Index Page](https://wireframe.cc/pnbgKm)
* [Deck Show Page](https://wireframe.cc/pnbgKm)


## User Stories
* As someone who hasn't played Magic: the Gathering, I'd like to look at all of the cards and see which ones I like
* As someone who has played M:tG, I want to keep up with all of the latest cards
* As someone who just likes cool art, I want to look at all of the awesome Magic artwork