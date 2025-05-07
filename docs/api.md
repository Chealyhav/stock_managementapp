# API Documentation

## Products API

### Get all products
GET /api/products

### Get single product
GET /api/products/:id

### Create product
POST /api/products
```json
{
    "name": "Product Name",
    "quantity": 100,
    "price": 29.99,
    "description": "Product description"
}