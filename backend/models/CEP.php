<?php
class CEP {
    private $conn;
    private $table = "CEP";

    public $cep;
    public $logradouro;
    public $bairro;
    public $cidade;
    public $uf;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function save() {
        $query = "
            INSERT INTO " . $this->table . " (cep, logradouro, bairro, cidade, uf)
            VALUES (:cep, :logradouro, :bairro, :cidade, :uf)
            ON DUPLICATE KEY UPDATE 
                logradouro = VALUES(logradouro),
                bairro = VALUES(bairro),
                cidade = VALUES(cidade),
                uf = VALUES(uf)
        ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':cep', $this->cep);
        $stmt->bindParam(':logradouro', $this->logradouro);
        $stmt->bindParam(':bairro', $this->bairro);
        $stmt->bindParam(':cidade', $this->cidade);
        $stmt->bindParam(':uf', $this->uf);

        return $stmt->execute();
    }
}