<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/jacinyan/books-r-us">
    <img src="https://booksrus.netlify.app/assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BooksRUs</h3>

  <p align="center">
    An online bookstore built with React and Node
    <br />
    <br />
    <a href="https://booksrus.netlify.app">View Demo</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#app-structure">App Structure</a></li>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li><a href="#to-do">To-Do</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The idea behind the project is to reinforce and demonstrate my knowledge and skills in both frontend and backend development as a developer.

### App Structure

```bash
.
├── App.js
├── components
│   ├── Carousel
│   │   ├── index.jsx
│   │   └── index.scss
│   ├── CheckoutSteps.jsx
│   ├── Error.jsx
│   ├── Filter.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── ItemCard.jsx
│   ├── Layout.jsx
│   ├── Loader.jsx
│   ├── Meta.jsx
│   ├── Pagination.jsx
│   ├── PrivateRoute.jsx
│   ├── Rating.jsx
│   └── SearchBox.jsx
├── hooks
│   ├── useFetchState.js
│   └── useForm.js
├── images
│   └── banner.jpeg
├── index.js
├── index.scss
├── pages
│   ├── CartPage.jsx
│   ├── Home.jsx
│   ├── ItemDetails.jsx
│   ├── ItemEdit.jsx
│   ├── ItemsList.jsx
│   ├── Login.jsx
│   ├── OrderDetails.jsx
│   ├── OrdersList.jsx
│   ├── Payment.jsx
│   ├── PlaceOrder.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   ├── Shipping.jsx
│   ├── UserEdit.jsx
│   └── UsersList.jsx
├── redux
│   ├── actions
│   │   ├── cartActions.js
│   │   ├── itemActions.js
│   │   ├── orderActions.js
│   │   └── userActions.js
│   ├── constants
│   │   ├── cartConstants.js
│   │   ├── itemConstants.js
│   │   ├── orderConstants.js
│   │   └── userConstants.js
│   ├── reducers
│   │   ├── cartReducers.js
│   │   ├── itemReducers.js
│   │   ├── orderReducers.js
│   │   └── userReducers.js
│   └── store.js
└── utils
    └── addDecimals.js
```

### Tech Stack

- Client Side

  - React
  - Redux
  - Bulma (CSS framework)
  - Axios

  misc: react-toastify, react-transition-group, typewriter-effect

- Server Side

  - NodeJs
  - Express
  - Mongoose
  - jswonwebtoken + bcrypt

- DataBase
  - MongoDB Atlas (cloud db services)
- Deployment
  - The client side and the server side of the project are hosted on Netlify and Heroku respectively
- Version Control: Git and GitHub

<!-- FEATURES -->

## Features

- A **User** : 
  - is shown a variety of book items when visiting the HomePage.
  - Is able to perform a general search or an advanced search for certain items
  - Is able to add/remove items into/from a shopping cart
  - Is able to register and login to continue purchases
  - Is provided with options of either using debit/credit card or other payment services
  - has a module to keep track of his/her orders.
  - Can leave a review for his/her ordered items
  - is able to update his/her profile
  
- An **Admin** : 
  - has the overall control of the website

<!-- TODO -->

## To-Do
 Integration tests for state management logic refinement with Jest and Enzyme





