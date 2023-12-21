exports.emailOrderTemplate = `
<html>
    <head>
        <style>
            table,tr,td{
                border: 1px solid black;
                border-collapse:collapse
            }
        </style>

        </head>
<div>
<div>
  <h1 style={background:black,color:white,padding:2em,fontSize:24px }>Congratulations, your order has been confirmed</h1>
  <div style={display:flex, flexDirection:column, gap:2em, alignItems:center, }>
    <h3>
      Hi %FIRSTNAME%
      <br />
      We have received your order
    </h3>
    <div>
      <h2>Order %REFERENCE% ( %DATE% )</h2>
      <div>
        <table>
          <tr>
            <td>Product</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>
          %ORDERS%
          <tr>
            <td colspan="2">Subtotal</td>
            <td>%SUBTOTAL%</td>
          </tr>
          <tr>
            <td colspan="2">shipping</td>
            <td>%SHIPPING_FEE%</td>
          </tr>
          <tr>
            <td colspan="2">Total</td>
            <td>%TOTAL%</td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <h2>Shipping Information</h2>
      <div>
        <div>Name: %FIRSTNAME% %LASTNAME%</div>
        <div>PhoneNumber: %PHONE%</div>
        <div>Email: %EMAIL%</div>
        <div>Address: %ADDRESS%</div>
        <div>City: %CITY%</div>
        <div>State: %STATE%</div>
      </div>
    </div>
    <div style={display:flex, flexDirection:column, gap:1em}>
      <h2>Additional Information</h2>
      <div style={border: 1px solid black}>%ADDITIONAL_INFO%</div>
    </div>
    <h2>Goodluck on taking over the world</h2>
  </div>
</div>
</div>
</html>
`;
