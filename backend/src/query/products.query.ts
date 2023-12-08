export const QUERY = {
    SELECT_PRODUCTS:'SELECT * FROM products ORDER BY createdAt DESC LIMIT 50',
    SELECT_PRODUCT: "SELECT * FROM products WHERE id = ?",
    CREATE_PRODUCT:  'INSERT INTO `products` (name, price, imageUrl, status) VALUES ("?", "?", "?", "?x ");',
    UPDATE_PRODUCT: "UPDATE products SET name = ?, price = ?, imageUrl = ? WHERE id = ?",
    DELETE_PRODUCT: "DELETE FROM products WHERE id = ?",
}