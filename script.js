const subjectsBody = document.getElementById('subjectsBody');
const addSubjectBtn = document.getElementById('addSubject');
const calculateBtn = document.getElementById('calculate');
const resultDiv = document.getElementById('result');

let subjectCount = 0;

// Function to add a new subject row
function addSubject(name = '', credit = '', grade = '') {
    subjectCount++;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${subjectCount}</td>
        <td><input type="text" placeholder="Subject Name" value="${name}"></td>
        <td><input type="number" placeholder="Credit Hours" min="0" step="0.5" value="${credit}"></td>
        <td><input type="number" placeholder="Grade Point" min="0" max="10" step="0.01" value="${grade}"></td>
        <td><button type="button" class="removeBtn">🗑️</button></td>
    `;
    subjectsBody.appendChild(row);

    // Remove subject
    row.querySelector('.removeBtn').addEventListener('click', () => {
        row.remove();
        updateRowNumbers();
    });
}

// Update row numbers after deletion
function updateRowNumbers() {
    subjectCount = 0;
    const rows = subjectsBody.querySelectorAll('tr');
    rows.forEach(row => {
        subjectCount++;
        row.children[0].textContent = subjectCount;
    });
}

// Add initial subject row on page load
addSubject();

// Add new subject row when button clicked
addSubjectBtn.addEventListener('click', () => addSubject());

// Calculate CGPA
calculateBtn.addEventListener('click', () => {
    let totalPoints = 0;
    let totalCredits = 0;

    const rows = subjectsBody.querySelectorAll('tr');
    if (rows.length === 0) {
        resultDiv.textContent = '⚠️ Add at least one subject!';
        return;
    }

    rows.forEach(row => {
        const credit = parseFloat(row.children[2].children[0].value);
        const grade = parseFloat(row.children[3].children[0].value);

        if (!isNaN(credit) && !isNaN(grade)) {
            totalPoints += credit * grade;
            totalCredits += credit;
        }
    });

    if (totalCredits === 0) {
        resultDiv.textContent = '⚠️ Total credits cannot be zero!';
        return;
    }

    const cgpa = (totalPoints / totalCredits).toFixed(2);

    // Color-coded CGPA display
    let color = '#fff';
    if (cgpa >= 9) color = '#00ff99'; // Excellent
    else if (cgpa >= 7) color = '#ffff66'; // Good
    else if (cgpa >= 5) color = '#ff9933'; // Average
    else color = '#ff4b5c'; // Poor

    resultDiv.style.color = color;
    resultDiv.textContent = `🎉 Your CGPA is: ${cgpa}`;
});
