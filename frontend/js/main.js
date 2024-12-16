// URL of the backend API
const API_URL = 'http://127.0.0.1:8000/api/coaches';

// DOM Elements
const tableBody = document.querySelector('#coaches-table tbody');
const searchInput = document.querySelector('#table-search-users');
const sortSelect = document.querySelector('#table-sort-users');

// Function to fetch and render coach data
async function fetchAndRenderCoaches(filter = '', sort = '') {
    try {
        const params = new URLSearchParams();
        if (filter) params.append('filter', filter);
        if (sort) params.append('sort', sort);
        // Fetch data from the API
        const response = await fetch(`${API_URL}?${params.toString()}`);
        const coaches = await response.json();

        // Render coaches in the table
        renderTableRows(coaches);
    } catch (error) {
        console.error('Error fetching coaches:', error);
        tableBody.innerHTML = '<tr><td colspan="4">Failed to load coaches.</td></tr>';
    }
}

// Function to render table rows
function renderTableRows(coaches) {
// Clear existing rows
    tableBody.innerHTML = '';

    console.log(coaches);

    // Populate rows with coach data
    if (coaches.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No coaches found.</td></tr>';
        return;
    }

    coaches.forEach(coach => {
        const row = document.createElement('tr');
        row.className = 'table-row';

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

        tableBody.appendChild(row);
    });

}

// Event listener for search functionality
let searchTimeoutId = null;

searchInput.addEventListener('input', (e) => {
    const filterValue = e.target.value.trim();

    clearTimeout(searchTimeoutId);

    searchTimeoutId = setTimeout(() => {
        fetchAndRenderCoaches(filterValue, sortSelect.value);
    }, 250);
});

// Event listener for sort functionality
sortSelect.addEventListener('change', (e) => {
    const sortValue = e.target.value;
    fetchAndRenderCoaches(searchInput.value.trim(), sortValue);
});

// Initial load of coach data
fetchAndRenderCoaches();