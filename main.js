let students = [];

function login(e){
  e.preventDefault();
  let email = $("#email").val();
  let password = $("#password").val();
  $('#login-error').css('display', 'none');
  if(email && password){
    fetch('./db/users.json').then(res => res.json()).then((response)=>{
      let user = response.filter(useritem => useritem.email == email);
      console.log('before login', user);
      if(user && user.length && user[0].psw == password){
        localStorage.setItem('isLogin', true);
        location.href = './home.html';
        console.log('afer login', user);
      }else{
        $('#login-error').css('display', 'block');
      }
    }).catch(error => {
      // handle the error
    });
  }else{
    $('#login-error').css('display', 'block');
  }
}

function logout(){
  localStorage.setItem('isLogin', false);
  location.href = './index.html';
}

function loadDashboard(){
  let tempData = JSON.parse(localStorage.getItem('students'));
  if(tempData && tempData.length){
    students = tempData;
  }else{
    fetch('./db/students.json').then(res => res.json()).then((response)=>{
      students = response;
      localStorage.setItem('students', JSON.stringify(students));
    }).catch(error => {
      // handle the error
    });
  }
  renderDashboard();
}

function renderDashboard(){
  $('#dashboard-container').css('display', 'block');
  $('#view-cirtificate-container').css('display', 'none');
  $('#reg-container').css('display', 'none');
  let tableData = "<tbody>";
  students.forEach((item) => {
    tableData = tableData + '<tr> <th scope="row">' + 
    item.id + '</th> <td>' +
    item.fname + '</td> <td>' +
    item.lname + '</td> <td>'+
    item.course + '</td> <td> <button type="button" onclick="viewCirtificate('+item.id+')" id="stu-'+item.id+'" class="btn btn-primary">View Cirtificate</button>'+
    '<button type="button" onclick="deleteStudent('+item.id+')" id="stu-'+item.id+'" class="btn btn-danger ml-1">Delete</button></td></tr>';
  });
  tableData = tableData+ '</tbody>';
  document.getElementById("dashboard-body").innerHTML = tableData;
}

function printCirtificate(){
  window.print();
}

function viewCirtificate(id){
  $('#dashboard-container').css('display', 'none');
  $('#reg-container').css('display', 'none');
  $('#view-cirtificate-container').css('display', 'block');
  let student = students.filter(item => item.id == id);
  console.log(student);
  if(student && student.length > 0){
    document.getElementById('student-course').innerHTML = student[0].course;
    document.getElementById('student-name').innerHTML = student[0].fname+' '+student[0].lname;
  }
}

function deleteStudent(id){
  let index = students.findIndex(item => item.id == id);
  if(index > -1){
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderDashboard();
  }
}
function loadRegPage(){
  $('#reg-container').css('display', 'block');
  $('#dashboard-container').css('display', 'none');
  $('#view-cirtificate-container').css('display', 'none');
  console.log('loadRegPage called');
}
function saveStudent(e){
  e.preventDefault();
  let fname = $("#fname").val();
  let lname = $("#lname").val();
  let course = $("#course").val();
  console.log('saveStudent', fname, lname, course);
  let student = {
    id: +new Date(),
    fname, lname, course
  }
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));
  renderDashboard();
  $("#fname").val('');
  $("#lname").val('');
  $("#course").val('');
}

function loadCourse(){
  console.log('loadCourse called');
}

$(document).ready(()=>{
  $(".nav-link").click((e)=>{
    $('.nav-item').removeClass('active');
    $(e.target).parent().addClass('active');
  });

  $(".nav-link").click((e)=>{
    $('.nav-item').removeClass('active');
    $(e.target).parent().addClass('active');
  });

});
