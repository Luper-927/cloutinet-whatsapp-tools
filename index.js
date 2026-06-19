/**
 * Cloutinet WhatsApp Business Tools
 * https://cloutinet.online
 * Nigeria's free business visibility platform
 */

function generateWhatsAppProductLink(phone, productName, businessName, storeUrl) {
  let cleanPhone = phone.replace(/[^0-9]/g, '')
  if (cleanPhone.startsWith('0')) cleanPhone = '234' + cleanPhone.slice(1)
  const message = `Hello, I saw your listing for ${productName} on Cloutinet and I want to buy it. Is it still available?\n\nSource: ${storeUrl}`
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

function generateWhatsAppBusinessLink(phone, businessName) {
  let cleanPhone = phone.replace(/[^0-9]/g, '')
  if (cleanPhone.startsWith('0')) cleanPhone = '234' + cleanPhone.slice(1)
  const message = `Hello, I found your business on Cloutinet (cloutinet.online) and would like to know more about your products and services.`
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

function calculateVisibilityScore(businessProfile) {
  const scores = {
    businessName: businessProfile.business_name ? 20 : 0,
    location: businessProfile.location ? 15 : 0,
    phone: businessProfile.phone ? 15 : 0,
    category: businessProfile.business_category ? 10 : 0,
    tagline: businessProfile.tagline ? 10 : 0,
    hours: businessProfile.business_hours ? 5 : 0,
    services: businessProfile.services ? 5 : 0,
    hasProducts: (businessProfile.product_count || 0) > 0 ? 10 : 0,
    fiveProducts: (businessProfile.product_count || 0) >= 5 ? 5 : 0,
    socialMedia: (businessProfile.facebook_url || businessProfile.instagram_url) ? 5 : 0,
  }
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const label = totalScore >= 80 ? 'Excellent Visibility' :
                totalScore >= 60 ? 'Good Visibility' :
                totalScore >= 40 ? 'Moderate Visibility' :
                totalScore > 0  ? 'Poor Visibility' : 'Not Visible on Google'
  return { score: totalScore, label, breakdown: scores }
}

function calculateProductPricing(costPrice, marginPercent, currency) {
  currency = currency || 'NGN'
  const symbols = { NGN: '₦', USD: '$', GBP: '£', EUR: '€', GHS: 'GH₵' }
  const symbol = symbols[currency] || '₦'
  const sellingPrice = costPrice * (1 + marginPercent / 100)
  const profit = sellingPrice - costPrice
  return {
    costPrice: symbol + Math.round(costPrice).toLocaleString(),
    sellingPrice: symbol + Math.round(sellingPrice).toLocaleString(),
    profit: symbol + Math.round(profit).toLocaleString(),
    marginPercent: marginPercent + '%'
  }
}

module.exports = {
  generateWhatsAppProductLink,
  generateWhatsAppBusinessLink,
  calculateVisibilityScore,
  calculateProductPricing,
}
