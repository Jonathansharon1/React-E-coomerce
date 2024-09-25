import TableComp from "../Table";
import AdminNavComp from "./AdminNav";
import {useSelector} from "react-redux"

const CustomersComp = () => {
  const customers = useSelector((state) => state.users);
  const mainHeadRow = ['Full Name', 'Joined At', 'Products Bought'];
  const seconderyHeadRow = ['Product', 'Qty', 'Date']
  

// Every customer information to pass to Table comp
  const mainTRows = customers.flatMap((customer) => {
    // iterate over productsBought to take the information into an array
    const productsBought = customer.productsBought.map((productBought) => (
      {name: productBought?.name, quantity: productBought?.quantity, date: productBought.date }
   ))
   // pass the Rows for the table comp
    return {FullName: `${customer.firstName} ${customer.lastName}`, JoinedAt: customer.joinedAt,
     productsBought: 
    <TableComp headRow={seconderyHeadRow} rows={productsBought} />
    }
    
  })
  console.log(mainTRows)


  return (
    <div>
      <AdminNavComp/>
      <div style={{marginTop: '50px'}}>
        <TableComp headRow={mainHeadRow} rows={mainTRows}/>
      </div>

      
      
    </div>
  )
};

export default CustomersComp;
