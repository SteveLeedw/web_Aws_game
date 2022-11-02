<?php
require 'database.php';

session_start();
require 'database.php';
        $username= $_SESSION['username'];
        $pwd_guess= $_SESSION['password'];
                $stmt = $mysqli->prepare("SELECT COUNT(*), username, password FROM users WHERE username=?");

        $stmt->bind_param('s', $username);
                $stmt->execute();
        $stmt->bind_result($cnt, $user_id, $pwd_hash);
                $stmt->fetch();
        if( $cnt == 1 && crypt($pwd_guess, $pwd_hash)==$pwd_hash){
                $_SESSION['user_id'] = $user_id;
                header("Location: home.html");
                        }else{
                                header("Location: home.php");
                                        }
?>