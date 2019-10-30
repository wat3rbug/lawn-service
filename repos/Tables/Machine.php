<?php
class Machine {
	
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
	
	function editJobType($id, $machine) {
		if (isset($id) && $id >0 && isset($machine)) {
			$sql = "UPDATE machines SET name = ? WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $machine);
			$statement->bindParam(2, $id);
			$statement->execute();
		}
	}
	
	function removeMachine($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE machines SET isDeleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addMachine($machine) {
		if (isset($machine)) {
			$sql = "INSERT INTO machines SET name = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $machine);
			$statement->execute();
		}
	}
	
	function getMachineById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * FROM machines WHERE id = ? AND isDeleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
	
	function getAllMachines() {
		$sql = "SELECT * FROM machines WHERE isDeleted = 0";
		$statement = $this->conn->query($sql);
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
}
?>