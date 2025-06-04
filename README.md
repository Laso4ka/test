# School Registry Application

This is a React application for managing a registry of school institutions. It allows users to view, create, filter, and deactivate school entries.

## Prerequisites for Windows

Before you begin, ensure you have the following installed on your Windows PC:

1.  **Node.js and npm:**
    *   **Recommended:** Install Node.js using **NVM for Windows (Node Version Manager)**. This allows you to easily switch between Node.js versions.
        *   Go to the [NVM for Windows releases page](https://github.com/coreybutler/nvm-windows/releases).
        *   Download the `nvm-setup.zip` from the latest release.
        *   Extract and run the installer.
        *   Open a new Command Prompt or PowerShell window (might need pc restart)
        *   Install a Long-Term Support version of Node.js
            ```bash
            nvm install 'version'
            nvm use 'version'
            ```
            change version to your selection

2.  **Install Project Dependencies:**
    *   Once inside the root directory (one with package.json inside), install all the necessary npm packages:
        ```bash
        npm install
        ```

3.  **Configure Environment Variables (`.env` file):**
    *   Add the following line to the `.env` file, replacing `http://localhost:3000/api` with the actual base URL of your backend API.
        ```env
        # .env
        API_URL=http://localhost:3000/api
        ```
## Running the Application (Development Mode)

1.  **Start the Development Server:**
    *   In your Command Prompt or PowerShell, while in the project directory (`school-registry-app`), run:
        ```bash
        npm run dev
        ```
        This command starts the Vite development server.

2.  **Open in Browser:**
    *   Once the server is running, it will typically output a local URL (e.g., `http://localhost:5173/` or similar).
    *   Open your web browser (Chrome, Firefox, Edge) and navigate to this URL.
    *   You should see the School Registry application running. The application will automatically reload if you make changes to the source code.