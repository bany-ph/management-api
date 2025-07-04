# Management API

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/management-api.git
    cd management-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Running the App

- The API will run on [http://localhost:3001](http://localhost:3001)

- The frontend (Vite) will run on [http://localhost:5173](http://localhost:5173)

 


- To run the API (json-server):

    ```bash
    npm run json-server
    ```

- To run the frontend (Vite):

    ```bash
    npm run dev
    ```

## Project Structure

```
management-api/
├── db.json            # Fake database for json-server
├── css/
│   └── styles.css     # Main CSS file
├── js/
│   ├── api.js         # API functions (Axios)
│   └── index.js       # Main frontend logic
├── index.html         # Main HTML file
├── package.json
└── ...
```