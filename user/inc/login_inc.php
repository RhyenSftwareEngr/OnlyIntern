<?php

if (isset($_POST["login"])) {
    
    $id = $_POST["id"];
    $password = $_POST["password"];

    require_once("database_inc.php");
    require_once("functions_inc.php");

    if (emptyInput($id, $password) !== false) {
        header("location: ../php/login.php?error=emptyInput");
        exit();
    }

    if (idExist($conn, $id) === false) {
        header("location: ../php/login.php?error=invalidID");
        exit();
    }

    loginUser($conn, $id, $password);
    

} else {
    header("location: ../php/login.php");
    exit();
}