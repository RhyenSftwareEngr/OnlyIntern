<?php
require(__DIR__ . "/../inc/database_inc.php");
require(__DIR__ . "/../inc/functions_inc.php");


if(isset($_POST['stud_id'])) {
    $id = htmlspecialchars($_POST['stud_id']);
    $company_name = htmlspecialchars($_POST['company_name']);
    $company_address = htmlspecialchars($_POST['company_address']);
    $company_email = htmlspecialchars($_POST['company_email']);
    $company_phone = htmlspecialchars($_POST['company_phone']);
    $sup_fname = htmlspecialchars($_POST['sup_fname']);
    $sup_mname = htmlspecialchars($_POST['sup_mname']);
    $sup_lname = htmlspecialchars($_POST['sup_lname']);
    $sup_role = htmlspecialchars($_POST['sup_role']);
 
    $company_id = submitCompanyInfo($conn, $company_name, $company_address, $company_email, $company_phone);
    $sup_id = submitSupervisorInfo($conn, $sup_fname, $sup_mname, $sup_lname, $sup_role, $company_id);
    submitSupToStud($conn, $id, $sup_id);

    $response = array();
    $response["message"] = "success";

    $jsonResponse = json_encode($response);

    echo $jsonResponse; 
} else {
    echo json_encode(array('error' => 'ID parameter is missing' . $_POST['stud_id'] . " ."));
}

?>