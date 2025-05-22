<?php
include_once '../services/ViaCEPService.php';
include_once '../models/CEP.php';
include_once '../config/database.php';

class CEPController {
    private $db;
    private $cepModel;


    public function __construct($dbConnection) {
        $this->db = $dbConnection;
        $this->cepModel = new CEP($this->db);
    }

    public function buscarCepExterno($cep) {
        $dados = ViaCEPService::buscarCep($cep);

        if (isset($dados['error'])) {
            echo json_encode($dados);
            return;
        }

        echo json_encode($dados);
    }

    public function salvarCep() {

        $data = json_decode(file_get_contents('php://input'), true);


        if (!isset($data['cep'])) {
            echo json_encode(["error" => "O campo 'cep' é obrigatório."]);
            return;
        }

  
        $dados = ViaCEPService::buscarCep($data['cep']);

        if (isset($dados['error'])) {
            echo json_encode($dados);
            return;
        }

     
        $this->cepModel->cep = $dados['cep'];
        $this->cepModel->logradouro = $dados['logradouro'];
        $this->cepModel->bairro = $dados['bairro'];
        $this->cepModel->cidade = $dados['localidade'];
        $this->cepModel->uf = $dados['uf'];

      
        if ($this->cepModel->save()) {
            echo json_encode(["message" => "CEP salvo com sucesso"]);
        } else {
            echo json_encode(["error" => "Erro ao salvar CEP no banco de dados"]);
        }
    }
    

    public function buscarCEPs() {
        $stmt = $this->cepModel->getAll();
        $num = $stmt->rowCount();
    
        if ($num > 0) {
            $ceps = array();
    
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $ceps_item = array(
                    "id_cep" => $row['id_cep'],
                    "cep" => $row['cep'],
                    "logradouro" => $row['logradouro'],
                    "bairro" => $row['bairro'],
                    "cidade" => $row['cidade'],
                    "uf" => $row['uf']
                );
                array_push($ceps, $ceps_item);
            }
    
            echo json_encode($ceps);
        } else {
            echo json_encode(["message" => "Nenhum cep encontrado."]);
        }
    }
    }
