# Bloglist

## Running the app locally

### Create environment file and add mongoDB URIs to it
    echo "MONGODB_URI=<YOUR-MONGODB-URI>" > .env
    echo "TEST_MONGODB_URI=<YOUR-TEST-MONGODB-URI>" > .env

    # Add signature secret to .env
    echo "SECRET=yoursecretphrase" > .env

### Install dependancies
    npm install

### Start the application
    npm run dev

### Start the application in production environment
    npm start

### Run tests
    npm run test

The app can then be accessed at http://localhost:3001