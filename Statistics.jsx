import AdminNavComp from "./AdminNav";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

import { useSelector } from "react-redux";

import { Box, InputLabel, MenuItem, FormControl, Select} from '@mui/material'
import { useEffect, useState } from "react";


const StatisticsComp = () => {
  const products = useSelector((state) => state.products)
  const users = useSelector((state) => state.users)
  
  // State that contains the admin pick from the options of the bar sections
  const [customerName, setCustomerName] = useState("")

  // Contains the data for the pie chart, with the exact requierments(id, value, label)
  const pieData = products.map((product) => {
    return {id: product.id,
            label: product.attr[0].title,
            value: product.boughtTotal,
    }


  })

  // states that contains the data for the bar
  const [xLabels, setXlabels] = useState([0])
  const [data, setData] = useState([""])



  // function that check how much products the customer bought from all the products
  useEffect(() => {
    const sortPurchase = () => {
      if (customerName != "" ){
        
        // Contains the names of the products that will display in the bar chart
    const xLabels = customerName.productsBought.map((productBought) => {
      return productBought.name
    })
    
       const data = customerName.productsBought.map((productBought) => {
           return  +productBought.quantity 
         
         
       })
       console.log( data, xLabels)
       if (xLabels[0] == undefined){
        setData([0])
        setXlabels(["No purchases for this user"])
        console.log("The user didnt bought anything")
       }
       else{
        setData(data)
        setXlabels(xLabels)
       }
     }
    }
    
    sortPurchase()
  }, [customerName])

  
 
     


  return (
    <div>
    <div>
      <AdminNavComp/>
    </div>

    {
      //A pie chart with all products sold
    }
    <div className="stats_pie">
    <div>
      <h2>
      Total sold products
      </h2>
      </div>
    <PieChart

      series={[
        {
          data: pieData
        },
      ]}
      width={500}
      height={300}
    />
    </div>

    {// A bar chart for qty per product sold for every customer. The admin can choose the current user
      //with a drop down list.
    }

    <div className="stats_bar">
      <h2>Products quantity per customer</h2>
      
    <Box sx={{ maxWidth: 200,  margin: '0 auto'}}>
    <h4 style={{marginTop: '30px'}}>Sort by customer</h4>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose User</InputLabel>
        <Select
          labelId="simple-select-label"
          id="select_user"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        >
          {
            users.map((user) => {
              return <MenuItem key={user.id} value={user}>{`${user.firstName} ${user.lastName}`}</MenuItem>
            })
          }
          
        </Select>
      </FormControl>
    </Box>
    

    <div
    style={{
      marginTop: '10%',
      marginLeft: '10%'

    }}
    >
    <BarChart
    width={700}
      height={450}
      borderRadius={20}
      series={[
        { data: data, label: 'quantity' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
      </div>
      </div>
    </div>
  )
};

export default StatisticsComp;
