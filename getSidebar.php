<?php
$filename = "sidebar-partial.html";
$sidebar = fopen($filename, "r") or die("unable to read $filename");
echo fread($sidebar, filesize($filename));
fclose($sidebar);
?>
