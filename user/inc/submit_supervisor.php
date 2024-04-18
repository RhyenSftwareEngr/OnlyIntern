<?php

if (isset($_POST["submit-supervisor-info"])) {
    session_start();
    $first_name = $_POST["first_name"];
    $middle_name = $_POST["middle_name"];
    $last_name = $_POST["last_name"];
    $role = $_POST["role"];
    
    require("database_inc.php");
    require("functions_inc.php");

    submitSupervisorInfo($conn, $_SESSION["userID"], $first_name, $middle_name, $last_name, $role);
    $successMessage = "Successfully submitted!";
    header("location: ../php/user_details.php?error=submitted&message=" . urlencode($successMessage));

} else {
    header("location: ../php/user_details.php");
    exit();
}