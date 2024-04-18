<?php

if (isset($_POST["submit-supervisor-info"])) {
    session_start();
    $company_name = $_POST["company_name"];
    $address = $_POST["address"];
    $email = $_POST["email"];
    $phone_no = $_POST["phone_no"];
    
    require("database_inc.php");
    require("functions_inc.php");

    submitCompanyInfo($conn, $_SESSION["userID"], $first_name, $middle_name, $last_name, $role);
    $successMessage = "Successfully submitted!";
    header("location: ../php/user_details.php" . urlencode($successMessage));

} else {
    header("location: ../php/user_details.php");
    exit();
}