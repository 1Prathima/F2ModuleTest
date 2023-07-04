const studentsArray=[]
const studentContainer = document.getElementById("student-container");

function renderStudentsInfo(newStudent) {
    const newRow = document.createElement('tr');
    newRow.id = `student-row-${newStudent.ID}`;
    newRow.innerHTML = `
      <td>${newStudent.ID}</td>
      <td>${newStudent.name}</td>
      <td>${newStudent.email}</td>
      <td>${newStudent.age}</td>
      <td>${newStudent.grade}</td>
      <td>
      ${newStudent.degree}
      <span class="edit-delete">
              <i class="fa-regular fa-pen-to-square edit" onclick="editStudent(${newStudent.ID})"></i>
              <i class="fa-regular fa-trash-can delete" onclick="deleteStudent(${newStudent.ID})"></i>
          </span>
          </td>`;
  
    studentContainer.appendChild(newRow);
  }
  


function addStudent(){
    const id = studentsArray.length+1;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const degree = document.getElementById("degree").value;
    const email = document.getElementById("email").value;

    const newStudent = {
        ID: id,
        name: name,
        age: age,
        grade: grade,
        degree: degree,
        email: email,
    };

    studentsArray.push(newStudent);

    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('degree').value = '';
    document.getElementById('email').value = '';
    console.log(studentsArray);
    renderStudentsInfo(newStudent);   
}

function editStudentInfo(index) {

    const addButton = document.querySelector(".add-button button");
    const id = studentsArray[index-1].ID;
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const degree = document.getElementById("degree").value;
    const email = document.getElementById("email").value;
  
    const updatedStudent = {
      ID :id,
      name: name,
      age: age,
      grade: grade,
      degree: degree,
      email: email,
    };
  
    studentsArray.splice(index-1, 1, updatedStudent)
    const rowToUpdate = document.getElementById(`student-row-${updatedStudent.ID}`);
    rowToUpdate.innerHTML = `
    <td>${updatedStudent.ID}</td>
      <td>${updatedStudent.name}</td>
      <td>${updatedStudent.email}</td>
      <td>${updatedStudent.age}</td>
      <td>${updatedStudent.grade}</td>
      <td>
      ${updatedStudent.degree}
      <span class="edit-delete">
              <i class="fa-regular fa-pen-to-square edit" onclick="editStudent(${updatedStudent.ID})"></i>
              <i class="fa-regular fa-trash-can delete" onclick="deleteStudent(${updatedStudent.ID})"></i>
          </span>
          </td>`;
  
    addButton.textContent = "Add Student";
    
}

function editStudent(index) {
    const student = studentsArray[index-1];
    const addButton = document.querySelector(".add-button button");
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const gradeInput = document.getElementById("grade");
    const degreeInput = document.getElementById("degree");
    const emailInput = document.getElementById("email");
  
    nameInput.value = student.name;
    ageInput.value = student.age;
    gradeInput.value = student.grade;
    degreeInput.value = student.degree;
    emailInput.value = student.email;
  
    addButton.textContent = "Edit Student";
    const button = document.getElementsByClassName("add-button"); 
    button.onclick = () => editStudentInfo(index);
}

function deleteStudent(index){
    const rowToDelete = document.getElementById(`student-row-${index}`);
    if(rowToDelete){
    studentContainer.removeChild(rowToDelete);  
    }
    studentsArray.splice(index-1,1);
    console.log(studentsArray);
}


const searchBox = document.getElementById("search");
searchBox.addEventListener('input', function() {
    const searchValue = searchBox.value.toLowerCase();
    const rows = studentContainer.getElementsByTagName('tr');

    Array.from(rows).forEach(function(row) {
        const cells = row.getElementsByTagName('td');
        let isRowVisible = false;

        Array.from(cells).forEach(function(cell) {
        if (cell.textContent.toLowerCase().includes(searchValue)) {
            isRowVisible = true;
        }
        });

        if (isRowVisible) {
        row.style.display = "";
        } else {
        row.style.display = "none";
        }
    });
});

