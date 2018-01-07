---
id: templateReceipt
title: Receipt Template
---

The receipt template allows you to send an order confirmation as a structured message. Component includes `ReceiptTemplate` which contains max of 100 `ReceiptElement`, `Address`, `Summary` and `Adjustment`.

## Example

```BotWebPlayer path=receipttemplate
import React, { Component } from 'react';
import { Message, ReceiptTemplate, ReceiptElement, Address, Summary, Adjustment } from 'react-messenger-ui';

class AwesomeChatBot extends Component {
  render() {
    const { recipient } = this.props;

    return (
      <Message recipient={recipient}>
          <ReceiptTemplate
            recipientName="Charlie"
            orderNumber="12345678902"
            paymentMethod="Visa 1234"
            timestamp="1428444852"
          >
            <Address
              street1="1 Hacker Way"
              city="Menlo Park"
              postalCode="94025"
              state="CA"
              country="USA"
            />
            <Summary
              subtotal={75.00}
              shippingCost={4.95}
              totalTax={6.19}
              totalCost={56.14}
            />
            <Adjustment name="New Customer Discount" amount={20} />
            <Adjustment name="$10 Off Coupon" amount={10} />
            <ReceiptElement
              title="Classic White T-shirt"
              subTitle="100% Soft and Luxurious Cotton"
              quantity={2}
              price={50}
              currency="USD"
              imageUrl="http://petersapparel.parseapp.com/img/whiteshirt.png"
            />
            <ReceiptElement
              title="Classic Gray T-shirt"
              subTitle="100% Soft and Luxurious Cotton"
              quantity={1}
              price={25}
              currency="USD"
              imageUrl="http://petersapparel.parseapp.com/img/grayshirt.png"
            />
          </ReceiptTemplate>
        </Message>
    );
  }
}
```

## Reference [![](https://img.shields.io/badge/Messenger-Documentation-blue.svg)](https://developers.facebook.com/docs/messenger-platform/reference/template/receipt)

### ReceiptTemplate Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| sharable | boolean | Set to `true` to enable the native share button in Messenger for the template message
| recipientName| string | The recipient's name
| merchantName| string | The merchantName's name
| orderNumber| string | The order number. Must be unique.
| currency| string | The currency of the payment.
| paymentMethod| string | The payment method used.
| timestamp| string | Timestamp of the order in seconds.

### ReceiptElement Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| title | string | The title of the element
| subtitle | string | The subtitle of the element
| quantity | number | The quantity of the element
| price | number | The price of the element
| currency| string | currency of the element
| imageUrl| string | image url of the element

### Address Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| street1 | string | The street address line 1
| street2 | string | The street address line 2
| city| string | The city name of the address
| postalCode| string | The postal code of the address
| state| string | The state abbreviation for U.S. The region/province for non-U.S. addresses.
| country| string | The two-letter country abbreviation of the address.


### Summary Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| subtotal | number | The sub-total of the order.
| shippingCost | number | The shipping cost of the order.
| totalTax| number | The tax of the order.
| totalCost| number | The total cost of the order, including sub-total, shipping, and tax.

### Adjustment Props

| Property | Type | Description |
| -------- | ---- | ----------- |
| subtotal | string | Name of the adjustment.
| amount | number |  The amount of the adjustment.