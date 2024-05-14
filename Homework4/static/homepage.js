document.addEventListener('DOMContentLoaded', function () {
    fetchHowls();
    fetchCurrentUser();
    createPost();
});

function fetchHowls() {
    fetch('/api/follows/howls').then(response => response.json()).then(howls => {
        const howlContainer = document.getElementById('howlContainer');
        howlContainer.innerHTML = howls.map(howl => `
                <div class="card my-3">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">${howl.datetime}</h6>
                        <p class="card-text">${howl.text}</p>
                    </div>
                </div>
            `).join('');
    }).catch(error => {
        console.error('Error fetching howls:', error);
        howlContainer.innerHTML = '<p class="text-danger">Failed to load howls.</p>';
    });
}


function createPost() {
    document.getElementById('postForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const content = document.getElementById('content').value;
        console.log(content);

        fetch('/api/howls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Post created successfully!');
                // Optionally reset the form or redirect the user
                document.getElementById('postForm').reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error creating post.');
            });
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
