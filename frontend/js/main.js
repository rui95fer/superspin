// URL of the backend API
const API_URL = 'http://127.0.0.1:8000/api/coaches';

// DOM Elements
const tableBody = document.querySelector('#coaches-table tbody');
const searchInput = document.querySelector('#table-search-users');
const sortSelect = document.querySelector('#table-sort-users');

// Fetches coach data from the API
async function fetchCoaches(filter = '', sort = '') {
    try {
        // Create a new URLSearchParams object to build the API query string.
        const params = new URLSearchParams();
        if (filter) params.append('filter', filter);
        if (sort) params.append('sort', sort);

        // Fetch data from the API using the built query string.
        const response = await fetch(`${API_URL}?${params.toString()}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching coaches:', error);
        return null;
    }
}

// Renders the coach data in the table.
function renderCoaches(coaches) {
    // Clear any existing rows in the table.
    tableBody.innerHTML = '';

    // Display a message in the table if no coaches are found.
    if (!coaches || coaches.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No coaches found.</td></tr>';
        return;
    }

    // Iterate over the coach data and render each row in the table.
    coaches.forEach(coach => {
        const row = document.createElement('tr');
        row.className = 'table-row';

        // Set the inner HTML of the row to the rendered coach data.
        row.innerHTML = `
        <td class="table-row-avatar">
            <img src="./assets/images/profile-picture.jpg" alt="${coach.name}" class="table-avatar">
            <div class="table-row-info">
                <div class="table-row-name">${coach.name}</div>
                <div class="table-row-meta">Joined in ${coach.joined}</div>
            </div>
        </td>
        <td class="table-data">${coach.experience} years of experience</td>
        <td class="table-data">${coach.rate.toFixed(2)}€ per hour</td>
        <td class="table-data">${coach.location}</td>
    `;

        // Append the rendered row to the table body.
        tableBody.appendChild(row);
    });
}

let searchTimeoutId = null;

// Event listener for search functionality
searchInput.addEventListener('input', (e) => {
    // Get the trimmed filter value from the search input element.
    const filterValue = e.target.value.trim();

    // Clear any existing timeout for the search input event listener.
    clearTimeout(searchTimeoutId);

    searchTimeoutId = setTimeout(async () => {
        const coaches = await fetchCoaches(filterValue, sortSelect.value);
        renderCoaches(coaches);
    }, 250);
});

// Event listener for sort functionality
sortSelect.addEventListener('change', (e) => {
    const sortValue = e.target.value;
    fetchCoaches(searchInput.value.trim(), sortValue).then(coaches => renderCoaches(coaches));
});

// Initial load of coach data
fetchCoaches().then(coaches => renderCoaches(coaches));