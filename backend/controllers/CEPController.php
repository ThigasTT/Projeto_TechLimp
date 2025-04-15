<?php
include_once '../services/ViaCEPService.php';
include_once '../models/CEP.php';

class CEPController {
    private $db;
    private $cepModel;

    // Construtor ajustado para receber a conexão com o banco de dados
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
        // Lê os dados da requisição
        $data = json_decode(file_get_contents('php://input'), true);

        // Valida se o campo 'cep' foi enviado
        if (!isset($data['cep'])) {
            echo json_encode(["error" => "O campo 'cep' é obrigatório."]);
            return;
        }

        // Busca os dados do CEP
        $dados = ViaCEPService::buscarCep($data['cep']);

        if (isset($dados['error'])) {
            echo json_encode($dados);
            return;
        }

        // Preenche o modelo com os dados do CEP
        $this->cepModel->cep = $dados['cep'];
        $this->cepModel->logradouro = $dados['logradouro'];
        $this->cepModel->bairro = $dados['bairro'];
        $this->cepModel->cidade = $dados['localidade'];
        $this->cepModel->uf = $dados['uf'];

        // Salva o CEP no banco de dados
        if ($this->cepModel->save()) {
            echo json_encode(["message" => "CEP salvo com sucesso"]);
        } else {
            echo json_encode(["error" => "Erro ao salvar CEP no banco de dados"]);
        }
    }
}