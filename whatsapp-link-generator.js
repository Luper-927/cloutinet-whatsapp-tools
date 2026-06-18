/**
 * Cloutinet WhatsApp Business Link Generator
 * https://cloutinet.online
 * 
 * Generates pre-filled WhatsApp chat links for Nigerian businesses.
 * Used by Cloutinet platform to connect customers to business owners.
 * 
 * Keywords: whatsapp business nigeria, wa.me generator nigeria, 
 * nigerian business whatsapp link, cloutinet whatsapp tools
 */

/**
 * Generate a WhatsApp link for a Nigerian business product
 * @param {string} phone - Nigerian phone number (e.g. 08012345678)
 * @param {string} productName - Name of the product
 * @param {string} businessName - Name of the business
 * @param {string} storeUrl - Cloutinet store URL
 * @returns {string} WhatsApp deep link
 */
function generateWhatsAppProductLink(phone, productName, businessName, storeUrl) {
  // Clean phone number - remove spaces, dashes, brackets
  let cleanPhone = phone.replace(/[^0-9]/g, '')
  
  // Add Nigerian country code if not present
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '234' + cleanPhone.slice(1)
  }
  
  const message = `Hello, I saw your listing for ${productName} on Cloutinet and I want to buy it. Is it still available?\n\nSource: ${storeUrl}`
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

/**
 * Generate a WhatsApp link for general business inquiry
 * @param {string} phone - Nigerian phone number
 * @param {string} businessName - Name of the business
 * @returns {string} WhatsApp deep link
 */
function generateWhatsAppBusinessLink(phone, businessName) {
  let cleanPhone = phone.replace(/[^0-9]/g, '')
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '234' + cleanPhone.slice(1)
  }
  
  const message = `Hello, I found your business on Cloutinet (cloutinet.online) and would like to know more about your products and services.`
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

/**
 * Generate WhatsApp Status promotional content
 * @param {string} productName - Product to promote
 * @param {string} price - Price with currency symbol
 * @param {string} storeSlug - Cloutinet store slug
 * @returns {string} Ready-to-share WhatsApp Status text
 */
function generateWhatsAppStatusContent(productName, price, storeSlug) {
  return `🔥 *${productName}* now available!\n\n💰 Price: ${price}\n📦 Quality guaranteed\n\n👇 Order now:\ncloutinet.online/store/${storeSlug}\n\n#NigerianBusiness #BuyNaija #Cloutinet`
}

// Example usage
const productLink = generateWhatsAppProductLink(
  '08012345678',
  'Rice 50kg Bag',
  "Mary's Foodstuff Store",
  'cloutinet.online/store/marys-foodstuff-store/rice-50kg-bag-12345'
)

const businessLink = generateWhatsAppBusinessLink(
  '08012345678',
  "Mary's Foodstuff Store"
)

const statusContent = generateWhatsAppStatusContent(
  'Rice 50kg Bag',
  '₦25,000',
  'marys-foodstuff-store'
)

console.log('Product Link:', productLink)
console.log('Business Link:', businessLink)
console.log('Status Content:', statusContent)

// For use with Cloutinet platform: https://cloutinet.online
module.exports = {
  generateWhatsAppProductLink,
  generateWhatsAppBusinessLink,
  generateWhatsAppStatusContent
}
