!DOCTYPE html>
<html>
<head>
        <meta charset="UTF-8">
        <title>Steve Gaming</title>
        <style type= "text/css">
                body{
                        background-image: url('https://www.telegraph.co.uk/content/dam/betting/Better-Collective/4-Omaha-xlarge.jpg');
                        text-align: center;
                        color: #FFFF00;
                        font-size: 30px;
                }
        </style>
</head>

<body>
<?php
session_start();


  if (isset($_POST['logout_btn'])){
              $_SESSION= array();
                  session_destroy();
                  echo "logout!";
                    }


        if (isset ($_POST ['register'])){
                                $_SESSION['username']= $_POST['username'];
                                                $_SESSION['password']= $_POST['password'];
                                                $_SESSION['email']= $_POST['email'];
                                                                header("Location: insert.php");
                                                        }

        if (isset ($_POST ['login'])){
                                $_SESSION['username']= $_POST['username'];
                                                $_SESSION['password']= $_POST['password'];
                                                $_SESSION['token'] = substr(md5(rand()), 0, 10);
                                                                header("Location: select.php");
                                                        }
?>
<h1> Welcome To Steve Game WebSite</h1>

<form method= "post">
        <label>Username: </label>
                <input type= "text" name= "username"/><br>
        <label>Password: </label>
                <input type= "password" name= "password"/><br>
        <label>Email: </label>
                <input type= "email" name= "email"/><br>
        <input type= "submit" name="register" value= "Register"/>
</form>


</body>
</html>