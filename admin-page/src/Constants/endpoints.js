const Endpoints = {
    authorize: 'api/authorize',
    me: 'api/authorize/me',

    products: '/api/products',
    productsId: (id) => `api/products/${id}`,
    users: '/api/user',
    usersId: (id) => `/api/user/${id}`,
    category: '/api/category',
    categoryId: (id) => `/api/category/${id}`,
};

export default Endpoints;
