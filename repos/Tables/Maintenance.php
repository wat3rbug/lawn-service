<?php
class Maintenance {
	
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
	
	function editMaintenance($id, $date, $duration, $description) {
		if (isset($id) && $id > 0 && isset($date) && isset($duration) && isset($description)) {
			$sql = "UPDATE maintenance SET last_checked = ?, duration_days = ?, description = ? WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $date);
			$statement->bindParam(2, $duration);
			$statement->bindParam(3, $description);
			$statement->bindParam(4, $id);
			$statement->execute();
		}
	}
	
	function removeMaintenance($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE maintenance SET isDeleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addMaintenance($machine, $duraction, $description, $last_checked) {
		if (isset($machine)) {
			$sql = "INSERT INTO maintenace (name, duration_days, description) VALUES (?, ?, ?, ?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $machine);
			$statement->bindParam(2, $duration);
			$statement->bindParam(3, $description);
			$statement->bindParam(4, $last_checked);
			$statement->execute();
		}
	}
	
	function getMaintenanceById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * FROM maintenance WHERE id = ? AND isDeleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
	
	function getAllChecks() {
		$sql = "SELECT maintenance.id, name, description, last_checked,duration_days FROM maintenance JOIN machines on machine_name = machines.id WHERE maintenance.isDeleted = 0";
		$statement = $this->conn->query($sql);
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function completeCheck($id, $today) {
		if (isset($id) && isset($today) && $id > 0) {
			$sql = "UPDATE maintenance SET last_checked = ? WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $today);
			$statement->bindParam(2, $id);
			$statement->execute();
		}
	}
}
?>