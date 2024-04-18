const userID = document.getElementById('userID').value;
const companyNameElement = document.getElementById('companyName');
const companyAddressElement = document.getElementById('companyAddress');
const companyEmailElement = document.getElementById('companyEmail');
const companyPhoneNoElement = document.getElementById('companyPhoneNo');
const supFNameElement = document.getElementById('companySFName');
const supMNameElement = document.getElementById('companySMName');
const supLNameElemet = document.getElementById('companySLName');
const supRoleElement = document.getElementById('companySRole');

$.ajax({
    url: '../api/.php',
    type: 'POST',
    data: { stud_id: userID }, // Pass the ID as a parameter
    dataType: 'json',
    success: function(response) {
        console.log(response);

        // Access the data in the response
        var userId = response.id;
        var username = response.username;
        var firstname = response.firstname;

        // Now you can use userId, username, and firstname as needed
    },
    error: function(error) {
        console.error('Error fetching JSON:', error);
    }
});