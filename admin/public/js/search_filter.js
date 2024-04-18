init()

function init() {
  const parent = document.getElementById("parent")
  data.forEach(element => {
    let lili = document.createElement('li')
    lili.setAttribute('class', 'stud-info-wrapper')
    lili.setAttribute('stud-id', `${element.stud_id}`)
    parent.append(lili)
    
    let div1 = document.createElement('div')
    div1.setAttribute('class', 'left-wrapper')
    lili.append(div1)

    let divImg = document.createElement('div')
    divImg.setAttribute('class', 'pf-wrapper')
    div1.append(divImg)

    let divInfo = document.createElement('div')
    divInfo.setAttribute('class', 'info-wrapper')
    div1.append(divInfo)
    
    let div2 = document.createElement('div')
    div2.setAttribute('class', 'right-wrapper')
    lili.append(div2)
    
    let hours = document.createElement('p')
    hours.innerHTML = ((element.total_hours != undefined) ? element.total_hours : "0")
    div2.append(hours)
    
    let studentName = document.createElement('p')
    studentName.innerHTML = generateFullName(element)
                          
    divInfo.append(studentName)

    let company = document.createElement('p')
    company.innerHTML = element.company_name
    divInfo.append(company)
    
    let advName = document.createElement('p')
    advName.innerHTML = generateAdminFullName(element)
    divInfo.append(advName)

    let img = document.createElement('img')
    img.setAttribute('class', 'student-pf')
    img.setAttribute('src', `../assets/img/profiles/students/${element.stud_id}.jpg`)
    img.setAttribute('alt', `${element.stud_id}.jpg`)
    divImg.append(img)
  });
}

const students =  document.querySelectorAll(".stud-info-wrapper")
const dimmer = document.getElementById("dimmer")
const panel = document.getElementById("stud-info-panel")
const closeBtn = document.getElementById("close-btn")
const body = document.body

students.forEach(stud => {
  stud.addEventListener("click", event => {
    dimmer.style.opacity = 0.64
    dimmer.style.cursor = "pointer"
    dimmer.style.pointerEvents = "all"

    panel.style.top = "50%"
    panel.style.opacity = 1
    panel.style.visibility = "visible"
    panel.style.pointerEvents = "all"

    dislpayStudInfo(stud)
  })
})

dimmer.addEventListener("click", event => {
  dimmer.style.opacity = 0
  dimmer.style.cursor = "default"
  dimmer.style.pointerEvents = "none"

  panel.style.top = "0%"
  panel.style.opacity = 0
  panel.style.visibility = "hidden"
  panel.style.pointerEvents = "none"

  let element = document.getElementById("calendar-table");
  element.remove();
})

closeBtn.addEventListener("click", event => {
  dimmer.style.opacity = 0
  dimmer.style.cursor = "default"
  dimmer.style.pointerEvents = "none"

  panel.style.top = "0%"
  panel.style.opacity = 0
  panel.style.visibility = "hidden"
  panel.style.pointerEvents = "none"
  let element = document.getElementById("calendar-table");
  element.remove();
})

const studPf = document.getElementById("stud-pf-panel")
const studName = document.getElementById("name-header")
const studAdv = document.getElementById("adviser-header")
const studComp = document.getElementById("company-header")
const studRemark = document.getElementById("remark-input")
const studIdInv = document.getElementById("invi-studid-input")
function dislpayStudInfo(stud) {
  let found = data.find((element) => element.stud_id == stud.getAttribute('stud-id'));

  studPf.setAttribute('src', `../assets/img/profiles/students/${found.stud_id}.jpg`)
  studPf.setAttribute('alt', `${found.stud_id}.jpg`)

  studName.innerHTML = generateFullName(found)
  studAdv.innerHTML = generateAdminFullName(found)
  studComp.innerHTML = found.company_name

  studIdInv.value = found.stud_id

  studRemark.value = found.remark

  generateStudentInfo(found)
  generateStudRequirementsInfo(found)
  generateCalendar(found)
}

const moa = document.getElementById("moa")
const medical = document.getElementById("medical")
const wavier = document.getElementById("waiver")
const nbiClearance = document.getElementById("nbi-clearance")
const birthCertificate = document.getElementById("birth-certificate")
const acceptanceForm = document.getElementById("acceptance-form")
const recommendationLetter = document.getElementById("recommendation-letter")
const resume = document.getElementById("resume")
const coverLetter = document.getElementById("cover-letter")
const tor = document.getElementById("tor")
function generateStudRequirementsInfo(stud) {
  moa.innerHTML = generateRequirementInfo(stud.moa)
  medical.innerHTML = generateRequirementInfo(stud.medical)
  wavier.innerHTML = generateRequirementInfo(stud.wavier)
  nbiClearance.innerHTML = generateRequirementInfo(stud.nbi_clearance)
  birthCertificate.innerHTML = generateRequirementInfo(stud.birth_certificate)
  acceptanceForm.innerHTML = generateRequirementInfo(stud.acceptance_form)
  recommendationLetter.innerHTML = generateRequirementInfo(stud.recommendation_letter)
  resume.innerHTML = generateRequirementInfo(stud.resume)
  coverLetter.innerHTML = generateRequirementInfo(stud.cover_letter)
  tor.innerHTML = generateRequirementInfo(stud.tor)
}

function generateRequirementInfo(requirement) {
  let temp = ""

  if (requirement != null) {
    let formattedDate = requirement.slice(0, 10);
    temp += `Passed\xa0\xa0\xa0\xa0\u2022\xa0\xa0\xa0\xa0${formattedDate}`
  } else {
    temp += `Missing\xa0\xa0\xa0\xa0\u2022\xa0\xa0\xa0\xa0-`
  }

  return temp
}

const fnameInput = document.getElementById("fname-input")
const mnameInput = document.getElementById("mname-input")
const lnameInput = document.getElementById("lname-input")
const genderInput = document.getElementById("gender-input")
// const bdayInput = document.getElementById("bday-input")

const studIDInput = document.getElementById("studID-input")
const courseYearInput = document.getElementById("courseYear-input")
const classcodeInput = document.getElementById("classcode-input")
const advisorInput = document.getElementById("advisor-input")
const advContact1Input = document.getElementById("advContact1-input")
const advContact2Input = document.getElementById("advContact2-input")
const advContact3Input = document.getElementById("advContact3-input")

const supInput = document.getElementById("supervisor-input")
const supContact1Input = document.getElementById("supContact1-input")
const supContact2Input = document.getElementById("supContact2-input")
const supContact3Input = document.getElementById("supContact3-input")

const compAddressInput = document.getElementById("compAddress-input")
const compPhoneInput = document.getElementById("compPhone-input")
const compEmailInput = document.getElementById("compEmail-input")

function generateStudentInfo(stud) {
  fnameInput.value = stud.first_name
  mnameInput.value = stud.middle_name
  lnameInput.value = stud.last_name
  genderInput.value = stud.gender
  // bdayInput.value = stud.birthday.slice(0, 10)

  studIDInput.value = stud.stud_id
  courseYearInput.value = stud.course_year
  classcodeInput.value = stud.classcode
  setSelectedIndex(advisorInput, stud.admin_first_name + " " + stud.admin_last_name)
  advContact1Input.value = stud.admin_contact1
  advContact2Input.value = stud.admin_contact2
  advContact3Input.value = stud.admin_contact3
 
  setSelectedIndex(supInput, stud.sup_first_name + " " + stud.sup_last_name)
  supContact1Input.value = stud.sup_contact1
  supContact2Input.value = stud.sup_contact2
  supContact3Input.value = stud.sup_contact3

  compAddressInput.value = stud.comp_address
  compPhoneInput.value = stud.comp_phone
  compEmailInput.value = stud.comp_email
}

function setSelectedIndex(selectInput, name) {
  for (var i = 0; i < selectInput.options.length; i++ ) {
    if (selectInput.options[i].text == name ) {
        selectInput.options[i].selected = true;
        return;
    }
  }
} 

let editToggled = false
const edittableInputs = document.querySelectorAll(".input-disable")
const editBtn = document.getElementById("enable-edit-btn")
const submitBtn = document.getElementById("submit-edit-btn")
function toggleEditBtn() {
  editToggled = !editToggled
    
  if (editToggled === true) {
    edittableInputs.forEach(element => {
      editBtn.style.fill = "var(--accent)"
      submitBtn.style.display = "block"
      element.disabled = false;
    })
  } else {
    edittableInputs.forEach(element => {
      editBtn.style.fill = "var(--text)"
      submitBtn.style.display = "none"
      element.disabled = true;
    }) 
  }
}

const infoContent = document.getElementById("info-content")
const reqContent = document.getElementById("req-content")
const reportContent = document.getElementById("report-content")
const navLinks = document.querySelectorAll(".stud-info-nav-links")
const navLine = document.getElementById("line")
let prevContent = null
let currContent = infoContent
navLinks.forEach(navLink => {
  navLink.addEventListener("click", event => {
    navLink.classList.add("active")
    prevContent = currContent
    navLinks.forEach(element => {
      if (element !== navLink) element.classList.remove("active")
    });

    if (document.getElementById("info-nav").classList.contains("active")) {
      navLine.style.transform = "translateX(0%)"
      currContent = infoContent
      prevContent.style.display = "none"
      currContent.style.display = "block"
    }

    if (document.getElementById("req-nav").classList.contains("active")) {
      navLine.style.transform = "translateX(100%)"
      currContent = reqContent
      prevContent.style.display = "none"
      currContent.style.display = "block"
    }

    if (document.getElementById("report-nav").classList.contains("active")) {
      navLine.style.transform = "translateX(200%)"
      currContent = reportContent
      prevContent.style.display = "none"
      currContent.style.display = "block"
    }
  })
});

function generateFullName(person) {
  let temp = person.first_name + " " + person.middle_name.charAt(0) + ". " + person.last_name
  return temp 
}

function generateAdminFullName(person) {
  let temp = person.admin_first_name + " " + person.admin_middle_name.charAt(0) + ". " + person.admin_last_name
  return temp
}

function generateSupervisorFullName(person) {
  let temp = person.sup_first_name + " " + person.sup_middle_name.charAt(0) + ". " + person.sup_last_name
  return temp
}

let reportLog
fetch('/manage/calendar')
  .then(response => response.json())
  .then(data => {
    if (data && data.length > 0) {
        reportLog = data;
    } else {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No data available';
        reportContent.appendChild(noDataMessage);
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
});  

function generateCalendar(student) {
  let result = reportLog.filter((element) => element.stud_id == student.stud_id)
  const table = document.createElement('table');
        table.setAttribute('id', 'calendar-table')
        table.style.borderCollapse = 'collapse'; // Add this line for better spacing

        // Create table header
        const headerRow = document.createElement('tr');
        const dateHeaderCell = document.createElement('th');
        dateHeaderCell.textContent = 'Date';
        dateHeaderCell.style.padding = '8px'; // Add padding for better spacing
        headerRow.appendChild(dateHeaderCell);
        const hrsHeaderCell = document.createElement('th');
        hrsHeaderCell.textContent = 'Hours Rendered';
        hrsHeaderCell.style.padding = '8px'; // Add padding for better spacing
        headerRow.appendChild(hrsHeaderCell);
        table.appendChild(headerRow);

        // Create table rows
        result.forEach(row => {
            const tr = document.createElement('tr');

            const dateCell = document.createElement('td');
            const date = new Date(row.date);
            const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
            dateCell.textContent = date.toLocaleDateString('en-US', options);
            dateCell.style.padding = '32px'; // Add padding for better spacing
            tr.appendChild(dateCell);

            const hrsRenderedCell = document.createElement('td');
            hrsRenderedCell.textContent = row.hrs_rendered;
            hrsRenderedCell.style.padding = '32px'; // Add padding for better spacing
            tr.appendChild(hrsRenderedCell);

            table.appendChild(tr);
        });

        reportContent.appendChild(table);
}

// TEST CODE BELOW

document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay');
  const popupContainer = document.getElementById('popupContainer');

  // Open popup when the button is clicked
  document.getElementById('openPopup').addEventListener('click', function () {
    overlay.style.display = 'block';
    popupContainer.style.display = 'block';

    fetch('http://localhost:8080/api/advisers')
        .then(response => response.json())
        .then(advisers => {
          advisorSelect = document.getElementById('advisor')

          advisers.forEach(advisor => {
            const option = document.createElement('option');
            option.value = advisor.admin_id; 
            option.textContent = advisor.first_name + " " + advisor.last_name; 
            advisorSelect.appendChild(option);
          });
        })
        .catch(error => {
          console.error('Error fetching Advisers:', error);
          supervisorsList.innerHTML = 'Error fetching supervisors.';
        });

    // fetch('http://localhost:8080/api/supervisors')
    //     .then(response => response.json())
    //     .then(supervisors => {
    //       console.log(JSON.stringify(supervisors));
    //       supervisorSelect = document.getElementById('supervisor')

    //       supervisors.forEach(supervisor => {
    //         const option = document.createElement('option');
    //         option.value = supervisor.sup_id; 
    //         option.textContent = supervisor.first_name + " " + supervisor.last_name; 
    //         supervisorSelect.appendChild(option);
    //         console.log(supervisor)
    //       });
    //     })
    //     .catch(error => {
    //       console.error('Error fetching supervisors:', error);
    //       supervisorsList.innerHTML = 'Error fetching supervisors.';
    //     });
    });
});

  // Close popup when the close button is clicked
  document.getElementById('closePopup').addEventListener('click', function () {
    overlay.style.display = 'none';
    popupContainer.style.display = 'none';
  });

  // Close popup when clicking outside the popup
  overlay.addEventListener('click', function () {
    overlay.style.display = 'none';
    popupContainer.style.display = 'none';
  });

  