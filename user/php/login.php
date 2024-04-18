<?php 
    session_start();
    if (isset($_SESSION["userID"])) {
        header("location: ../php/home.php");
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | OnlyInterns</title>
    <link rel="stylesheet" href="../css/login.css?<?php echo date('l jS \of F Y h:i:s A'); ?>"> 
    <!-- Above code is to create a new version of the css file every change-->
    <!-- Change to: <link rel="stylesheet" href="./css/styles.css> once css is final -->
</head>
<body>
    <div class="login-container">
        <div class="title-container">
            <img src="../assets/logo/onlyinterns-logo.png" alt="logo">
            <h4>OnlyInterns</h4>
            
            <?php
                if (isset($_GET["error"])) {
                    echo "<p class=\"error\">";
                    if ($_GET["error"] == "emptyInput") {
                        echo "Please fill all of the fields.";
                    } else if ($_GET["error"] == "invalidID") {
                        echo "The ID you have entered is invalid.";
                    } else if ($_GET["error"] == "invalidPassword") {
                        echo "The password you have entered is incorrect.";
                    }
                } else {
                    echo "<p>Please enter credentials";
                }
                echo "</p>";
            ?>  
            
        </div>
        <form action="../inc/login_inc.php" method="post">
            <input type="text" name="id" placeholder="ID number" id="user-id">
            <input type="password" name="password" placeholder="Password" id="user-password">
            <input type="submit" name="login" value="Login" id="login-btn">
        </form>

    </div>
</body>
</html>