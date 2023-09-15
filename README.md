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

**Depositar**
#### `POST` `/transacoes/depositar`
```
{
	"numero_conta": "1",
	"valor": 1900
}
```

**Sacar**
#### `POST` `/transacoes/sacar`
```
{
	"numero_conta": "1",
	"valor": 1900,
    "senha": "123456"
}
```
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
### Respostas sempre serão em JSON, como no exemplo abaixo:
![image]()

