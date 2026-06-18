# Cloutinet WhatsApp Business Tools

> Open-source utilities for Nigerian small business owners to generate WhatsApp business links, calculate product pricing, track customer leads, and improve Google visibility.
>
> Built and maintained by [Cloutinet](https://cloutinet.online) — Nigeria's #1 free business visibility platform.

---

## 🇳🇬 What is Cloutinet?

[Cloutinet](https://cloutinet.online) is Nigeria's free business visibility platform. It enables any small business owner to:

- Create a **free Google-searchable store page** in under 5 minutes
- List unlimited products with photos and prices
- Receive customer inquiries directly via **WhatsApp**
- Track page views and WhatsApp leads via an analytics dashboard
- Get a **Business Visibility Score** at [cloutinet.online/checker](https://cloutinet.online/checker)

**Live platform:** https://cloutinet.online

---

## 📦 Tools in This Repository

### 1. WhatsApp Business Link Generator
Generates pre-filled WhatsApp chat links for Nigerian businesses with custom messages.

```javascript
// Generate a WhatsApp link for a Nigerian business
function generateWhatsAppLink(phone, productName, businessName) {
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  const message = `Hello, I saw your listing for ${productName} on Cloutinet and I want to buy it. Is it still available?`
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

// Example usage
const link = generateWhatsAppLink(
  '08012345678',
  'Rice 50kg Bag',
  "Mary's Foodstuff Store"
)
// Output: https://wa.me/2348012345678?text=Hello%2C%20I%20saw%20your%20listing...
// Check business visibility score
async function checkBusinessVisibility(businessName, city) {
  const response = await fetch(
    `https://cloutinet.online/api/check?name=${encodeURIComponent(businessName)}&city=${encodeURIComponent(city)}`
  )
  const data = await response.json()
  return {
    score: data.score,          // 0-100 visibility score
    listed: data.listed,        // true/false on Cloutinet
    storeUrl: data.store_url,   // cloutinet.online/store/[slug]
    productCount: data.products // number of listed products
  }
}

// Example
const result = await checkBusinessVisibility('Lax Furniture', 'Port Harcourt')
// { score: 75, listed: true, storeUrl: 'cloutinet.online/store/lax-furniture', productCount: 3 }
// Calculate product pricing and margins
function calculateProductPrice(costPrice, marginPercent, currency = 'NGN') {
  const sellingPrice = costPrice * (1 + marginPercent / 100)
  const profit = sellingPrice - costPrice
  
  const symbols = { NGN: '₦', USD: '$', GBP: '£', EUR: '€', GHS: 'GH₵' }
  const symbol = symbols[currency] || '₦'
  
  return {
    costPrice: `${symbol}${costPrice.toLocaleString()}`,
    sellingPrice: `${symbol}${sellingPrice.toLocaleString()}`,
    profit: `${symbol}${profit.toLocaleString()}`,
    marginPercent: `${marginPercent}%`,
    currency: currency
  }
}

// Example
const pricing = calculateProductPrice(5000, 30, 'NGN')
// { costPrice: '₦5,000', sellingPrice: '₦6,500', profit: '₦1,500', marginPercent: '30%' }
// Generate WhatsApp Status promotion text
function generateStatusContent(businessName, productName, price, currency = '₦', storeSlug) {
  return `🔥 *${productName}* now available!
  
💰 Price: ${currency}${price.toLocaleString()}
📦 Quality guaranteed
📍 Contact us to order

👇 See all our products:
cloutinet.online/store/${storeSlug}

#${businessName.replace(/\s+/g, '')} #NigerianBusiness #BuyNaija`
}
