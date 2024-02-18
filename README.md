## Documentação da API REST para Conta de Usuário

### Introdução
A documentação de API é essencial para facilitar o uso da sua API por desenvolvedores. Neste caso, vamos criar uma API REST para gerenciar contas de usuário. Abaixo estão as rotas que implementaremos:

1. **Criar uma conta**: Rota para criar uma nova conta com informações como nome, e-mail, senha e CPF.
2. **Depósito**: Rota para adicionar fundos à conta, com descrição, valor e tipo (crédito ou débito).
3. **Consultar extratos**: Rota para visualizar os extratos da conta.
4. **Retirada**: Rota para retirar fundos da conta.
5. **Alterar nome ou e-mail**: Rota para atualizar o nome ou e-mail associado à conta.
6. **Informações da conta**: Rota para obter informações detalhadas sobre a conta.
7. **Deletar conta**: Rota para excluir uma conta existente.

### Rotas

#### 1. Criar uma conta
- **Método**: POST
- **Endpoint**: `/account`
- **Parâmetros**:
    - `name`: Nome do usuário
    - `email`: Endereço de e-mail
    - `password`: Senha
    - `cpf`: Número de CPF
- **Exemplo de requisição**:
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "secretpassword",
        "cpf": "12345678901"
    }
    ```
- **Resposta de sucesso**:
    - Status: 201 Created
    - Corpo da resposta: ''

#### 2. Depósito - Necessário cpf da conta criada em headers
- **Método**: POST
- **Endpoint**: `/deposit`
- **Parâmetros**:
    - `description`: Descrição do depósito
    - `value`: Valor do depósito
    - `type`: Tipo (crédito ou débito)
- **Exemplo de requisição**:
    ```json
    {
        "description": "Depósito inicial",
        "value": 100.00,
        "type": "credit"
    }
    ```
- **Resposta de sucesso**:
    - Status: 200 OK
    - Corpo da resposta: ''

#### 3. Consultar extratos - Necessário cpf da conta criada em headers
- **Método**: GET
- **Endpoint**: `/statement`
- **Resposta de sucesso**:
    - Status: 200 OK
    - Corpo da resposta: Lista de extratos da conta

#### 4. Retirada - Necessário cpf da conta criada em headers
- **Método**: POST
- **Endpoint**: `/withdraw`
- **Parâmetros**:
    - `value`: Valor da retirada
- **Exemplo de requisição**:
    ```json
    {
        "value": 50.00
    }
    ```
- **Resposta de sucesso**:
    - Status: 200 OK
    - Corpo da resposta: ''

#### 5. Alterar nome ou e-mail - Necessário cpf da conta criada em headers
- **Método**: PUT
- **Endpoint**: `/account`
- **Parâmetros**:
    - `name` (opcional): Novo nome do usuário
    - `email` (opcional): Novo endereço de e-mail
- **Exemplo de requisição**:
    ```json
    {
        "name": "Jane Doe"
    }
    ```
- **Resposta de sucesso**:
    - Status: 200 OK
    - Corpo da resposta: Dados atualizados com sucesso

#### 6. Informações da conta - Necessário cpf da conta criada em headers
- **Método**: GET
- **Endpoint**: `/account`
- **Resposta de sucesso**:
    - Status: 200 OK
    - Corpo da resposta: Informações detalhadas da conta

#### 7. Deletar conta - Necessário cpf da conta criada em headers
- **Método**: DELETE
- **Endpoint**: `/account`
- **Resposta de sucesso**:
    - Status: 200 OK
    - Corpo da resposta: Conta excluída com sucesso

Lembre-se de implementar os middlewares de verificação conforme mencionado nas rotas. Boa sorte! 🚀
