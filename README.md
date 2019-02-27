# How to use our prototype
This project needs to be executed in local.
* Step 1 - Configure Hunpos
Once downloaded the project, you have to create your model for hunpos component.
  * Download hunpos-tag and hunpos-train commands for your OS from https://code.google.com/archive/p/hunpos/downloads
  * Replace these files into "js/controller/hunpos", open your terminal in this directory and run this command:
  ```
  ./hunpos-train italian_model < train
  ```
* Step 2 - Install Node JS
  * Download Node JS for your OS from https://nodejs.org/en/download/

* Step 3 -  Download all the needed libraries
  * Go to the project's main directory and use these commands to downloads the libraries needed to execute the project:
  ```
  npm install --save firebase-admin
  ```
  ```
  npm install express --save
  ```
  ```
  npm install shelljs
  ```

* Step 4 -  Run the project local server
  * Open the terminal at the project's main directory and use this command to run the project local server
  ```
  node index.js
  ```
* Step 5 -  Use coletta's prototype!
  * Open your browser and go to http://localhost:8080/insert
