<?php

function generateChecklist() {

    require("database_inc.php");
    require_once("functions_inc.php");

    $checklist = getChecklist($conn, $_SESSION["userID"]);

    $checkboxMapping = [
        'MOA' => 'moa',
        'Medical Certificate' => 'medical',
        'Waiver' => 'waiver',
        'NBI Clearance' => 'nbi_clearance',
        'Birth Certificate' => 'birth_certificate',
        'Acceptance Form' => 'acceptance_form',
        'Recommendation Letter' => 'recommendation_letter',
        'Resume' => 'resume',
        'Cover Letter' => 'cover_letter',
        'TOR' => 'tor',
    ];

    foreach ($checkboxMapping as $checkboxName => $columnName) {
        echo '<div>';
        echo '<input type="checkbox" name="' . $checkboxName . '" disabled';

        if ($checklist[$columnName] !== null) {
            echo ' checked';
        }

        echo '>';
        echo '<label for="' . $checkboxName . '"> ' . ucfirst($checkboxName) . '</label>';
        echo '</div>';
    }
}
?>