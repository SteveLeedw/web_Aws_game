<?php
        require 'database.php';
        session_start();

                $username= $_SESSION['username'];
                $pwd= $_SESSION['password'];
                $email= $_SESSION['email'];
                $pwd_hash= crypt($pwd);
                                $stmt= $mysqli->prepare("insert into users (username, password, email_address) values (?, ?, ?)");
                                if (!$stmt){
                                                        printf("Query Prep Failed: %s\n", $mysqli->error);
                                                                        exit;
                                                                }

                                        $stmt->bind_param('sss', $username, $pwd_hash, $email);

                                        $stmt->execute();

                                                $stmt->close();
                                                header("Location: select.php");
?>