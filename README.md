## Run Server (on http://localhost:8000)
```zsh
./server
npm install && node index.js
```

## Start client
```zsh
./client
npm install && npm start
```

## Add SSL certificate to server
* run "npx localtunnel --port 8000" in terminal (this tunnels your local port 8000 to a new https one)
* copy new https link (given in terminal after above command) 
* paste link (from localtunnel) into baseURL in client/App.js


## Plaid API test accounts
* username: user_good
* password: pass_good
* This should work for every bank (and each account has sample transactions)