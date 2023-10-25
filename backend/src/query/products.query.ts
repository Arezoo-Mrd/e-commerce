export const QUERY = {
    SELECT_PRODUCTS: "SELECT * FROM products ORDER BY created_at DESC LIMIT 50",
    SELECT_PRODUCT: "SELECT * FROM products WHERE id = ?",
    CREATE_PRODUCT: "INSER INFTO products (first_name, price, image_url) VALUES (?, ?, ?)",
    UPDATE_PRODUCT: "UPDATE products SET first_name = ?, price = ?, image_url = ? WHERE id = ?",
    DELETE_PRODUCT: "DELETE FROM products WHERE id = ?",
}