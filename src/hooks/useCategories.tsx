import {useState} from 'react';
import cafeApi from '../api/cafeApi';
import {Categoria, CategoriesResponse} from '../interfaces/interfaces';
import {environmentsProducts} from '../utils/environments';

const useCategories = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCategories = async () => {
    try {
      const response = await cafeApi.get<CategoriesResponse>(
        environmentsProducts.getCategories,
      );

      setCategorias(response.data.categorias);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return {getCategories, isLoading, categorias};
};

export default useCategories;
