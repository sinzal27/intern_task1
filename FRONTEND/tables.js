const base = "https://ideal-space-fortnight-5g5jrrw57q5r2wq6-6008.app.github.dev/api";

fetch(`${base}/opportunities`).then(r => r.json()).then(data => {
    const tbody = document.querySelector("#opportunitiestable tbody");
    data.forEach(item => {
        tbody.innerHTML += `<tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>${item.event_date}</td>
            <td>${item.location}</td>
            <td>${item.organization}</td>
        </tr>`;
    });
});

fetch(`${base}/organizations`).then(r => r.json()).then(data => {
    const tbody = document.querySelector("#organizationstable tbody");
    data.forEach(item => {
        tbody.innerHTML += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.location}</td>
            <td>${item.contact_email}</td>
        </tr>`;
    });
});

fetch(`${base}/volunteers`).then(r => r.json()).then(data => {
    const tbody = document.querySelector("#volunteerstable tbody");
    data.forEach(item => {
        tbody.innerHTML += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.opportunity}</td>
        </tr>`;
    });
});


fetch(`${base}/feedback`).then(r => r.json()).then(data => {
    const tbody = document.querySelector("#feedbacktable tbody");
    data.forEach(item => {
        tbody.innerHTML += `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.message}</td>
            <td>${new Date(item.submitted_at).toLocaleString()}</td>
        </tr>`;
    });
});