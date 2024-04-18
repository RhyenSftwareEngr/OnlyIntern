<?php

if (isset($_POST["add-hour"])) {
    session_start();
    $hours = $_POST["hours"];
    

    require("database_inc.php");
    require("functions_inc.php");

    $existingLog = getLogToday($conn, $_SESSION["userID"]);

    if ($existingLog != null) {
        $errorMessage = "You have already submitted hours for today.";
        header("location: ../php/home.php?error=alreadySubmitted&message=" . urlencode($errorMessage));
        exit();
    }

    if ($hours < 0 || $hours > 24) {
        $errorMessage = "Invalid hours. Please enter a value between 0 and 24.";
        header("location: ../php/home.php?error=invalidHours&message=" . urlencode($errorMessage));
        exit();
    }

    require("database_inc.php");
    submitHours($conn, $_SESSION["userID"], $hours);
    $successMessage = "Successfully submitted!";
    header("location: ../php/home.php?error=submitted&message=" . urlencode($successMessage));

} else {
    header("location: ../php/home.php");
    exit();
}