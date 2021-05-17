# Logify (DH2642 Project)

## How to use the app

The app can be found deployed here [here](https://logify.netlify.app/home). Login using your own Spotify account or using our test account:

user: `dh2642logify@gmail.com`

pass: 2021logify!

PS. To be able to make post requests to Spotify, the token used from Spotify grant us authority to alter playlists on accounts. We handle this carefully, but use the test account if there is any doubt DS.

## Short description of the project

An app called Logify where a user can log his/her music listening as a sort of music diary. Also rate and review albums and create personalized lists. The app will utilize Spotifys Web API, which means that users will login to the app using their Spotify account.
The user will first be greeted with a home view, which encourages the user to login. At login, the user will first be routed to a Spotify authorization URL and then redirected back to the home view on a successful login attempt. The user can now make searches against Spotifys Search API endpoint, which will display filtered and sorted results of albums and artists, including a selected top result based on popularity. If an album among the search results is clicked on, the user will be taken to that specific albums view, where the user have the possibility to add that album to his or her log, or to a given list.

The log and the lists each have their own views. The log view gives the user the option to sort the diary based on multiple parameters. The list view displays the collections of lists for the user. Lists can be updated and deleted, and new lists can be created. The user can also save lists as Spotify playlist. The main navigation of the app is controlled by a navbar component which is always visible at the top of the page.

## What we have done

The Spotify API has been integrated, which means that a user can login using their Spotify account. Once logged in, the user can make a search which sends and curates the responses from several endpoints, filters the results and displays a sorted selection of them. Results are divided into albums and artists, including a selected top result. At current, only the albums are clickable due to the artist view not having been implemented yet.

The views for specific albums and for the log have been started, and the user can add albums to the log. However the functionality is currently limited, as the user can’t rate or review their logs as of yet, or make updates to currently logged albums. The navbar component is essentially completed, and holds links to the main components of the app as well as the search input bar. Some small details remain, for example to hide the search bar when the user has not logged in yet.

For application-level state handling we are using Redux, which has been fully implemented in the app. Specifically, we are using Redux Toolkit and their “slice-feature” for more concise boilerplate code. To persist state in the app, and as well to handle multiple users to carry their individual logs and lists, we have configured Firebase Firestore in the app, which currently persists the users log, and will in the future also store the users lists.

In terms of styling, the overall layout and color profile has been implemented using the preprocessor scripting language Sass, which the compiles into CSS. There are still lots of styling work to do, especially around adjusting the app to different screens. Currently, the styling is solely structured to work well on laptop and/or desktop screens.

## What we still have to do

Most of the views that we have implemented still needs some style work and additional functionality. The album view will be more fleshed out in the final iteration of the app, where an additional popup will act as inbetween step in adding a specific album to the log or a given list. All functionality that involves lists is still on the to-do list, and the log view will in the final version be more interactive and dynamic. In the search result, the artists will be clickable, which means that an artist view will also be created. Here the user can browse the albums of that specific artist.

A loading spinner will be implemented, which will make the user experience better, as it will wait for requests to finish before rendering main views.

## Our project file structure

The file structure follows create-react-app. In the scr-folder we have structured the code following the mvp design pattern with a folder for views, for presenters, and folders for redux state handling. Each view has a presenter and a redux slice handling state. We use connect to link presenter, redux and view. We persit the data using Google Firestore. Here we store the user modified data. We use the Redux Toolkit-slices, where each slice acts as a bundle of actions and a reducer for the application, which are then combined in the store.js file located in the main src-folder. We use react-router-dom tools for navigation. 

Each file and what the do:

App.scss - the sass file containing all css for the app

fonts-folder - the font used for the app

index.js - 


