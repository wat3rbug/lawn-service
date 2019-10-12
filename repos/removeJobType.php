<?php
require "Tables/Type.php";
$id =$_POST['id'];
if (isset($id) && $id > 0) {
	$db = new Type();
	$db->removeJobType($id);
}
?>