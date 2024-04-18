<?php
require(__DIR__ . "/../inc/database_inc.php");
require(__DIR__ . "/../inc/functions_inc.php");

header('Content-Type: application/json');

if(isset($_GET['id'])) {
    $id = htmlspecialchars($_GET['id']);

    $data = getStudentDataAll($conn, $id);

    $jsonResponse = json_encode($data);

    echo $jsonResponse;
} else {
    echo json_encode(array('error' => 'ID parameter is missing'));
}

?>