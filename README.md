# Project Title

This is a microservices-based project developed using TypeScript, JavaScript, and Node.js. The project uses npm and yarn as package managers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following installed on your system:

- Node.js (version 20)
- npm
- yarn

### Installing

To get a development environment running:

1. Clone the repository
```bash
git clone <repository_url>
```
2. Install the dependencies
```bash
yarn install
```
3. Start the server
- Start the gateway server: 
Run this in the current directory
```bash
yarn start:dev
```
- Start the authentication server:
Run this in the current directory
```bash
cd auth_service
yarn start:dev
```
- Start the user server:
Run this in the current directory
```bash
cd user_service
yarn start:dev
```

- Start the book server:
Run this in the current directory
```bash
cd book_service
yarn start:dev
```

## Running the tests
To run the tests, run the following command in the terminal for each of the service
```bash
yarn test
```

[NOTE]: Error handling is partially implemented in the services.

## Built With
- [TypeScript](https://www.typescriptlang.org/) - The language used
- [Node.js](https://nodejs.org/en/) - The runtime environment
- [NestJS](https://docs.nestjs.com/) - The web framework used
- [npm](https://www.npmjs.com/) - The package manager used
- [yarn](https://yarnpkg.com/) - The package manager used
- [Jest](https://jestjs.io/) - The testing framework used
- [Swagger](https://swagger.io/) - The API documentation tool used
- [Docker](https://www.docker.com/) - The containerization tool used

## Authors
- [**James Omondi**](https://github.com/jamie-codez)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
- [NestJS](https://docs.nestjs.com/)
- [Jest](https://jestjs.io/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [yarn](https://yarnpkg.com/)

# Code of Conduct
This project has adopted the Contributor Covenant Code of Conduct. For more information, see the [Code of Conduct](CODE_OF_CONDUCT.md) file.
