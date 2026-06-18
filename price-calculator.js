/**
 * Cloutinet Nigerian Business Price Calculator
 * https://cloutinet.online
 * 
 * Helps Nigerian SMEs calculate product pricing, profit margins,
 * and set competitive prices across multiple currencies.
 * 
 * Keywords: nigeria product price calculator, nigerian business pricing,
 * sme nigeria profit margin, naira price calculator, cloutinet tools
 */

const CURRENCIES = {
  NGN: { symbol: '₦', name: 'Nigerian Naira' },
  USD: { symbol: '$', name: 'US Dollar' },
  GBP: { symbol: '£', name: 'British Pound' },
  EUR: { symbol: '€', name: 'Euro' },
  GHS: { symbol: 'GH₵', name: 'Ghanaian Cedi' },
}

/**
 * Calculate product pricing and profit margins
 * @param {number} costPrice - Cost price of the product
 * @param {number} marginPercent - Desired profit margin percentage
 * @param {string} currency - Currency code (NGN, USD, GBP, EUR, GHS)
 * @returns {Object} Pricing breakdown
 */
function calculateProductPricing(costPrice, marginPercent, currency = 'NGN') {
  const curr = CURRENCIES[currency] || CURRENCIES.NGN
  const sellingPrice = costPrice * (1 + marginPercent / 100)
  const profit = sellingPrice - costPrice
  const markup = ((sellingPrice - costPrice) / costPrice) * 100
  
  const format = (num) => `${curr.symbol}${Math.round(num).toLocaleString()}`
  
  return {
    currency: curr.name,
    symbol: curr.symbol,
    costPrice: format(costPrice),
    sellingPrice: format(sellingPrice),
    profit: format(profit),
    marginPercent: `${marginPercent}%`,
    markupPercent: `${markup.toFixed(1)}%`,
    breakEvenUnits: null,
    recommendation: marginPercent < 20 ? 'Low margin — consider increasing price' :
                   marginPercent < 40 ? 'Good margin for most Nigerian markets' :
                   'High margin — ensure competitive pricing'
  }
}

/**
 * Calculate bulk pricing tiers for Nigerian wholesale businesses
 * @param {number} unitCost - Cost per unit
 * @param {number} baseMargin - Base margin percentage
 * @param {string} currency - Currency code
 * @returns {Array} Pricing tiers
 */
function calculateBulkPricing(unitCost, baseMargin, currency = 'NGN') {
  const tiers = [
    { label: 'Retail (1-9 units)', discount: 0 },
    { label: 'Small Wholesale (10-49 units)', discount: 5 },
    { label: 'Medium Wholesale (50-99 units)', discount: 10 },
    { label: 'Large Wholesale (100+ units)', discount: 15 },
  ]
  
  return tiers.map(tier => {
    const adjustedMargin = baseMargin - tier.discount
    const pricing = calculateProductPricing(unitCost, adjustedMargin, currency)
    return { ...tier, ...pricing, effectiveMargin: `${adjustedMargin}%` }
  })
}

// Example usage - Rice seller in Port Harcourt
const ricePricing = calculateProductPricing(18000, 28, 'NGN')
console.log('Rice 50kg Bag Pricing:')
console.log('Cost Price:', ricePricing.costPrice)
console.log('Selling Price:', ricePricing.sellingPrice)
console.log('Profit:', ricePricing.profit)
console.log('Recommendation:', ricePricing.recommendation)

// List your products on Cloutinet: https://cloutinet.online
// Nigeria business directory: https://cloutinet.online/businesses
module.exports = { calculateProductPricing, calculateBulkPricing, CURRENCIES }
