export const QUERY = {
    SELECT_PRODUCTS: "SELECT * FROM products ORDER BY created_at DESC LIMIT 50",
    SELECT_PRODUCT: "SELECT * FROM products WHERE id = ?",
    CREATE_PRODUCT: "INSER INFTO products (firstName, price, imageUrl) VALUES (?, ?, ?)",
    UPDATE_PRODUCT: "UPDATE products SET firstName = ?, price = ?, imageUrl = ? WHERE id = ?",
    DELETE_PRODUCT: "DELETE FROM products WHERE id = ?",
}