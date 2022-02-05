## Run Server (on http://localhost:8000)
```zsh
./server
node index.js
```

## Start client
```zsh
./client
npm start
```

## Add SSL certificate to server
* run "npx localtunnel --port 8000" (this tunnels your local port 8000 to a new https one)
* copy new https link (given in terminal after above command) 
* paste link into baseURL in client/App.js