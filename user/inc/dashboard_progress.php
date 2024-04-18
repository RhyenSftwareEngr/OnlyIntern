<?php

function generateProgressBar() {

    require("database_inc.php");
    require_once("functions_inc.php");

    $studentHours = getStudentHours($conn, $_SESSION["userID"]);

    echo "<div id=\"progress-bar-div\">";
    echo "    <div id=\"progress-bar\" role=\"progressbar\" progress-bar></div>";
    echo "</div>";
    echo "<div id=\"progress-text-container\">";
    echo "    <h3 hour-value>".$studentHours["total_hours"]."/2000</h3>";
    echo "    <h5>hours</h5>";
    echo "</div>";

}
?>