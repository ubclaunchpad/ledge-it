# Ledge-it

### Description

Ledge-it is an app targeted to help students take control of their finances as seamlessly as possible. Users can:
- Quickly input and categorize expenses or income
- Set budgets for each month and also for specific categories
- View and sort by name, category, date, etc.
- Visualize spending patterns through graphs and charts
- And much more...


### Getting Started

Clone the repo: `git clone https://github.com/ubclaunchpad/money-manager.git`

Checkout `/client` for the React Native app
and `/server` for the FastAPI Python server.

### Docker Instructions

To run the backend in docker, you need to first install [docker](https://docs.docker.com/get-docker/) and 
[docker-compose](https://docs.docker.com/compose/install/). The run the following from the root directory:

`docker-compose build` to build the docker containers

`docker-compose up` to start the backend server

`docker-compose down` to delete the containers

### Contributing

1. Clone the repo as described above
2. Create a new branch (`git checkout -b branchName`)
3. Commit your changes (`git commit -m 'Add x,y,z'`)
4. Push commits to the remote branch (`git push origin branchName`)
5. Create a Pull Request
