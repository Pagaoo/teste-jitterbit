Teste técnico Jitterbit
# Documentação da API de Pedidos (Orders API)

Esta documentação simples demonstra os principais endpoints da API de Pedidos, utilizando exemplos de interação com o Swagger.

## 1. Criação de Novo Pedido (POST /order)

Este endpoint é usado para criar um novo pedido e seus itens associados.

### 1.1. Corpo da Requisição (Request Body)

Detalhe do corpo da requisição que deve ser enviado para criar o pedido.

![Corpo da Requisição POST /order](/images_readme/post_endpoint.png)

### 1.2. Resposta de Sucesso (201 Created)

Retorno após a criação bem-sucedida do pedido, incluindo o `numeroPedido` gerado.

![Resposta de Sucesso POST /order](/images_readme/resposta_post.png)
<br>

---

## 2. Busca de Pedido por ID (GET /order/{orderId})

Este endpoint permite buscar um pedido específico utilizando seu ID único.

### 2.1. Parâmetro da Requisição

O parâmetro `orderId` é obrigatório e deve ser passado no *path* da URL.

![Parâmetro da Requisição GET /order/{orderId}](/images_readme/getById_endpoint.png)

### 2.2. Resposta de Sucesso (200 OK)

Retorno do pedido completo encontrado, incluindo itens e informações de valores.

![Resposta de Sucesso GET /order/{orderId}](/images_readme/resposta_getById.png)
<br>

---

## 3. Exclusão de Pedido por ID (DELETE /order/{orderId})

Este endpoint é utilizado para deletar um pedido existente pelo seu ID.

### 3.1. Parâmetro da Requisição

O parâmetro `orderId` é obrigatório para identificar o pedido a ser deletado.

![Parâmetro da Requisição DELETE /order/{orderId}](/images_readme/deleteById_endpoin.png)

### 3.2. Resposta de Sucesso (200 OK)

Mensagem de confirmação após a exclusão bem-sucedida do pedido.

![Resposta de Sucesso DELETE /order/{orderId}](/images_readme/resposta_deleteById.png)
<br>

---

## Exemplo de Busca Múltipla (GET /orders)

A imagem a seguir (embora não esteja diretamente ligada aos exemplos acima) mostra uma possível resposta de uma busca que retorna múltiplos pedidos.

![Resposta de Busca de Múltiplos Pedidos](/images_readme/resposta_getall.png)
