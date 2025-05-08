<?php
class PontoDescarte {
    private $conn;
    private $table = "Ponto_Descarte";

    public $id_ponto;
    public $id_cep;
    public $nome_ponto;
    public $contato_ponto;
    public $latitude;
    public $longitude;

    public function __construct($db) {
        $this->conn = $db;
    }
// buscar pontos de descarte
    public function getAll() {
        $query = "
            SELECT 
                p.id_ponto,
                p.id_cep,
                p.nome_ponto,
                p.contato_ponto,
                p.latitude,
                p.longitude,
                c.cep,
                c.logradouro, 
                c.bairro, 
                c.cidade, 
                c.uf 
            FROM " . $this->table . " as p
            JOIN CEP as c ON p.id_cep = c.id_cep
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
// criar pontos de descarte
    public function save() {
        $query = "
            INSERT INTO " . $this->table . " (id_cep, nome_ponto, contato_ponto)
            VALUES (:id_cep, :nome_ponto, :contato_ponto)
            ON DUPLICATE KEY UPDATE 
                nome_ponto = VALUES(nome_ponto),
                contato_ponto = VALUES(contato_ponto)
        ";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_cep', $this->id_cep);
        $stmt->bindParam(':nome_ponto', $this->nome_ponto);
        $stmt->bindParam(':contato_ponto', $this->contato_ponto);

        return $stmt->execute();
    }
//atualizar pontos de descarte
    public function update() {
      
        $query = "
            UPDATE " . $this->table . " 
            SET 
                id_cep = :id_cep,
                nome_ponto = :nome_ponto,
                contato_ponto = :contato_ponto
            WHERE id_ponto = :id_ponto
        ";
    
        $stmt = $this->conn->prepare($query);
    
     
        $stmt->bindParam(":id_ponto", $this->id_ponto);
        $stmt->bindParam(":id_cep", $this->id_cep);
        $stmt->bindParam(":nome_ponto", $this->nome_ponto);
        $stmt->bindParam(":contato_ponto", $this->contato_ponto);
    
     
        if ($stmt->execute()) {
            return true;
        } else {
            $errorInfo = $stmt->errorInfo();
            error_log("Erro ao atualizar ponto de descarte: " . implode(", ", $errorInfo));
            return false;
        }
    }
    //descartar pontos de descarte
    public function delete() {
        $query = "DELETE from ".$this->table." where id_ponto = :id_ponto";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_ponto",$this->id_ponto);

        if ($stmt->execute()) {
            return true;
        } else {
            $errorInfo = $stmt->errorInfo();
            error_log("Erro ao deletar ponto de descarte: " . implode(", ", $errorInfo));
            return false;
        }
    }


}