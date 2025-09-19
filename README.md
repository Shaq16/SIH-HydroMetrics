# SIH‑HydroMetrics – Prototype Test API

> HydroMetrics is a prototype project to collect, serve, and visualize hydrological metrics (lake, district data etc.), providing both backend APIs and a frontend client. This branch is the **Prototype_Test_Api** version.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Repository Structure](#repository-structure)  
3. [Installation & Setup](#installation--setup)  
4. [Usage](#usage)  
5. [Data Files](#data-files)  
6. [Testing](#testing)  
7. [Deployment](#deployment)  
8. [Future Work / Roadmap](#future-work--roadmap)  
9. [Contributing](#contributing)  
10. [License](#license)  

---

## Project Overview

HydroMetrics aims to gather hydrological and geographical data (e.g. lakes, districts), expose APIs for these, and provide a frontend for viewing, manipulating, or analyzing the data. This prototype branch is focused on testing the API endpoints and frontend integration using sample datasets.

---

## Repository Structure

Here’s a breakdown of what’s in this repo (under the **Prototype_Test_Api** branch):

```
/
├── backend/                   # Backend server code (APIs, routing, any database code etc.)
├── frontend/                  # Frontend client (UI) to consume APIs
├── .gitignore
├── Procfile                   # For deployment (e.g., Heroku or similar platforms)
├── README.md
├── Test_Code.txt              # Possibly test scripts, sample requests or notes
├── district_data.csv          # Sample dataset of districts
├── lake_data.csv              # Sample dataset of lakes
├── package.json               # Node.js dependencies & scripts
├── package-lock.json          # Locked dependency versions
```

---

## Installation & Setup

### Prerequisites

- Node.js (>=14.x or 16.x)  
- npm or yarn  
- Git  

### Steps

1. Clone the repo:

   ```bash
   git clone https://github.com/Shaq16/SIH-HydroMetrics.git
   cd SIH-HydroMetrics
   git checkout Prototype_Test_Api
   ```

2. Backend setup:

   ```bash
   cd backend
   npm install
   ```

   - If there is a `.env` file needed, copy from `.env.example` (if available) and set environment variables (port, database URL etc.).

3. Frontend setup:

   ```bash
   cd ../frontend
   npm install
   ```

   - Similarly, configure any environment variables if required (API base URL etc.).

4. Running locally:

   - Start backend server:

     ```bash
     cd backend
     npm start
     # or npm run dev
     ```

   - Start frontend:

     ```bash
     cd ../frontend
     npm start
     ```

   - By default, frontend might run on `http://localhost:3000` and backend on `http://localhost:5000` (or similar). Confirm ports in code.

---

## Usage

Once installed and running:

- Access the frontend in browser to view UI, which will fetch data from backend APIs.
- API endpoints:

  | Endpoint | Description |
  |----------|-------------|
  | `/api/lakes` | Fetch all lake data |
  | `/api/districts` | Fetch district data |
  | *(others as implemented)* | ... |

- Use the sample CSV data to test inputs or mock datasets.

- Example request:

  ```bash
  GET /api/lakes
  ```

  Example response:

  ```json
  [
    {
      "id": "1",
      "name": "Sample Lake",
      "area": "25 sq.km",
      "location": { "lat": 12.97, "lng": 77.59 }
    }
  ]
  ```

---

## Data Files

- **lake_data.csv** — contains sample or real data for lakes: names, areas, metrics etc.  
- **district_data.csv** — contains data for districts: maybe population, rainfall, boundaries etc.  
- These are used by backend for seeding/testing, or directly consumed by frontend in prototype mode.

---

## Testing

- The `Test_Code.txt` file likely includes sample test cases or instructions. Use that to validate API endpoints.  
- You can also use tools like **Postman** or **curl** to hit the endpoints.  
- For backend testing, frameworks like Jest/Mocha can be used.  

---

## Deployment

- The presence of `Procfile` indicates support for services like Heroku or other PaaS.  

Steps:

1. Push repository to hosting (e.g., Heroku).  
2. Set configuration variables (API URLs, environment variables).  
3. Ensure build scripts are in `package.json`.  
4. Serve frontend either separately or from backend build.  

---

## Future Work / Roadmap

- Add authentication & authorization  
- Use a database instead of static CSVs  
- Add more API endpoints (historical/time series data)  
- Rich frontend with charts, maps, dashboards  
- CI/CD pipelines for deployment  
- Improve error handling & add unit/integration tests  
- Real‑time data ingestion support  

---

## Contributing

1. Fork the project  
2. Create a new branch (`feature/xyz` or `bugfix/xyz`)  
3. Commit changes with descriptive messages  
4. Push and create a Pull Request  

---

## License

This project is licensed under the **MIT License**. See the LICENSE file for details.
