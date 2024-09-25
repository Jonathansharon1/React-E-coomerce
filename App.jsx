import { Routes, Route } from 'react-router-dom';
  
import LoginComp from './components/LogIn'
import RegisterComp from './components/Register';
import CategoriesComp from './components/Admin/Categories';
import ProductsComp from './components/Admin/Products';
import CustomersComp from './components/Admin/Customers';
import StatisticsComp from './components/Admin/Statistics';



import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import db from './firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import MyAccountComp from './components/Customers/MyAccount';
import MyOrdersComp from './components/Customers/MyOrders';
import StoreComp from './components/Customers/Store';


function App() {
  const dispatch = useDispatch();


  // Get USERS from db and load them to the store
  useEffect(() => {
    const getUsersFromDB = () => {
    const q = query(collection(db, 'users'));
     onSnapshot(q, (querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
        dispatch({ type: 'LOAD_USERS', payload: users });
    
    });
  }
  getUsersFromDB()
    }, []);


    // Load catagories into the store
    useEffect(() => {
        const getCatFromDB = () => {
        const q = query(collection(db, 'categories'));
         onSnapshot(q, (querySnapshot) => {
          const categories = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
            dispatch({ type: 'LOAD_CATEGORIES', payload: categories });
        
        });
      }
      getCatFromDB()
      
        }, []);

    // Load products into the store
    useEffect(() => {
      const getProductsFromDB = () => {
      const q = query(collection(db, 'products'));
       onSnapshot(q, (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
          dispatch({ type: 'LOAD_PRODUCTS', payload: products });
      
      });
    }
    getProductsFromDB()
    
      }, []);



  return (
    <>
        <Routes>
          <Route path="/" element={<LoginComp />} />
          <Route path='/register' element={<RegisterComp/>}/>
          <Route path="/categories" element={<CategoriesComp />} />
          <Route path="/products" element={<ProductsComp />} />
          <Route path="/statistics" element={<StatisticsComp />} />
          <Route path="/customers" element={<CustomersComp/>} />
          <Route path="/MyAccount" element={<MyAccountComp/>} />
          <Route path="/MyOrders" element={<MyOrdersComp/>} />
          <Route path="/store" element={<StoreComp/>} />

        </Routes>

    </>
  )
}

export default App
