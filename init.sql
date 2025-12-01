-- Verifica se a tabela 'Order' já existe. Se não existir, a cria.
CREATE TABLE IF NOT EXISTS "Order" (
    orderId VARCHAR(50) PRIMARY KEY,
    value BIGINT NOT NULL,
    creationDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Verifica se a tabela 'Items' já existe. Se não existir, a cria.
CREATE TABLE IF NOT EXISTS Items (
    productId INT NOT NULL,
    orderId VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price BIGINT NOT NULL,

    PRIMARY KEY (orderId, productId),
    FOREIGN KEY (orderId) REFERENCES "Order" (orderId) ON DELETE CASCADE
);
