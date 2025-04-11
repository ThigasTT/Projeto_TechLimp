<?php
// URL base da API
// Atualize o base_url para apontar para o arquivo correto
$base_url = "http://localhost/Projeto_TechLimp/backend/routes";
// Função para enviar requisições HTTP
function sendRequest($method, $endpoint, $data = null) {
    // Não adicione "/" no início de $endpoint
    $url = $GLOBALS['base_url'] . $endpoint;

    $options = [
        'http' => [
            'method' => $method,
            'header' => "Content-Type: application/json",
        ]
    ];

    if ($data) {
        $options['http']['content'] = json_encode($data);
    }

    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    return json_decode($response, true);
}

// Testar Inserção de Usuário
function testCreateUser() {
    echo "Testando Inserção:\n";
    $data = [
        "id_cep" => 1,
        "nome_user" => "Teste User",
        "telefone_celular_user" => "11999999999",
        "email_user" => "teste@email.com",
        "senha_user" => "senha123",
        "complemento" => "Apto 101"
    ];
    print_r($data); // Verificar os dados enviados
    $response = sendRequest("POST", "/users", $data);
    print_r($response); // Verificar a resposta da API
}

// Testar Consulta de Usuários
function testGetUsers() {
    $response = sendRequest("GET", "/users");
    print_r($response);
}

// Testar Atualização de Usuário
function testUpdateUser() {
    $data = [
        "id_user" => 1,
        "id_cep" => 2,
        "nome_user" => "Teste User Atualizado",
        "telefone_celular_user" => "11988888888",
        "email_user" => "teste.novo@email.com",
        "senha_user" => "nova_senha123",
        "complemento" => "Apto 202"
    ];
    $response = sendRequest("PUT", "/users", $data);
    print_r($response);
}

// Testar Exclusão de Usuário
function testDeleteUser() {
    $data = ["id_user" => 1];
    $response = sendRequest("DELETE", "/users", $data);
    print_r($response);
}

// Executar Testes
echo "Testando Inserção:\n";
testCreateUser();

echo "\nTestando Consulta:\n";
testGetUsers();

echo "\nTestando Atualização:\n";
testUpdateUser();

echo "\nTestando Exclusão:\n";
testDeleteUser();