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

<<<<<<< HEAD
    // Obter todos os usuários (com informações do CEP)
 public function getAll() {
    $query = "
        SELECT 
            id_user, 
            nome_user, 
            email_user
        FROM Usuario
    ";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
}
    
=======
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
>>>>>>> 285ac40640628aa73cb637003daee8c540ddae36

    public function getById($id) {
        $query =
            "select
                nome_user
            from usuario
            where id_user = :id_user
            ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_user", $id);
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
<<<<<<< HEAD
                senha_user = :senha_user
=======
>>>>>>> 285ac40640628aa73cb637003daee8c540ddae36
            WHERE id_user = :id_user
        ";
    
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(":id_user", $this->id_user);

        $stmt->bindParam(":nome_user", $this->nome_user);
        $stmt->bindParam(":email_user", $this->email_user);
 //       $stmt->bindParam(":senha_user", $this->senha_user);
    
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