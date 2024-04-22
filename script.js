document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('attendance-form');
    const table = document.getElementById('attendance-table').getElementsByTagName('tbody')[0];

    // Load saved entries from local storage
    loadEntries();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const personInput = document.getElementById('person');
        const statusInput = document.getElementById('status');

        const person = personInput.value.trim();
        const status = statusInput.value;

        if (person !== '') {
            addEntry(person, status);
            saveEntries();
            personInput.value = '';
            statusInput.selectedIndex = 0;
        } else {
            alert('Please enter a person name.');
        }
    });

    function addEntry(person, status) {
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.textContent = person;
        cell2.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        cell3.innerHTML = '<button class="delete-button">Delete</button>';

        if (status === 'absent') {
            newRow.classList.add('status-absent');
        } else {
            newRow.classList.add('status-present');
        }

        // Add event listener for delete button
        const deleteButton = cell3.querySelector('.delete-button');
        deleteButton.addEventListener('click', function () {
            table.deleteRow(newRow.rowIndex);
            saveEntries();
        });
    }

    function saveEntries() {
        const rows = table.querySelectorAll('tr');
        const entries = [];
        rows.forEach(row => {
            const person = row.cells[0].textContent;
            const status = row.cells[1].textContent.toLowerCase();
            entries.push({ person, status });
        });
        localStorage.setItem('attendanceEntries', JSON.stringify(entries));
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('attendanceEntries'));
        if (entries) {
            entries.forEach(entry => {
                addEntry(entry.person, entry.status);
            });
        }
    }
});
