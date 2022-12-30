import React, {createContext, useEffect} from 'react';
import {Producto, ProductsResponse} from '../interfaces/interfaces';
import {useState} from 'react';
import cafeApi from '../api/cafeApi';
import {environmentsProducts} from '../utils/environments';
import {Asset, ImagePickerResponse} from 'react-native-image-picker';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId: string, productName: string) => Promise<Producto>;
    updateProduct: (
        categoryId: string,
        productName: string,
        productId: string,
    ) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    loadProductById: (id: string) => Promise<Producto>;
    uploadImage: (data: any, id: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

interface ProductsProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const ProductsProvider = ({children}: ProductsProviderProps) => {
    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await cafeApi.get<ProductsResponse>(
                environmentsProducts.loadProducts,
            );

            setProducts([...response.data.productos]);
        } catch (error) {
            console.log(error);
        }
    };

    const addProduct = async (
        categoryId: string,
        productName: string,
    ): Promise<Producto> => {
        try {
            const response = await cafeApi.post<Producto>(
                environmentsProducts.addProduct,
                {nombre: productName, categoria: categoryId},
            );

            setProducts([...products, response.data]);
            return response.data;
        } catch (error) {
            console.log(error);
            return {} as Producto;
        }
    };
    const updateProduct = async (
        categoryId: string,
        productName: string,
        productId: string,
    ) => {
        try {
            const response = await cafeApi.put<Producto>(
                environmentsProducts.editProduct + productId,
                {nombre: productName, categoria: categoryId},
            );

            setProducts(
                products.map(producto =>
                    producto._id === productId ? response.data : producto,
                ),
            );
        } catch (error) {
            console.log('mal');
        }
    };

    const deleteProduct = async (productId: string) => {
        console.log(productId);
    };
    const loadProductById = async (id: string): Promise<Producto> => {
        try {
            const response = await cafeApi.get<Producto>(
                environmentsProducts.loadProcutByID + id,
            );

            return response.data;
        } catch (error) {
            console.log('loadproductbyid', error);
            return {} as Producto;
        }
    };
    const uploadImage = async (data: Asset, id: string) => {
        const fileToUpload = {
            uri: data.uri,
            type: data.type,
            name: data.fileName,
        };

        const formData = new FormData();
        formData.append('archivo', fileToUpload);

        try {
            await cafeApi.put(environmentsProducts.uploadImage + id, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                loadProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                loadProductById,
                uploadImage,
            }}>
            {children}
        </ProductsContext.Provider>
    );
};
