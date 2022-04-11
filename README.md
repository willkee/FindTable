#  <img src="./react-app/public/favicon.png" style="width:40px;" />   &nbsp; FindTable

<br>

## FindTable: Table of Contents

-   [Link to Live Site](https://github.com/willkee/FindTable#link-to-live-site)
-   [Description](https://github.com/willkee/FindTable#description)
-   [Getting Started](https://github.com/willkee/FindTable#getting-started)
-   [Technologies](https://github.com/willkee/FindTable#technologies)
-   [Features](https://github.com/willkee/FindTable#features)
-   [Wireframes](https://github.com/willkee/FindTable#wireframes)
-   [Screenshots](https://github.com/willkee/FindTable#screenshots)


<br>

## Link to Live Site

[FindTable Live Site](https://find-table.herokuapp.com/)

<br>

## Description

FindTable is based on OpenTable specifically centered on the New York City metropolitan area. This will include the five boroughs of Manhattan, Brooklyn, Queens, The Bronx, and Staten Island. Users will be able to add a restaurant (minus the verification process), see all available restaurants, and update and delete the listing if the logged-in user is the owner of the listing. Users will also be able to make new reservations, or see, edit and delete existing reservations. Users may also leave a rating and review on an existing restaurant and add a restaurant to their favorites list.

<br>

## Getting Started

1. Clone this repository

   ```bash
   git clone git@github.com:willkee/FindTable.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the .env.example file with credentials of your choice. You may need to set up Google Maps API credentials [here](https://developers.google.com/maps/documentation/embed/get-api-key) to obtain an API key.

4. Setup your PostgreSQL user, password and database to match your chosen credentials in the .env file.

5. Enter your shell environment, upgrade and seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App, go inside the `react-app` directory and type `npm start`. This should open your browser automatically but if not, you may navigate to `localhost:3000` to access the application.

<br>
<br>

## Technologies

          
<br>
<p float="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:75px;"/>
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-line.svg" style="width:75px;" />
  &nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-line.svg" style="width:75px;" />
  &nbsp;
</p>

<br>

## Features

-   The home page displays a list of all of the restaurants on the platform
-   Users can add new restaurants
-   Users can see existing restaurants, and edit/delete restaurants that they own
-   Users can post reviews (with a rating) to an existing restaurant (also read, edit and delete)
-   Users can add (or remove) restaurants to/from their list of favorites
-   Users can make, read, edit or delete a reservation for an existing restaurant
-   Unauthenticated users can view all restaurants and reviews but may not add a new review or restaurant

<br>

## Wireframes

- User testing version:
    - [Adobe XD User testing](https://xd.adobe.com/view/f24f50db-4213-46fb-aae1-a84d179022c4-a71c/?fullscreen&hints=off)

- Design feedback version:
    - [Design review](https://xd.adobe.com/view/f24f50db-4213-46fb-aae1-a84d179022c4-a71c/)

<br>

## Screenshots

<img src="./react-app/public/images/homepage.png" style="width:600px;" />
<img src="./react-app/public/images/login.png" style="width:600px;" />
<img src="./react-app/public/images/signup.png" style="width:600px;" />
<img src="./react-app/public/images/new-restaurant.png" style="width:600px;" />
<img src="./react-app/public/images/reviews.png" style="width:600px;" />
<img src="./react-app/public/images/search-modal.png" style="width:600px;" />
<img src="./react-app/public/images/single_restaurant.png" style="width:600px;" />
<br>
<img src="./react-app/public/images/footer.png" style="width:600px;" />
