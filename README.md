FarmTracker
A full-stack farm management application to track animals, record health events, and maintain medical histories, built with React, Express, and Oracle Database. Users can register animals, log illnesses and deaths, and filter medical records.

Technologies
Front-end: React, Vite, React Router, JSX, React Hooks, styled-components

Back-end: Node.js, Express, Sequelize ORM

Database: SQL Express

Deployment: Neon

Installation
Clone the repository and install dependencies for both client and server:

bash
Copiar
Editar
# Clone the repo
git clone git@github.com:Trinigch/FarmTracker.git

# Front-end
cd FarmTracker/client
npm install

# Back-end
cd ../server
npm install
Create a .env file in the server/ directory with these variables:

env
Copiar
Editar

Usage
Development
In one terminal, start the front-end:

bash
Copiar
Editar
cd FarmTracker/client
npm run dev
In another terminal, start the API server:

bash
Copiar
Editar
cd FarmTracker/server
npm run dev
Production
Build the front-end:

bash
Copiar
Editar
cd FarmTracker/client
npm run build
Start the back-end:

bash
Copiar
Editar
cd FarmTracker/server
npm start
Links
GitHub Repository: https://github.com/Trinigch/FarmTracker

(Add front-end live demo link if deployed)

(Add API endpoint if deployed)

Credits
Developer: Trinidad Peterson — GitHub: Trinigch

License
This project is licensed under the MIT License. See the full text in the LICENSE file.

