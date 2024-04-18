<?php

function emptyInput($id, $password) {
    return ($id=="" || $password=="")?true:false;
}

function idExist($conn, $id) {
    if (!ctype_digit($id)) {
        return false;
    }

    $sql = "SELECT * FROM students WHERE stud_id = ?;";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/login.php?err=stmtFailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt,"i", $id);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        mysqli_stmt_close($stmt);
        return $row;
    } else {
        mysqli_stmt_close($stmt);
        return false;
    }
}

function loginUser($conn, $id, $password) {
    $usr_data = idExist($conn, $id);

    $hashedPassword = $usr_data["password"];
    $checkPwd = password_verify($password, $hashedPassword);

    if ($checkPwd === false) {
        header("location: ../php/login.php?error=invalidPassword");
    } else if ($checkPwd === true) {
        session_start();
        $_SESSION["userID"] = $usr_data["stud_id"];
    //    // Store all user data in the session
    //    $_SESSION["userData"] = $usr_data;
        header("location: ../php/home.php");
        exit();
    }
}


function getLog($conn, $id) {
    $sql = "SELECT * FROM student_report_log WHERE stud_id = ?;";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/home.php?err=stmtFailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt,"i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    $rows = [];
    while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }

    // foreach ($rows as $row) {
    //     debug_to_console($row);
    // }
    mysqli_stmt_close($stmt);
    return $rows;
   
}

function getStudentHours($conn, $id) {
    $sql = "SELECT * FROM `verified_total_hours` WHERE stud_id = ?;";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/home.php?err=stmtFailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt,"i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    $row = mysqli_fetch_assoc($result);

    // foreach ($rows as $row) {
    //     debug_to_console($row);
    // }
    mysqli_stmt_close($stmt);
    return $row;
   
}

function getDayOfDate($day, $month, $year) {
    $yearFirst = (int) substr($year, 0, 2);
    $yearLast = (int) substr($year, 2);

    $f = floor((13 * $month - 1) / 5);
    $g = floor($yearLast / 4);
    $h = floor($yearFirst / 4);
    $i = 2 * $yearFirst;

    return ($day + $f + $yearLast + $g + $h - (2 * $yearFirst)) % 7;
}

function getLogToday($conn, $id) {
    $sql = "SELECT * FROM student_report_log WHERE stud_id = ? AND date=?;";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/home.php?err=stmtFailed");
        exit();
    }

    $date = date("Y-m-d");

    mysqli_stmt_bind_param($stmt,"is", $id, $date);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    mysqli_stmt_close($stmt);
    return mysqli_fetch_assoc($result);
   
}

function submitHours($conn, $id, $hours) {
    $sql = "INSERT INTO `student_report_log` VALUES (NULL, ?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/home.php?err=stmtFailed");
        exit();
    }

    $date = date("Y-m-d");
    $defaultVerified = 0;
    mysqli_stmt_bind_param($stmt,"iiis", $id, $hours, $defaultVerified, $date);
    mysqli_stmt_execute($stmt);
}

function submitCompanyInfo($conn, $cName, $cAddress, $cEmail, $cPhoneNo) {
    $sql = "INSERT INTO `companies` VALUES (NULL, ?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/user_details.php?err=stmtFailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "ssss", $cName, $cAddress, $cEmail, $cPhoneNo);
    mysqli_stmt_execute($stmt);

    $sql = "SELECT comp_id FROM companies ORDER BY comp_id  DESC LIMIT 1";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/user_details.php?err=stmtFailed");
        exit();
    }

    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    return $row["comp_id"];
}

function submitSupervisorInfo($conn, $sFName, $sMName, $sLName, $sRole, $compID) {
    $sql = "INSERT INTO `supervisors` VALUES (NULL, ?, ?, ?, ?, ?);";
    $stmt = mysqli_stmt_init($conn);
    
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/user_details.php?err=stmtFailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "ssssi", $sFName, $sMName, $sLName, $sRole, $compID);
    mysqli_stmt_execute($stmt);

    $sql = "SELECT sup_id FROM supervisors ORDER BY sup_id  DESC LIMIT 1";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/user_details.php?err=stmtFailed");
        exit();
    }

    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $row = mysqli_fetch_assoc($result);
    return $row["sup_id"];
}

function submitSupToStud($conn, $studId, $supId) {
    $sql = "UPDATE `students` SET supervisor = ? WHERE stud_id = ?;";
    $stmt = mysqli_stmt_init($conn);
    
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/user_details.php?err=stmtFailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt, "ii", $supId, $studId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
}

function getChecklist($conn, $id) {
    $sql = "SELECT * FROM `student_checklists` WHERE stud_id = ?";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/login.php?err=stmtFailed");
        exit();
    }
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    mysqli_stmt_close($stmt);
    return mysqli_fetch_assoc($result);
   
}

function getTotalDaysInYear($year) {
    $isLeapYear = (date('L', mktime(0, 0, 0, 1, 1, $year)) == 1);
    return $isLeapYear ? 366 : 365;
}

function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

function getStudentDataAll($conn, $id) {
    $sql = "SELECT
    students.stud_id AS student_id,
    supervisors.sup_id AS supervisor_id,
    supervisors.first_name AS sup_first_name,
	supervisors.middle_name AS sup_middle_name,
    supervisors.last_name AS sup_last_name,
    supervisors.role AS sup_role,
    companies.comp_id AS company_id,
    companies.company_name AS company_name,
	companies.address AS comp_address,
    companies.email AS comp_email,
    companies.phone_no AS comp_phone
FROM
    students
INNER JOIN supervisors ON students.supervisor = supervisors.sup_id
INNER JOIN companies ON supervisors.company = companies.comp_id
WHERE stud_id = ?;";

    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("location: ../php/login.php?err=stmtFailed");
        exit();
    }

    mysqli_stmt_bind_param($stmt,"i", $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    
    $row = mysqli_fetch_assoc($result);

    mysqli_stmt_close($stmt);
    return $row;
}