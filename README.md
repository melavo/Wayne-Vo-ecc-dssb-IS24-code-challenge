**Wayne-Vo-ecc-dssb-IS24-code-challenge**

**This is a comprehensive product management web application developed using ReactJS and NextJS for the frontend and NodeJS for the backend. Users can seamlessly add, edit, and view a roster of available products.**


## Technologies Used

- **ReactJS**
- **NodeJS**
- **Express**
- **Swagger**
- **Nodemon**
- **NextJS**


## Architecture Decision

For this application's design, I opted for the NextJS framework within React. Given its nature as a compact web application interfacing with a public API, I believed React would be ideal for rapidly constructing a responsive UI and managing multiple AJAX calls. I have also designed the UI to match the look and feel of the current BC Gov Style Guide to be consistent with other government services. The data grid presented is sortable and allows for paging should the records get too long.


## Installation

To set up this application, adhere to the following instructions:

- Clone the repository onto your local system.
- Move into the project's directory.
- Change to backend folder, and install node package (npm install)
- Change to frontend folder, and install node package (npm install)


## Usage

To utilize this application, adhere to the following instructions:

- 1\. Navigate to the designated project directory.

- 2\. Initiate the application by executing: 

  - Start the server for the Backend: npm run start:backend
  - Start the server for the Frontend: npm run start:frontend

- 3\. Access the application in your web browser at[ http://localhost:3000/](http://localhost:3000/).

- 4\. Upon launching, a table showcasing a list of current products will be displayed.

- 5.To add a new product, simply click on the "Add New" button. This action will prompt a popup modal for product details.

- 6.To edit an existing product, select the desired product. This will activate the Edit Icon. Click on it to make the necessary changes.

- 7.To delete an existing product, select the desired product. This will activate the Delete Icon. Click on it to make the necessary changes.

- 8.The data table consists of sorting if you click on the column label, paging and the ability to search this project, permitting users to narrow down products by roles like 'Scrum Master' or 'Developer'.

<!---->

-


## API Endpoints

The backend operates at "<http://127.0.0.1:8001/api>". This application interfaces with a RESTful API offering the subsequent endpoints:


### Return All Products

This endpoint delivers a compilation of all products stored in the database. The response encompasses an array of product entities, with each entity possessing the subsequent attributes:

- **URL:** `/api/product`

- **Method**: `GET`

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**: JSON array representing the list of products

- **Error Responses**:

  - **Code**: `500 Internal Server Error`
  - **Content**: An error occurred while retrieving products.


### Return Product by Id

This endpoint modifies the product identified by the given ID using the supplied attributes. The request body should encompass a JSON structure detailing the subsequent properties:

- **URL**: `/api/product/:productId`

- **Method**: `GET`

- **URL Parameters**:

  - `productId`(required): The unique identifier to retrieve product.

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**: JSON object representing the requested product.

- **Error Responses**:

  - **Code**: `404 Not Found`
  - **Content**: Error message indicating that the product with the Id was not found.


### Create New Product

Creates a new product and add it to the API.

- **URL**: `/api/product`

- **Method**: `POST`

- **Request Body**: A JSON object representing the new product. The following fields are required:

  - `productName`: Name of new product.
  - `productOwnerName`: Name of product owner.
  - `developers`: An array of names of developers working on the product.
  - `scrumMasterName`: The name of the scrum master.
  - `startDate`: The start date of the project.
  - `methodology`: The development methodology used in the project.

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**: JSON object representing the newly created product.

- **Error Responses**:

  - **Code**: `400 Invalid request data`
  - **Content**: Invalid data passed to API
  - **Code**: `500 Internal Server Error`
  - **Content**: `An error occurred while saving the product`.


### Update Existing Product

This endpoint update product using specified product Id. 

- **URL**: `/api/product/:productId`

- **Method**: `PUT`

- **Request Body**: A JSON object representing the new product. The following fields are required:

  - `productName`: Product name.
  - `productOwnerName`: The name of the product owner.
  - `developers`: An array of names of developers working on the product.
  - `scrumMasterName`: The name of the scrum master.
  - `startDate`: The start date of the project.
  - `methodology`: The development methodology used for the project.
  - `location`: Link github.com/bcgov any project. 

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**: JSON object representing the newly created product.

- **Error Responses**:

  - **Code**: `500 Internal Server Error`
  - **Content**: `An error occurred while saving the product`.
  - **Code**: `404 Not Found`
  - **Content**: Error message indicating that the request body did not pass validation.


### Delete Existing Product

This endpoint will delete product using specified product Id.

- **URL**: `/api/product/:productId`

- **Method**: `DELETE`

- **URL Parameters**:

  - `productId `(required): The unique identifier for the product to be deleted.

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**: JSON object representing status OK.

- **Error Responses**:

  - **Code**: `404 Not Found`
  - **Content**: Error message indicating that the product with the Id was not found.


### GET '/api/healthcheck'

This endpoint returns a http 200 response indicating api component is healthy


## Data

The data is housed in the 'backend/data' directory within a file named 'db.json'.


## Swagger Documentation

After the server is running, you can see at <http://127.0.0.1:8001/api/api-docs/>.
