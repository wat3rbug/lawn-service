<?php
require "Job.php";
$db = new Job();
$id = $_POST['id'];

$db->removeJob($id);
?>