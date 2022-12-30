// Place the back ip adress on yourIpHere constants
const yourIpHere = '192.168.1.150';

const baseUrl = `http://${yourIpHere}:8080/api`;

export const environmentsUser = {
    login: baseUrl + '/auth/login',
    register: baseUrl + '/usuarios',
    token: baseUrl + '/auth',
};

export const environmentsProducts = {
    loadProducts: baseUrl + '/productos?limite=50',
    getCategories: baseUrl + '/categorias',
    loadProcutByID: baseUrl + '/productos/',
    addProduct: baseUrl + '/productos',
    editProduct: baseUrl + '/productos/',
    deleteProduct: baseUrl + '/productos/',
    uploadImage: baseUrl + '/uploads/productos/',
};
