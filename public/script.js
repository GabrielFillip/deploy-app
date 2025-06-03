const API_URL = "http://localhost:3000/users";

// Carregar usuários na tabela
if (document.getElementById("user-table-body")) {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
    const tbody = document.getElementById("user-table-body");
        data.forEach(user => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
            <a href="edit.html?id=${user.id}">Editar</a>
            <button onclick="deleteUser(${user.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(tr);
        });
    });
}

// Adicionar usuário
const addForm = document.getElementById("add-user-form");
if (addForm) {
    addForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(addForm);
    const user = Object.fromEntries(formData.entries());

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    }).then(() => window.location.href = "index.html");
    });
}

// Preencher form de edição
if (window.location.pathname.includes("edit.html")) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(user => {
        document.getElementById("user-id").value = user.id;
        document.getElementById("user-name").value = user.name;
        document.getElementById("user-email").value = user.email;
    });

    const editForm = document.getElementById("edit-user-form");
    editForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(editForm);
    const user = Object.fromEntries(formData.entries());

    fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    }).then(() => window.location.href = "index.html");
    });
}

// Deletar usuário
function deleteUser(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => location.reload());
}
