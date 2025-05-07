const db = require('../config/database');

class Category {
    static async getAll() {
        const query = 'SELECT * FROM categories ORDER BY created_at DESC';
        const { rows } = await db.query(query);
        return rows;
    }

    static async create(category) {
        const query = `
            INSERT INTO categories (name, description)
            VALUES ($1, $2)
            RETURNING *
        `;
        const values = [category.name, category.description];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async update(id, category) {
        const query = `
            UPDATE categories
            SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
        `;
        const values = [category.name, category.description, id];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM categories WHERE id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
}

module.exports = Category;