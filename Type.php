<?php
class Type {
	
	function __construct() {
		include_once("DBConnection.php");
		$db = new DBCOnnection();
		$servername = $db->hostname;
		$username = $db->username;
		$password = $db->password;
		$charset = "utf8mb4";
		$database = $db->database;
		$dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
		$options = [
			PDO::ATTR_ERRMODE				=> PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE	=> PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES		=> true,
		];
		try {
			$this->conn = new PDO($dsn, $username, $password);
		} catch (\PDOException $e) {
			throw new \PDOException($e->getMessage(), (int)$e->getCode());
		}
	}
	
	function editJobType($id, $type) {
		if (isset($id) && $id >0 && isset($type)) {
			$sql = "UPDATE types set type = ? WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $type);
			$statement->bindParam(2, $id);
			$statement->execute();
		}
	}
	
	function removeJobType($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE types SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addJobType($type) {
		if (isset($type)) {
			$sql = "INSERT INTO types SET type= ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $type);
			$statement->execute();
		}
	}
	
	function getJobTypeById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * FROM types WHERE id = ? AND deleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
	
	function getAllTypes() {
		$sql = "SELECT * from types WHERE deleted = 0";
		$statement = $this->conn->query($sql);
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
}
?>