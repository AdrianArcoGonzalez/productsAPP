/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
    Text,
    TextInput,
    ScrollView,
    View,
    StyleSheet,
    Button,
    Image,
} from 'react-native';
import {ProductsStackParams} from '../Navigator/ProductsNavigator';
import {Picker} from '@react-native-picker/picker';
import useCategories from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface DetailsScreenProps
    extends StackScreenProps<ProductsStackParams, 'Detail'> {}

const DetailsScreen = ({navigation, route}: DetailsScreenProps) => {
    const {loadProductById, addProduct, updateProduct, uploadImage} =
        useContext(ProductsContext);
    const [tempUri, setTempUri] = useState('');
    const {id = '', name = ''} = route.params;

    const {getCategories, categorias} = useCategories();

    const {_id, categoriaId, imagen, nombre, onChange, setFormValue} = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        imagen: '',
    });

    useEffect(() => {
        navigation.setOptions({
            title: nombre ? nombre : 'Sin nombre del producto',
        });
    }, [nombre]);

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        if (id.length === 0) {
            return;
        }
        const product = await loadProductById(id);
        setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            imagen: product.img || '',
            nombre: name,
        });
    };

    const saveOrUpdate = async () => {
        if (id.length > 0) {
            updateProduct(categoriaId, nombre, id);
            return;
        } else {
            const temporalyCategorie = categoriaId || categorias[0]._id;
            const newProduct = await addProduct(temporalyCategorie, nombre);
            onChange(newProduct._id, '_id');
        }
    };

    const takePhoto = () => {
        launchCamera({mediaType: 'photo', quality: 0.5}, response => {
            if (response.didCancel) {
                return;
            }
            if (!response.assets![0].uri) {
                return;
            }
            setTempUri(response.assets![0].uri);
            uploadImage(response.assets![0], _id);
        });
    };

    const getGalleryPhoto = () => {
        launchImageLibrary({mediaType: 'photo', quality: 0.5}, response => {
            if (response.didCancel) {
                return;
            }
            if (!response.assets![0].uri) {
                return;
            }
            setTempUri(response.assets![0].uri);
            uploadImage(response.assets![0], _id);
        });
    };

    return (
        <View style={detailStyle.container}>
            <ScrollView>
                <Text style={detailStyle.label}>Nombre del Producto</Text>
                <TextInput
                    placeholder="Producto"
                    style={detailStyle.input}
                    value={nombre}
                    onChangeText={value => onChange(value, 'nombre')}
                />

                <Text style={detailStyle.label}>Categoria</Text>

                <Picker
                    selectedValue={categoriaId}
                    onValueChange={itemValue =>
                        onChange(itemValue, 'categoriaId')
                    }>
                    {categorias.map(categoria => (
                        <Picker.Item
                            label={categoria.nombre}
                            value={categoria._id}
                            key={categoria._id}
                        />
                    ))}
                </Picker>
                {imagen.length > 0 && !tempUri && (
                    <Image
                        source={{uri: imagen}}
                        style={{
                            width: '100%',
                            height: 300,
                            marginVertical: 50,
                            borderRadius: 20,
                        }}
                    />
                )}
                {tempUri && (
                    <Image
                        source={{uri: tempUri}}
                        style={{
                            width: '100%',
                            height: 300,
                            marginVertical: 50,
                            borderRadius: 20,
                        }}
                    />
                )}

                <View>
                    <Button
                        onPress={saveOrUpdate}
                        color={'#5856D6'}
                        title="Guardar"
                    />
                </View>
                {_id.length > 0 && (
                    <>
                        <View style={detailStyle.buttonContainer}>
                            <Button
                                onPress={takePhoto}
                                color={'#5856D6'}
                                title="Cámara"
                            />
                            <View style={{width: 20}} />
                            <Button
                                onPress={getGalleryPhoto}
                                color={'#5856D6'}
                                title="Galería"
                            />
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const detailStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
    },
    label: {
        fontSize: 18,
        color: 'black',
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor: 'rgba(0,0,0,0.2)',
        height: 45,
        marginTop: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
});
export default DetailsScreen;
