Got it! Here’s an updated `README.md` that reflects the ability to run the server and client with a single command:

---

# Quality Control and Production Tracking Application

This project provides a web application for tracking production and quality control records. It uses a Node.js backend with Express and a Vue.js frontend. The application integrates with Supabase for data storage and includes features for managing records and generating reports.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Running the Application](#running-the-application)
4. [Features and Improvements](#features-and-improvements)
5. [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or later)
- **npm** (Node Package Manager)
- **Supabase Account** (for database management)

## Setup

Follow these steps to set up and run the application:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Navigate to the root directory of the project and install the required npm packages:

```bash
npm install
```

### 3. Set Up Supabase

1. **Create a Supabase Project:**
   - Go to [Supabase](https://supabase.io/) and sign in.
   - Create a new project and set up a database.

2. **Run SQL to Create Tables:**
   - In the Supabase dashboard, navigate to the SQL editor.
   - Run the following SQL commands to create the required tables:

   ```sql
   CREATE TABLE public.production (
       id SERIAL PRIMARY KEY,
       product VARCHAR(255) NOT NULL,
       quantity INTEGER NOT NULL,
       status VARCHAR(50) NOT NULL,
       date DATE NOT NULL
   );

   CREATE TABLE public.quality_control (
       id SERIAL PRIMARY KEY,
       product VARCHAR(255) NOT NULL,
       defects INTEGER NOT NULL,
       status VARCHAR(50) NOT NULL,
       date DATE NOT NULL,
       comments TEXT
   );
   ```

3. **Obtain Your Supabase Connection String:**
   - Go to the `Settings` tab in the Supabase dashboard.
   - Copy the connection string from the `Database` section.

4. **Configure Supabase in the Project:**
   - Create a `.env` file in the `server` directory.
   - Add your Supabase connection string:

     ```bash
     SUPABASE_URL=<your-supabase-url>
     SUPABASE_KEY=<your-supabase-api-key>
     ```

### 4. Update Client Configuration

- Ensure the `vite.config.js` in the `client` directory is correctly set up for development.

### 5. Update File Upload Handling (Optional)

For handling file uploads (e.g., attachments in quality control), you need to implement file storage and upload logic. Consider using Supabase Storage or another file storage service.

## Running the Application

To start both the server and client simultaneously, use the following command from the root directory:

```bash
npm start
```

This command runs both the client and server:

- **Client:** Starts the Vue.js frontend on `http://localhost:3000`
- **Server:** Starts the Node.js backend on `http://localhost:3001`

## Features and Improvements

- **Production Tracking:**
  - Add, update, and delete production records.
  - View records in a table with search functionality.
  - Generate and download reports in PDF format using Chart.js and jsPDF.

- **Quality Control:**
  - Add, update, and delete quality control records.
  - View records in a table with search functionality.
  - Generate and visualize quality control reports with Chart.js.

- **File Upload (To Be Implemented):**
  - Currently, file upload functionality for attachments is a placeholder. Consider integrating file storage with Supabase Storage or another service.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this further based on your project's specific needs and details.
