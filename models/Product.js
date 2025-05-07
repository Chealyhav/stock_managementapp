const db = require('../config/database');

class Product {
    static async getAll() {
        const query = `
            SELECT id, name, description, price, quantity,
                   CASE 
                       WHEN quantity = 0 THEN 'Out of Stock'
                       WHEN quantity < 10 THEN 'Low Stock'
                       ELSE 'In Stock'
                   END as status,
                   created_at, updated_at
            FROM products
            ORDER BY created_at DESC
        `;
        const { rows } = await db.query(query);
        return rows;
    }

    static async getById(id) {
        const query = 'SELECT * FROM products WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }

    static async create(product) {
        const query = `
            INSERT INTO products (name, description, price, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, description, price, quantity,
            CASE 
                WHEN quantity = 0 THEN 'Out of Stock'
                WHEN quantity < 10 THEN 'Low Stock'
                ELSE 'In Stock'
            END as status,
            created_at, updated_at
        `;
        const values = [
            product.name,
            product.description || '',
            product.price,
            product.quantity || 0
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async update(id, product) {
        const query = `
            UPDATE products 
            SET name = $1, description = $2, price = $3, quantity = $4, updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *
        `;
        const values = [product.name, product.description, product.price, product.quantity, id];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Product;