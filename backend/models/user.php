<?php
class User {
    private $conn;
    public $id_user;
    public $nome_user;
    public $email_user;
    public $senha_user;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obter todos os usuários
    public function getAll() {
        $query = "
            SELECT 
                id_user, 
                nome_user, 
                email_user
            FROM usuario 
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Criar um novo usuário
    public function create() {
        $query = "
            INSERT INTO usuario
            (nome_user, email_user, senha_user) 
            VALUES (:nome_user, :email_user, :senha_user)
        ";
        $stmt = $this->conn->prepare($query);

   
        $stmt->bindParam(":nome_user", $this->nome_user);
        $stmt->bindParam(":email_user", $this->email_user);
        $stmt->bindParam(":senha_user", $this->senha_user);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    //login do usuario (termine isso ja)
    public function loginUser($email){
        $query = "
        SELECT * FROM usuario where email_user = :email";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":email", $email);
        $stmt->execute();
        return $stmt;
    }
    // Atualizar um usuário existente
    public function updateUser() {
        $query = "
            UPDATE usuario 
            SET 
                nome_user = :nome_user,
                email_user = :email_user,
                senha_user = :senha_user
            WHERE id_user = :id_user
        ";
    
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(":id_user", $this->id_user);

        $stmt->bindParam(":nome_user", $this->nome_user);
        $stmt->bindParam(":email_user", $this->email_user);
        $stmt->bindParam(":senha_user", $this->senha_user);
    
        // Executar a query
        return $stmt->execute();
    }

    // Excluir um usuário
    public function delete() {
        $query = "DELETE FROM usuario WHERE id_user = :id_user";
    
        $stmt = $this->conn->prepare($query);
    
        // Bind do parâmetro
        $stmt->bindParam(":id_user", $this->id_user);
    
        // Executar a query e retornar o resultado
        return $stmt->execute();
    }
}