<?php
$mysqli = new mysqli('localhost', 'steve', 'dlehddn92', 'useraccount');
if($mysqli->connect_errno) {
        printf("Connection Failed: %s\n", $mysqli->connect_error);
        exit;
}
?>