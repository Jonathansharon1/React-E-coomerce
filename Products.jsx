import { useSelector } from "react-redux";
import AdminNavComp from "./AdminNav";
import ProductComp from "./Product";
import { Button } from "@mui/material";
import AddProductComp from "./AddProduct";
import { useState } from "react";

const ProductsComp = () => {
  const products = useSelector((state) => state.products)
  const [showAddProduct, setShowAddProduct] = useState(false)
  return (
    <div>
      <AdminNavComp/>
      <div>
        {
          products.map((product) => {
            
            return <ProductComp key={product.id} product={product.attr[0]} id={product.id}/>
          })
        }
        {showAddProduct && <AddProductComp cancelCallBack={setShowAddProduct}/>}
        <Button 
          sx={{
          background: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)', // Gradient background for button
          color: '#ffffff',
          padding: '10px 20px', 
          borderRadius: '8px', 
          textTransform: 'none', 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effects
          '&:hover': {
            transform: 'scale(1.05)', // Slightly enlarges button on hover
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)', // Increases shadow on hover>Add product</Button>
          },
          marginTop: '20px',
          width: '50%',

        }}
         onClick={() => {
          setShowAddProduct(true);
        }
      }
      >
          Add Product
        </Button>
        

      
      </div>

    </div>
  )
};

export default ProductsComp;
