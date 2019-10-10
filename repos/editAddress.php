<?php
require "Address.php";
$id = $_POST['id'];
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];

if (isset($id) && $id > 0) {
	$db = new Address();
	$db->editAddress($id, $address1, $address2, $city, $state, $zipcode);
}
?>