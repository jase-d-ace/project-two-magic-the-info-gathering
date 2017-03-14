# Turtle Project Two: Magic: the Info Gathering
## by Jason Andrada
My second solo project. This proposal doesn't currently take into account reach goals. These are only MVP features

## Expected Behaviors
* Full CRUD functionality
* Operational API calls to my own API and to the Magic: the Gathering API
* MVC architecture using modularized models, controllers and views
* ReSTful routing convention
* Idea is to be a deck building app

## Perceived Problems
* Time constraints - I don't see this project being particularly DIFFICULT (not to say that it won't be challenging), but my main worry is that this will take a whoooooooooooooooooooooooole lot of time.
* Dual AJAX calls might be a small issue if I'm not careful with which API I'm hitting with each one.
* The Magic: the Gathering API is a little wonky, and the data I get back (according to POSTMAN) is formatted a little strangely
* Two models that work with two tables that will eventually join will be a bit of a challenge.

## Techs used
* Front End: HTML, CSS, JavaScript
    * for JavaScript, specifically focusing on AJAX (therefore jQuery by extension)
* Back End: Express, Node, PG-Promise, Body-Parser
* Database: pSQL
* Morgan.js as a logging tool to keep track of AJAX calls

## Wireframes

[Landing Page](https://wireframe.cc/N43aGu)
[Card Search Page](https://wireframe.cc/S8nGSV)
[Card Show Page](https://wireframe.cc/hihj9U)
[Deck Index Page](https://wireframe.cc/pnbgKm)
[Deck Show Page](https://wireframe.cc/pnbgKm)


## User Stories
* As someone who hasn't played Magic: the Gathering, I'd like to look at all of the cards and see which ones I like
* As someone who has played M:tG, I want to keep up with all of the latest cards
* As someone who just likes cool art, I want to look at all of the awesome Magic artwork