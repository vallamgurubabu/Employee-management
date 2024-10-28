let editIndex = -1; // To track which employee is being edited

        // Function to load employees from local storage
        function loadEmployees() {
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            const tableBody = document.querySelector('#employeeTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            employees.forEach((employee, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.eno}</td>
                    <td>${employee.ename}</td>
                    <td>$${employee.salary}</td>
                    <td>${employee.dateOfJoin}</td>
                    <td>
                        <button class="button" onclick="editEmployee(${index})">Update</button>
                        <button class="button" onclick="deleteEmployee(${index})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        // Function to handle form submission
        document.getElementById('employeeForm').addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent page reload
            const eno = document.getElementById('eno').value;
            const ename = document.getElementById('ename').value;
            const salary = document.getElementById('salary').value;
            const dateOfJoin = document.getElementById('join').value;

            const employees = JSON.parse(localStorage.getItem('employees')) || [];

            if (editIndex === -1) { // Create new employee
                employees.push({ eno, ename, salary, dateOfJoin });
            } else { // Update existing employee
                employees[editIndex] = { eno, ename, salary, dateOfJoin };
                editIndex = -1; // Reset edit index after updating
            }

            localStorage.setItem('employees', JSON.stringify(employees));
            loadEmployees(); // Reload employees
            this.reset(); // Reset form
        });

        // Function to edit an employee
        function editEmployee(index) {
            const employees = JSON.parse(localStorage.getItem('employees'));
            const employee = employees[index];
            document.getElementById('eno').value = employee.eno;
            document.getElementById('ename').value = employee.ename;
            document.getElementById('salary').value = employee.salary;
            document.getElementById('join').value = employee.dateOfJoin;

            // Set the edit index to the selected employee
            editIndex = index;
        }

        // Function to delete an employee
        function deleteEmployee(index) {
            const employees = JSON.parse(localStorage.getItem('employees'));
            employees.splice(index, 1);
            localStorage.setItem('employees', JSON.stringify(employees));
            loadEmployees();
        }

        // Initial load
        loadEmployees();