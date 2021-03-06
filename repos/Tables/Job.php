<?php
class Job {
	
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
	function getAllJobs() {
		$sql = "SELECT jobs.id, job_date, cost, type, address_id, client_id, complete, clients.firstName, addresses.address1, types.uses_material  ";
		$sql .= "FROM jobs INNER JOIN types ON jobs.type_id = types.id INNER JOIN ";
		$sql .= "addresses ON jobs.address_id = addresses.id INNER JOIN clients ON jobs.client_id = clients.id where "; 
		$sql .= "jobs.deleted = 0 ORDER BY jobs.job_date DESC";
		$statement = $this->conn->query($sql);
		while($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function getAllJobsBetweenDates($beginning, $end) {
		if (isset($beginning) && isset($end)) {
			$sql = "SELECT jobs.id, job_date, cost, type, address_id, client_id, complete, clients.firstName, addresses.address1, types.uses_material FROM jobs INNER JOIN types ON jobs.type_id = types.id INNER JOIN addresses ON jobs.address_id = addresses.id INNER JOIN clients ON jobs.client_id = clients.id where jobs.deleted = 0 AND jobs.job_date BETWEEN ? AND ? ORDER BY jobs.job_date DESC";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $beginning);
			$statement->bindParam(2, $end);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
	
	function toggleJobComplete($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT complete from jobs WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			$raw = NULL;
			while ($row = $statement->fetch()) {
				$raw = $row['complete'];
			}
			$complete = ($raw == 0) ? 1 : 0;
			$sql = "UPDATE jobs set complete = ? where id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $complete);
			$statement->bindParam(2, $id);
			$statement->execute();
		}
	}
	
	function removeJob($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE jobs SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			$sql = "UPDATE billing set deleted = 1 WHERE job_id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function getJobDetailsForId($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT jobs.id, jobs.cost, jobs.job_date, jobs.client_id, jobs.address_id, jobs.type_id, types.uses_material FROM jobs JOIN types ON jobs.type_id = types.id WHERE jobs.id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
		}
		return $output;
	}
	
	function getJobForId($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * FROM jobs WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
		}
		return $output;
	}
	
	function addJob($date, $cost, $type, $address, $client) {
		$sql = "INSERT INTO jobs (job_date, cost, type_id, address_id, client_id) VALUES (?, ?, ?, ?, ?)";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $date);
		$statement->bindParam(2, $cost);
		$statement->bindParam(3, $type);
		$statement->bindParam(4, $address);
		$statement->bindParam(5, $client);
		$statement->execute();
		$sql = "SELECT id FROM jobs where job_date = ? AND cost = ? AND type_id = ? AND address_id = ? AND client_id = ? ORDER BY id DESC LIMIT 1";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $date);
		$statement->bindParam(2, $cost);
		$statement->bindParam(3, $type);
		$statement->bindParam(4, $address);
		$statement->bindParam(5, $client);
		$statement->execute();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}

	
	function editJob($date, $cost, $type, $address, $client, $id) {
		$sql = "UPDATE jobs SET job_date = ?, cost = ?, type_id = ?, address_id = ?, client_id = ? WHERE id = ?";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $date);
		$statement->bindParam(2, $cost);
		$statement->bindParam(3, $type);
		$statement->bindParam(4, $address);
		$statement->bindParam(5, $client);
		$statement->bindParam(6, $id);
		$statement->execute();
	}
}
?>