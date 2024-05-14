document.addEventListener('DOMContentLoaded', function () {
    // fetchHowls();
    // fetchCurrentUser();
    fetchFollowers();
});

function fetchFollowers() {
    fetch('/api/follows/').then(response => response.json()).then(users => {
        // Call the method to dynamically update the following list
        updateFollowingDropdown(users);

    }).catch(error => {
        console.error('Error fetching followers:', error);
        howlContainer.innerHTML = '<p class="text-danger">Failed to load users.</p>';
    });
}

function fetchCurrentUser() {
    fetch('/api/me') // Your API endpoint for fetching username
        .then(response => response.json())
        .then(username => {
            const usernameElement = document.getElementById('username');
            usernameElement.innerHTML = "@" + username.username;
        })
        .catch(error => {
            console.error('Error fetching username:', error);
            usernameElement.innerHTML = '<p class="text-danger">Failed to load username.</p>';
        });
}

function updateFollowingDropdown(users) {
    const dropdownList = document.getElementById('userFollowingList');
    dropdownList.innerHTML = ''; // Clear existing dropdown items

    users.forEach(user => {
        const dropdownItem = document.createElement('a');
        dropdownItem.className = 'dropdown-item'; // Bootstrap class for dropdown items
        dropdownItem.href = `./profile/${user.username}`; // Set href to user's profile link
        dropdownItem.textContent = `${user.first_name} (@${user.username})`;
        dropdownList.appendChild(dropdownItem);
    });
}

function displayProfile(user) {
    const usernameElement = document.getElementById('username');
    usernameElement.innerHTML = "@" + user.username;

    const userAvatar = document.getElementById('userAvatar');
    userAvatar.src = user.avatar;

    const userFirstName = document.getElementById('userFirstName');
    userFirstName.textContent = user.first_name;

    const userLastName = document.getElementById('userLastName');
    userLastName.textContent = user.last_name;
}