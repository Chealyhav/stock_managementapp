const validateProduct = (req, res, next) => {
    const { name, quantity, price } = req.body;
    const errors = [];

    if (!name || name.trim().length === 0) {
        errors.push('Product name is required');
    }

    if (!quantity || quantity < 0) {
        errors.push('Valid quantity is required');
    }

    if (!price || price < 0) {
        errors.push('Valid price is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = { validateProduct };