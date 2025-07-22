import { CustomerDto } from '@/dtos/customers/customer.dto';
import { OrderDto } from '@/dtos/orders/order.dto';
import { formatPrice } from '@/utils/price';
import { format } from "date-fns";

export type OrderPdfProps = {
  userDetails: {
    businessName: string;
    businessId: string;
    phone: string;
  },
  customerDetails: CustomerDto,
  orderDetails: OrderDto;
}

export const OrderPDF = ({ userDetails, customerDetails, orderDetails }: OrderPdfProps ) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <span style={{
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
      }}>{userDetails.businessName}</span>
      <span style={{
        textAlign: 'center'
      }}>*** אישור הזמנה/ת משלוח ***</span>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <span>{"מס' ע.מ\ ח.פ:"} {userDetails.businessId} </span>
        <span>טל: {userDetails.phone}</span>
      </div>
      <span style={{
         fontSize: '24px',
        fontWeight: 'bold',
      }}>{"הזמנה מס':"} {orderDetails.orderNumber}</span>
      <div >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
          <span>תאריך הזמנה:</span>
          <span>{format(orderDetails.createdAt, "HH:MM - dd/MM/yy")}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
          <span>תאריך הדפסה:</span>
          <span>{format(new Date(), "HH:MM - dd/MM/yy")}</span>
        </div>
      </div>
      <span style={{
           fontSize: '24px',
        fontWeight: 'bold',
      }}>{"לכ':"} {`${customerDetails.firstName} ${customerDetails.lastName}`}</span>
      <span style={{
            fontSize: '18px',
        fontWeight: 'bold',
      }}>{customerDetails.city}</span>
      <span>{customerDetails.phone ? customerDetails.phone : 'אין מספר טלפון'}</span>

      <table>
        <thead>
          <tr style={{
            textAlign: 'right',
          }}> 
            <th>תיאור פריט</th>
            <th>{"יח'"}</th>
            <th>מחיר</th>
          </tr>
        </thead>
        <tbody style={{
          textAlign: 'right'
        }}>
          {orderDetails.orderItems.map(item => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>{formatPrice(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
);
