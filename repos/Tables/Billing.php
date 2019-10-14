<?php
class Billing {
	
	private $conn;
	
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
	function clearAllJobsForId($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE billing set deleted = 1 where job_id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function removeBillingItem($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE billing set deleted = 1 where id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function addBillingItem($jobid, $item, $cost, $quantity) {
		if (isset($jobid) && $jobid > 0) {
			$sql = "INSERT INTO billing (item, cost, quantity, job_id) VALUES (?, ?, ?, ?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $item);
			$statement->bindParam(2, $cost);
			$statement->bindParam(3, $quantity);
			$statement->bindParam(4, $jobid);
			$statement->execute();
		}
	}
	
	function getBillingForId($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * from billing where job_id  = ? AND deleted = 0 ORDER BY id ASC";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
		
	}
}
?>