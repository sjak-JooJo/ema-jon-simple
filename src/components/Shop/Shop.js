import React, { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import {addToDb, getStoredCart} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useState([]);

   /*  useEffect(() => {
        //console.log('Product load before fetch');
        fetch('products.json')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            //console.log('products loaded');
        });
    },[]); */

    useEffect(() =>{
        //console.log('Local Storage first line');
        const storedCart = getStoredCart();
        const savedCart = [];
        //console.log(storedCart);
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
            
        }
        setCart(savedCart);
        //console.log('local storage finished');
    }, [products])

    const handleAddToCart = (selectedProduct) =>{
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        // do not do this: cart.push(product);
        
        setCart(newCart);
        addToDb(selectedProduct.id);
   }


    return (
        <div className='shop-container'>
           <div className="products-container">
            {
                products.map(product => <Product 
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                    ></Product>)
            }
           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/orders">
                        <button>
                            Review Order
                        </button>
                    </Link>
                </Cart>
           </div>
        </div>
    );
};

export default Shop;