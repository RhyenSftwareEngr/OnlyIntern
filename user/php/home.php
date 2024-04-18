<?php
session_start();
if (!isset($_SESSION["userID"])) {
    header("location: ../php/login.php");
    exit();
}
$userId = $_SESSION["userID"];
require_once(__DIR__ . "/../inc/database_inc.php");
require_once(__DIR__ . "/../inc/functions_inc.php");
require_once(__DIR__ . "/../inc/dashboard_calendar.php");
require_once(__DIR__ . "/../inc/dashboard_progress.php");
require_once(__DIR__ . "/../inc/dashboard_checklist.php");

// Fetch user data using idExist function
$userData = idExist($conn, $userId);

// Check if user data exists
if (!$userData) {
    // Handle the case where user data is not found
    exit("User data not found");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home | OnlyInterns</title>
    <link rel="stylesheet" href="../css/home.css?<?php echo date('l jS \of F Y h:i:s A'); ?>">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <!-- Above code is to create a new version of the css file every change-->
    <!-- Change to: <link rel="stylesheet" href="./css/styles.css> once css is final -->
</head>

<body class="">

    <?php
    if (isset($_GET['error'])) {

        echo '
            <div id="overlay" class="overlay" onclick="hidePopup()"></div>
            ';

        echo '<script>
                document.addEventListener("DOMContentLoaded", function() {
                    showPopup();
                });

                function showPopup() {
                    document.getElementById("overlay").style.display = "block";
                    document.getElementById("popup").style.display = "block";
                }
            </script>';
            
            echo "
            <div id=\"popup\" class=\"popup\">
            <div>";

            if ($_GET['error'] != "submitted") {
                $errorMessage = isset($_GET['message']) ? urldecode($_GET['message']) : "An error occurred.";
                echo "<h3>Error: " . $errorMessage . "</h3>";
            } else {
                $successMessage = isset($_GET['message']) ? urldecode($_GET['message']) : "Successfully Submitted!";
                echo "<h3>$successMessage</h3>";
            }
            

            echo "<button id=\"popup-button\" onclick=\"hidePopup()\">Close</button>
            </div>
            </div>

        
            <script>
                function hidePopup() {
                    document.getElementById(\"overlay\").style.display = \"none\";
                    document.getElementById(\"popup\").style.display = \"none\";
                }
            </script>
            ";
    }
    ?>

    <div class="sidebar">
        <div class="logo-container-wrapper">
            <a href="../index.php" class="logo-container">
                <img src="../assets/logo/onlyinterns-logo.png" alt="logo">
                <h5>OnlyInterns</h5>
            </a>
        </div>
        <ul>
            <li class="activated">
                <a class="side-menus" href="#">
                    <svg class="bx bx-dashboard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z">
                        </path>
                    </svg>
                    Dashboard
                </a>
            </li>
            <li>
                <a class="side-menus" href="../php/user_details.php">
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
        <div id="calendar">
            <?php
            generateTable();
            ?>
            <table>
                <tbody>
                    <tr>
                        <!-- <th>Hours</th> -->
                        <th class="label missing" id="label-size"></th>
                        <th id="label-size">0h</th>
                        <th class="label incomplete" id="label-size"></th>
                        <th id="label-size">&lt;8h</th>
                        <th class="label complete" id="label-size"></th>
                        <th id="label-size">&gt;8h</th>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="hour-progress-widget">
            <?php
            generateProgressBar();
            ?>
            <script src="../js/dashboard_progress.js"></script>
        </div>

        <div id="add-hour-widget">
            <form id="add-hour-form" action="../inc/submit_hours_inc.php" method="post">
                <h4>Submit Hours</h4>
                <input type="number" name="hours" placeholder="Hours..." required>
                <input id="popup-button" type="submit" name="add-hour" value="Add">
            </form>
        </div>

        <div id="checklist-widget">
            <div id="checklist-container">
                <div id="checklist-header">
                    <h3>Checklist</h3>
                </div>
                <div id="checklist-data">
                    <?php
                    generateChecklist();
                    ?>
                </div>
            </div>
        </div>
    </main>

    <script src="../js/dashboard.js"></script>
</body>

</html>