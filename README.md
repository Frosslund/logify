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

## Our project file structure

The file structure follows create-react-app. In the scr-folder we have structured the code following the mvp design pattern with a folder for views, for presenters, and folders for redux state handling. Each view has a presenter and a redux slice handling state. We use connect to link presenter, redux and view. We persit the data using Google Firebase Firestore. Here we store the user modified data. We use the Redux Toolkit-slices, where each slice acts as a bundle of actions and a reducer for the application, which are then combined in the store.js file located in the main src-folder. We use react-router-dom tools for navigation. 

Each file and what the do:

-App.scss - the sass file containing all css for the app

-index.js - renders the app

-store.js - redux store file, combining all slices

#presenters-folder:

  -AlbumPresenter.js - connecting album state to view, dispatches logs and list additions

  -ArtistView.js - connecting artist state to view, dispatches album and artist info

  -ListPresenter.js - connecting list state to view, dispatches current list

  -LogPresenter.js - connecting log state to view, dispatches album and artist info and logs and list additions

  -NavbarPresenter.js - connecting user state to view, dispatches search queries and login details

  -ResultsPresenter.js - connecting search state to view, dispatches album, artist info and logs

  -SinglelistPresenter.js - connecting list state to view, dispatches create lists, edit lists

#slices-folder:

  -albumSlice.js - redux handling of state concerning album information, this state gets persisted

  -artistSlice.js - redux handling of state concerning artist information

  -listSlice.js - redux handling of state concerning list information, this state gets persisted

  -logSlice.js - redux handling of state concerning log information, this state gets persisted

  -searchSlice - redux handling of state concerning search information

  -userSlice - redux handling of state concerning user data information, fetched on reload
  
#utils-folder:

-api.js - get and post functions using axios for more convinient api calls

-calcRunningTime.js - helper function

-firebaseConfig.js - handles Firestore connection and update

-getParamValues.js - helper function when connecting to Spotify

-handleLogin.js - helper function when connecting to Spotify

-handleUser.js - deals with syncing user to Firestore

-RedirectPage.js - helps with redirect when connecting to Spotify

-setAuthHeader.js - helper function for authentification when making api calls

#fonts-folder - the font used for the app












