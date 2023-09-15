# API Sistema bancario utilizando express

## O que é este projeto ?
Api de um banco digital

## Ferramentas utilizadas
<div>
<img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" width="40" height="40"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" height="40"/>         
</div>

## Funcionalidades 
 - Listar as contas existentes.
 - Criar uma nova conta.
 - Atualizar os dados de usuario de uma conta.
 - Excluir uma conta.
 - Fazer depósitos.
 - Fazer saques.
 - Fazer transferencias entre contas.
 - Consultar saldo.
 - Consultar extrato.

## Pre-requesitos
- [Node](http://nodejs.org/)

## Dependencias
- [Date-fns](https://date-fns.org/)
- [Express](https://expressjs.com/)

### Preparação

```
git clone https://github.com/Glaydonlima/desafio-modulo-02-sistema-bancario-b2b-ifood-t08

cd desafio-modulo-02-sistema-bancario-b2b-ifood-t08

npm install
```

### Run

```

npm run dev

```

## Rotas disponiveis
### Get
- Listar Contas : `/contas?senha_banco=Cubos123Bank`
- Mostrar Saldo : `/contas/saldo`
- Mostrar Extrato : `/contas/extrato`

### Post
- Criar Conta : `/contas`
- Depositar : `/transacoes/depositar`
- Sacar : `/transacoes/sacar`
- Transferir : `/transacoes/transferir`

### Put
- Atualizar Usuario : `/contas/:numeroConta/usuario`

### Delete
- Excluir Usuario : `/contas/:numeroConta`

## Observações de requisições
Rotas put e post deve ser enviado requisições JSON no body, utilize uma ferramenta de teste de APIs como o [Insominia](https://insomnia.rest/download).

**Criar Conta**
#### `POST` `/contas`
```
{
    "nome": "João Peter",
    "cpf": "00011122234",
    "data_nascimento": "2000-01-01",
    "telefone": "11999999999",
    "email": "Jpmjr@email.com",
    "senha": "12345"
}
```
##### Exemplo:
![image](https://user-images.githubusercontent.com/101594250/268389681-50edd4b0-4c05-4be9-a61a-514a0124371f.PNG)

**Modificar Usuario**
#### `PUT` `/contas/:numeroConta/usuario`
```
{
    "nome": "Marcelo Pedro",
    "cpf": "99911122234",
    "data_nascimento": "2000-02-02",
    "telefone": "85999998888",
    "email": "mp2000@email2.com",
    "senha": "123456"
}
```
*Obs: Alterar parâmetro da URL :numeroConta coloque o numero da conta que deseja alterar o usuário.
Ex: localhost:3000/contas/1/usuario*
##### Exemplo:
![image](https://user-images.githubusercontent.com/101594250/268389814-7c02f5c7-a5a1-42eb-9a95-52dbf3444736.PNG)

**Depositar**
#### `POST` `/transacoes/depositar`
```
{
	"numero_conta": "1",
	"valor": 1900
}
```
##### Exemplo:
![image](https://user-images.githubusercontent.com/101594250/268389782-79740471-4940-451f-8f94-d0321148cc6d.PNG)

**Sacar**
#### `POST` `/transacoes/sacar`
```
{
	"numero_conta": "1",
	"valor": 1900,
    "senha": "123456"
}
```
##### Exemplo:
![image](https://user-images.githubusercontent.com/101594250/268389846-ee635479-17c5-4479-90a0-db8d162aa25d.PNG)

**Transferir**
#### `POST` `/transacoes/transferir`
```
{
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
}
```
##### Exemplo:
![image](https://user-images.githubusercontent.com/101594250/268389869-6b4ff4e0-ae09-4612-99d1-32933fe2aa5a.PNG)

## Respostas sempre serão em JSON, como no exemplo de extrato abaixo:
![image](https://user-images.githubusercontent.com/101594250/268390250-4aa402df-61b9-4c44-8fa1-8ce34dc97a37.PNG)

