# Logify (DH2642 Project)

## How to use the app

The app can be found deployed [here](https://logify.netlify.app/home). Login using your own Spotify account or using our test account:

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

#view-folder:

-singleListView.js - view to display a single list, which can be the “Listen Later”-list as well as a user created list. From here, albums can be removed from the list and a Spotify playlist based on the albums contained in the list can be created for authorized user. 

-Router.js - this file controls which view is rendered based on current URL, using React Router. As such, it imports the various presenters and uses them as the component-prop.

-ResultsView.js - view that controls the content of the landing page, and as well the search results when the user initiates a search. As the user enters a search in the input field in the Navbar component, a request will be sent to various endpoints at the Spotify API, which in turn will return albums and artists, including a generated “top result” based on popularity. If no search has been initiated, the view will display curated new releases which is obtained through the Spotify API and updated continuously. 

-Navbar.js - header component of the app. Always stays visible at any point. It has three main sections, which includes the logo (which also acts as a home button), a search input bar to make searches for albums and artists, and a few links to various pages in the app, including authorization buttons to handle login/logout. 

-LogView.js - view to display the log, which acts as the personal diary of logged albums for the user. All logged albums are displayed in a table which can be sorted based on several criteria, and each logged albums can additionally be collapsed to display further information. When collapsed, logged albums can from here be added to lists, and there is also an option to open the Spotify desktop app and listen to the chosen album there. 

-ListView.js - view to display the users collection of lists, which includes the “Listen Later”-list as well as user created lists. All items are clickable, which would take the user to that the chosen specific list. 

-Footer.js - simple footer component. Fades out when the y-offset of the page is non-zero. 

-ArtistView.js - view to display information about one specific artist. On page load, various endpoints of the Spotify API will be queried and the response will be cleaned up to display a list of that artists albums. A list of related artists will also be rendered, for which the user can click on any related artist to get to that artists page. 

-App.js - main application file of the project. Responsible of rendering the Router-file as well as the Navbar and Footer respectively. Also makes continuous checks against the currently generated authorization token, to make sure that the page performs a logout once the expiry time has been reached. 

-AlbumView.js - view that renders information of one specific album. This includes an image of the album cover, title and artist information and a list of tracks. All tracks can be played using an embedded web audio player. The view also contains four buttons, responsible for adding that album to the log, adding the album to a list, adding the album to the specific “Listen Later”-list and opening the album in the Spotify desktop app. 

-UserInfo.js - component used for the log and lists to display user info regarding the number of logged albums, the last logged albums and the number of lists. Also contains the profile picture of the user, or a default picture for users without a profile picture. 

-LoadingSpinner.js - simple component which is visible during loading states at various places in the app.

-AddToLogComponent.js - popup component used to generate a diary entry for a specific album. The user gives the album a rating, and can optionally add a written review. Once the album is saved, the album can be seen in the log. 

-AddToListComponent.js - popup component used to add a specific album to a list. The user can either create a new list or add the album to an already existing list. The component contains error checks to make sure that two lists does not share the same name, and as well that one specific album is not added in the same list twice.

-App.scss - the sass file containing all css for the app

-index.js - renders the app

-store.js - redux store file, combining all slices

#presenters-folder:

  -AlbumPresenter.js - connecting album state to view, dispatches logs and list additions

  -ArtistPresenter.js - connecting artist state to view, dispatches album and artist info

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












