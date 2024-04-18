<?php
header("HTTP/1.0 404 Not Found");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Page Not Found | OnlyInterns</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body style="display: flex; flex-direction: column; align-items: center; min-height: 100vh; margin: 0;">
    <nav>
        <a href="index.php" class="logo-container">
            <img src="../assets/logo/onlyinterns-logo.png" alt="Website-Logo">
            <h5>OnlyInterns</h5>
        </a>
    </nav>

    <div class="image-container" style="text-align: center; margin-top: 20px;">
        <img src="../assets/img/404.jpg" alt="Your Image" style="max-width: 100%;">
    </div>

    <div class="container">
        <h1>404 Page Not Found</h1>
        <p>The URL: <?php echo $_SERVER['REQUEST_URI']; ?> <strong>Does not exist.</strong></p>
    </div>

    <footer class="footer" style="width: 100%; background-color: #f8f9fa; padding: 10px; text-align: center; margin-top: auto;">
        <span class="footer-title" style="font-weight: bold;">OnlyInterns</span>
        <p>Copyright &copy; <a href="#">2023 Gusto Ko Fries</a>. All Rights Reserved</p>
    </footer>
</body>

</html>
