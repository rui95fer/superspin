# SuperSpin

A startup based in Cairo, Egypt, with the vision of becoming the "Ultimate Marketplace for Table Tennis Players", it
connects Table Tennis Players with professional Coaches for one-on-one training sessions.

## How to set up and run the project

### Prerequisites:

- **PHP**
- **Laravel**

### Backend Setup:

1. Clone the repository:
   ```bash
   git clone https://github.com/rui95fer/superspin.git
   cd superspin
   cd backend
   ```

2. Install the required PHP dependencies using Composer:
   ```bash
   composer install
   ```

3. Set up your environment variables by copying the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

4. Run the database migrations (not going to use it, but run if asked):
   ```bash
   php artisan migrate
   ```

5. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

   The API should now be accessible at `http://localhost:8000/api/coaches` or `http://127.0.0.1:8000/api/coaches`.

### Frontend Setup:

1. Open the `index.html` file in a web browser.
---

## How the search and sort functionality works

The search and sort functionality is implemented on the **frontend** and on the **backend**.

### 1. Search Functionality

#### Frontend:
- The search bar filters the list of coaches by their **name** or **location**.
- A `filter` query parameter is sent to the backend API via an AJAX request (on `main.js`).
- To reduce the number of API calls, the input is debounced by 250 milliseconds.

#### Backend:
- The backend receives the `filter` query parameter.
- It filters the list of hardcoded coaches by checking if the `name` or `location` contains the search term (case-insensitive).
- The filtered list of coaches is returned as a JSON response to the frontend.

#### Example:
- `GET /api/coaches?filter=john`

### 2. Sort Functionality

#### Frontend:
- The dropdown menu sorts coaches by their **hourly rate** in ascending or descending order.
- A `sort` query parameter (`asc` or `desc`) is sent to the backend API via an AJAX request (on `main.js`).

#### Backend:
- The backend receives the `sort` query parameter.
- The list of hardcoded coaches is sorted based on the hourly rate (ascending or descending).

#### Example:
- `GET /api/coaches?sort=asc`

### 3. Combined Search and Sort

- Typing `new york` in the search bar and selecting `Hourly Rate (ascending)` will display only coaches in **New York**, sorted by their hourly rates in ascending order.
- `GET api/coaches?filter=new+york&sort=asc`

## Notes

- The backend uses **hardcoded** data for simplicity in this challenge.
- All tests were performed based on the **hardcoded** data, ensuring the search and sort functionalities work as expected with the provided dataset.
- In a real-world project, the API endpoint would not be hardcoded in the `main.js` file. Instead, it would be stored in an environment file (e.g., `.env`) or a configuration file. However, for the purposes of this **code challenge**, the endpoint was defined directly in the file for convenience.
