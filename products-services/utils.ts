import { Product } from "./product.model";

export async function updateProduct(id: number, product: Product) {
    const updatedProduct = await Product.update(product, {
        where: { id },
        returning: true,
    });
    return updatedProduct[1][0];
}

export async function getAllProducts() {
    const products = await Product.findAll();
    return products;
}
export async function getProductById(id: number) {
    const product = await Product.findByPk(id);
    return product;
}

export async function saveProduct(product: Product) {
    const savedProduct = await Product.create(product);
    return savedProduct;
}


export async function placeOrder(productIds: number[]) {
    const products = await Product.findAll({
        where: {
            id: productIds,
        },
    });
    // Do something with the products to place the order
    // ...
    return products;
}