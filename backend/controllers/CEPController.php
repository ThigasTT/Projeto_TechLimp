<?php
include_once '../services/ViaCEPService.php';
include_once '../models/CEP.php';

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

    public function salvarCep($cep) {
        $dados = ViaCEPService::buscarCep($cep);

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
}