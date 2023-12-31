# Cheese Wheel Project

The goal of this project is to create a test product for the subscribers of The Cheese Wheel (TCW), a local cheese subscription business based in Wellington. Check out their website here: https://thecheesewheel.co.nz/.

Here we have the bones of a basic app with CRUD functionality. As it stands, a user is able to view a list of cheeses from the database, but there is room for improvement!

### MVP

Search and Filtering

- Add search functionality using the existing cheese database.

UI

- Design an accessible and polished UI using brand pallette guide from The Cheese Wheel and Figma.
- Let users save their favourite cheeses to their profile.
- Allow users to post and update comments/ratings on their favourite cheeses.

### Stretch

Authentication

- Create a registration and login page.
- Ensure that only authenticated users can perform CRUD operations (add/delete/update cheeses).

Other

- Assign a unique QR code for each cheese, so that a user can scan a code and find the respective cheese in the database.
- Allow the user to upload a photos of their favourite cheeses.

## Setup

### 0. Cloning and installation

- Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  You may also want to start a new branch

  ```sh
  cd havarti-your-say
  npm i
  git checkout -b <branchname>
  npm run dev
  ```

  </details>

## Documentation

## Naming conventions

| STACK LAYER | FILE/FOLDER NAME  | FUNCTION NAME   |
| ----------- | ----------------- | --------------- |
| Database    | db-all-cheeses.ts | getAllCheesesDb |
| Database    | db-all-cheeses.ts | getOneCheeseDb  |
| Database    | db-all-cheeses.ts | addCheeseDb     |
| Database    | db-all-cheeses.ts | deleteCheeseDb  |
| Database    | db-all-cheeses.ts | updateCheeseDb  |
| Database    | db-fav-cheeses.ts | getFavCheeseDb  |
| Database    | db-fav-cheeses.ts | addFavCheeseDb  |
| API Client  | api-cheeses.ts    | getCheesesApi   |
| API Client  | api-cheeses.ts    | getOneCheeseApi |
| API Client  | api-cheeses.ts    | addCheeseApi    |
| API Client  | api-cheeses.ts    | deleteCheeseApi |
| API Client  | api-cheeses.ts    | updateCheeseApi |
| Component   | components        | AddCheese       |
| Component   | components        | App             |
| Component   | components        | CheeseList      |
| Component   | components        | DeleteCheese    |
| Component   | components        | UpdateCheese    |
| Component   | components        | SignIn          |
| Component   | components        | SignOut         |
| Component   | components        | Profile         |

## Database

### Link to Database Diagram

https://dbdiagram.io/d/Havarti-Your-Say-655bd4283be149578761a439

### Cheeses Table

| COLUMN NAME  | DATA TYPE | PURPOSE                                     |
| ------------ | --------- | ------------------------------------------- |
| id           | integer   | unique identifier                           |
| cheese_box   | integer   | cheese box number that references 4 cheeses |
| name         | string    | cheese name                                 |
| maker        | string    | name of the cheese maker                    |
| description  | string    | description of the cheese                   |
| region       | string    | product origin                              |
| type_of_milk | string    | specifies the cheese's milk type            |

### Users Table

| COLUMN NAME | DATA TYPE | PURPOSE                             |
| ----------- | --------- | ----------------------------------- |
| id          | string    | unique identifier for each user     |
| email       | string    | used to log into user account       |
| auth0_id    | string    | unique identifier supplied by auth0 |
| given_name  | string    | user's first name                   |
| family_name | string    | user's last name                    |

### Favourite Cheeses Table (many-to-many join)

| COLUMN NAME | DATA TYPE | PURPOSE                                |
| ----------- | --------- | -------------------------------------- |
| id          | integer   | unique identifier                      |
| cheese_id   | integer   | identifies which cheese was saved      |
| user_id     | integer   | identifies which user saved the cheese |

Add rating and comment options?

## Server API endpoints

| METHOD | ENDPOINT                | PROTECTED? | USAGE                                              | RETURNS                     |
| ------ | ----------------------- | ---------- | -------------------------------------------------- | --------------------------- |
| GET    | `/api/v1/cheeses`       | No         | gets a list of cheeses                             | an array of cheeses         |
| GET    | `/api/v1/cheeses/:id`   | No         | gets an individual cheese                          | an object                   |
| POST   | `/api/v1/cheeses`       | Yes        | add a new cheese                                   | the newly created cheese    |
| DELETE | `/api/v1/cheeses/:id`   | Yes        | delete an existing cheese                          | nothing (status OK)         |
| PATCH  | `/api/v1/cheeses/:id`   | Yes        | update an existing cheese                          | the updated cheese          |
| POST   | `/api/v1/auth/login`    | Yes        | log in a user                                      | the user's JWT token        |
| POST   | `/api/v1/auth/register` | Yes        | register a user                                    | the user's JWT token        |
| GET    | `/api/v1/cheeses/fav`   | Yes        | get the list of favourite cheeses a user has saved | array of ints (int = an id) |
| POST   | `/api/v1/cheeses/fav`   | Yes        | add a saved favourite cheese to the db             | 201 status code             |

## Views Client Side

| PAGE                 | MVP? | PURPOSE                                                                     |
| -------------------- | ---- | --------------------------------------------------------------------------- |
| Home                 | yes  | welcomes the user and allows them to register for an account and login      |
| Register             | yes  | view for the user to create an account                                      |
| Login                | yes  | view for the user to log into their account                                 |
| Cheese list          | yes  | allows the user to view all the cheeses in the database and save favourites |
| My favourite cheeses | yes  | allows the user to view their saved favourite cheeses                       |

## Authentication

To make a request to the server that checks the authentication of the user, use the custom hook `useAuthorisedRequest(method, endpoint, body)` which returns `<Promise<() => Promise<request.response>>>`

| Parameter | Data Type           | Purpose                                                   |
| --------- | ------------------- | --------------------------------------------------------- |
| method    | string              | the type of the request. `get` `post` `patch` or `delete` |
| endpoint  | string              | the endpoint of the request                               |
| body      | string or undefined | the body of the request                                   |

An example on how to create an authorised request:

```
//React Component function
export function CreateGetRequest() {

  // Use the hook at the top level of your component
  const makeRequest = useAuthorisedRequest('get', '/api/v1/auth', undefined)

  async function OnGetRequest() {

    // Make the request
    const response = await (await makeRequest)()
    // Output the response to console
    console.log(response)
  }

  return (
    // Only send an authorised request if the user is authenticated
    <IfAuthenticated>
      <button onClick={OnGetRequest}>Create get request</button>
    </IfAuthenticated>
  )
}
```

There are two example react components `SignIn` and `SignOut` that show how to sign the user in, out, and how to make an authenticated request. They should be placed as siblings in their parent component.

```
<SignIn/>
<SignOut/>
```

### Helper Components

There are two helper components that will render their children conditionally

```
// Will only render the <p> tag if the user is currently authenticated
<IfAuthenticated>
      <p>Currently signed in</p>
</IfAuthenticated>
```

```
// Will only render the <p> tag if the user is currently signed-out
<IfNotAuthenticated>
      <p>Currently signed out! Click here to sign in</p>
</IfNotAuthenticated>
```
