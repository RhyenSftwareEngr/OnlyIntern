<?php
session_start();

if (!isset($_SESSION["userID"])) {
    // Handle the case where userID is not set
    exit("User ID not found");
}

$userId = $_SESSION["userID"];

require_once(__DIR__ . "/../inc/database_inc.php");
require_once(__DIR__ . "/../inc/functions_inc.php");

// Fetch user data using idExist function
$userData = idExist($conn, $userId);

// Check if user data exists
if (!$userData) {
    // Handle the case where user data is not found
    exit("User data not found");
}

// Construct the image path
$imagePath = '../assets/img/profiles/students/' . $userId . '.jpg';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home | OnlyInterns</title>
    <link rel="stylesheet" href="../css/user_details.css?<?php echo date('l jS \of F Y h:i:s A'); ?>">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <!-- Above code is to create a new version of the css file every change-->
    <!-- Change to: <link rel="stylesheet" href="./css/styles.css> once css is final -->

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</head>

<body class="">
    <div id="overlay" class="overlay" onclick="hidePopup()"></div>

    <div id="popup" class="popup">
        <div>
            <h3>Added Successfully</h3>
            <button id="popup-button" onclick="hidePopup()">Close</button>
        </div>
    </div>

    <script>
        function hidePopup() {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("popup").style.display = "none";
        }
    </script>

    <div class="sidebar">
        <div class="logo-container-wrapper">
            <a href="../index.php" class="logo-container">
                <img src="../assets/logo/onlyinterns-logo.png" alt="logo">
                <h5>OnlyInterns</h5>
            </a>
        </div>
        <ul>
            <li class="activated">
                <a class="side-menus" href="../php/home.php">
                    <svg class="bx bx-dashboard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z">
                        </path>
                    </svg>
                    Dashboard
                </a>
            </li>
            <li class="activated-details">
                <a class="side-menus" href="#">
                    <svg class="bx bx-dashboard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M9.715 12c1.151 0 2-.849 2-2s-.849-2-2-2-2 .849-2 2 .848 2 2 2z"></path>
                        <path
                            d="M20 4H4c-1.103 0-2 .841-2 1.875v12.25C2 19.159 2.897 20 4 20h16c1.103 0 2-.841 2-1.875V5.875C22 4.841 21.103 4 20 4zm0 14-16-.011V6l16 .011V18z">
                        </path>
                        <path
                            d="M14 9h4v2h-4zm1 4h3v2h-3zm-1.57 2.536c0-1.374-1.676-2.786-3.715-2.786S6 14.162 6 15.536V16h7.43v-.464z">
                        </path>
                    </svg>
                    Personal Details
                </a>
            </li>
            <li>
                <a class="side-menus" href="../inc/logout_inc.php">
                    <svg class="bx bx-dashboard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                        <path
                            d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z">
                        </path>
                    </svg>
                    Logout
                </a>
            </li>
        </ul>
    </div>
    <nav>
        <svg id="menu-icon" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24">
            <path id="menu-path" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
        </svg>
        <span><?php echo $userData["first_name"] . ' ' . $userData["middle_name"] . ' ' . $userData["last_name"]; ?></span>
    </nav>
    <main>
        <div class="upload-container">
            <img id="photoPreview" src="<?php echo $imagePath; ?>" alt="Preview" class="profile-image">
        </div>

        <div class="personal-details">
            <h5>PERSONAL DETAILS</h5>

            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value="<?php echo $userData["first_name"]; ?>" readonly>

            <label for="middleName">Middle Name:</label>
            <input type="text" id="middleName" name="middleName" value="<?php echo $userData["middle_name"]; ?>"
                readonly>

            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value="<?php echo $userData["last_name"]; ?>"
                readonly>

            <label for="gender">Gender:</label>
            <input type="text" id="gender" name="gender" value="<?php echo $userData["gender"]; ?>" readonly>

            <label for="birthday">Birthday:</label>
            <input type="text" id="birthday" name="birthday" value="<?php echo $userData["birthday"]; ?>"
                readonly>

            <h5>CONTACT DETAILS</h5>
            <label for="email">Email Address:</label>
            <input type="text" id="email" name="email"
                value="<?php echo $userData["stud_id"] . '@slu.edu.ph'; ?>" readonly>

            <h5>ACCOUNT DETAILS</h5>
            <label for="userID">User ID:</label>
            <input type="text" id="userID" name="userID" value="<?php echo $userData["stud_id"]; ?>" readonly>

            <label for="userName">Account Name:</label>
            <input type="text" id="userName" name="userName"
                value="<?php echo $userData["first_name"] . ' ' . $userData["middle_name"] . ' ' . $userData["last_name"]; ?>"
                readonly>
        </div>

        <form class="company-information" action="../inc/submit_company_supervisor.php" method="post">
            <h5>COMPANY DETAILS</h5>

            <div class="form-group">
                <input type="text" id="companyName" name="companyName" placeholder="Company Name">
                <label for="companyName" class="input-required">Company Name:</label>
            </div>
            
            <div class="form-group">
                <input type="text" id="companyAddress" name="companyAdress" placeholder="Company Address">
                <label for="companyAddress" class="input-required">Company Address:</label>
            </div>

            <div class="form-group">   
                <input type="text" id="companyEmail" name="companyEmail"placeholder="Company Email">
                <label for="companyEmail" class="input-required">Company Email:</label>
            </div>

            <div class="form-group">
                <input type="text" id="companyPhoneNo" name="companyPhoneNo"placeholder="Company Phone Number">
                <label for="companyPhoneNo" class="input-required">Company Phone Number:</label>
            </div>
       
        <form class="supervisor-information" action="" method="post">
            <h5>SUPERVISOR DETAILS</h5>
            <div class="form-group">
                <input type="text" id="companySFName" name="companySFName" placeholder="Supervisor First Name">
                <label for="companySFName" class="input-required">Supervisor's First Name:</label>
            </div>

            <div class="form-group">
                <input type="text" id="companySMName" name="companySMName" placeholder="Supervisor Middle Name">
                <label for="companySMName" class="input-required">Supervisor's Middle Name:</label>
            </div>

            <div class="form-group">
                <input type="text" id="companySLName" name="companySLName" placeholder="Supervisor Last Name">
                <label for="companySLName" class="input-required">Supervisor's Last Name:</label>
            </div>

            <div class="form-group">
                <input type="text" id="companySRole" name="companySRole" placeholder="Supervisor Role">
                <label for="companySRole" class="input-required">Company Role:</label>
            </div>

            <div id=company-submit><input type="button" id="submit-button" value="Submit Changes" disabled></div>
        </form>

        <script src="../js/company_details.js">
    </main>
    <script src="../js/dashboard.js">

    </script>
</body>

</html>