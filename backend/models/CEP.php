<?php
class CEP {
    private $conn;
    private $table = "CEP";

    public $id_cep;
    public $cep;
    public $logradouro;
    public $bairro;
    public $cidade;
    public $uf;

    public function __construct($db) {
        $this->conn = $db;
    }


    public function save() {
        // Remove o hífen do CEP antes de salvar
        $this->cep = str_replace("-", "", $this->cep);

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

    public function getAll() {
        $query = "
            SELECT
                id_cep,
                cep, 
                logradouro, 
                bairro, 
                cidade, 
                uf 
            FROM " . $this->table . "
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    public function getById($id) {
        $query = "
        SELECT id_cep,
        cep,
        logradouro,
        bairro,
        cidade,
        uf FROM ".$this->table . " WHERE id_cep = :id_cep";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_cep",$id);
        $stmt->execute();
        return $stmt;
    }
}
?>