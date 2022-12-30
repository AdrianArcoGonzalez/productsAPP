import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
    RefreshControl,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsContext} from '../context/ProductsContext';
import {ProductsStackParams} from '../Navigator/ProductsNavigator';
import {AuthContext} from '../context/AuthContext';

interface ProductsScreenProps
    extends StackScreenProps<ProductsStackParams, 'Products'> {}

const ProductsScreen = ({navigation}: ProductsScreenProps) => {
    const {products, loadProducts} = useContext(ProductsContext);
    const {logout} = useContext(AuthContext);

    const [isRefreshing, setRefreshing] = useState<boolean>(false);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={productsStyle.buttonAdd}
                    onPress={() => navigation.navigate('Detail', {})}>
                    <Text>Agregar</Text>
                </TouchableOpacity>
            ),
        });
    }, []);

    const refreshProducts = async () => {
        setRefreshing(true);
        await loadProducts();
        setRefreshing(false);
    };

    return (
        <>
            <View style={productsStyle.container}>
                <FlatList
                    data={products}
                    keyExtractor={product => product._id}
                    renderItem={({item: product}) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={productsStyle.button}
                            onPress={() => {
                                navigation.navigate('Detail', {
                                    id: product._id,
                                    name: product.nombre,
                                });
                            }}>
                            <Text>{product.nombre}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={productsStyle.itemSeparator} />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={refreshProducts}
                        />
                    }
                />
            </View>
            <View style={productsStyle.buttonLogoutContainer}>
                <Button title="Logout" color={'#5856D6'} onPress={logout} />
            </View>
        </>
    );
};

const productsStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    productsName: {
        fontSize: 20,
    },
    itemSeparator: {
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    button: {
        marginVertical: 10,
    },
    buttonAdd: {
        marginRight: 10,
    },
    buttonLogoutContainer: {
        height: 30,
        width: 80,
        position: 'absolute',
        bottom: 70,
        right: 50,
    },
});

export default ProductsScreen;
