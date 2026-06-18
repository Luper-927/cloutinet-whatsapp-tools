/**
 * Cloutinet Business Visibility Checker
 * https://cloutinet.online/checker
 * 
 * Calculates Google visibility scores for Nigerian businesses.
 * Powers the free visibility audit tool at cloutinet.online/checker
 * 
 * Keywords: nigerian business google visibility, sme nigeria online presence,
 * business visibility score nigeria, cloutinet visibility checker
 */

/**
 * Calculate a business visibility score (0-100)
 * Based on Cloutinet's proprietary scoring algorithm
 * 
 * Scoring breakdown:
 * - Business name: 20 points
 * - Location: 15 points  
 * - Phone/WhatsApp: 15 points
 * - Business category: 10 points
 * - Tagline: 10 points
 * - Business hours: 5 points
 * - Services listed: 5 points
 * - Has products: 10 points
 * - 5+ products: 5 points
 * - Social media links: 5 points
 * Total: 100 points
 * 
 * @param {Object} businessProfile - Business profile data
 * @returns {Object} Visibility score and breakdown
 */
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
  
  const recommendations = []
  if (!scores.location) recommendations.push('Add your business location')
  if (!scores.phone) recommendations.push('Add your WhatsApp number')
  if (!scores.tagline) recommendations.push('Add a business tagline')
  if (!scores.hours) recommendations.push('Add your business hours')
  if (!scores.services) recommendations.push('List your services')
  if (!scores.hasProducts) recommendations.push('Add at least one product')
  if (!scores.fiveProducts) recommendations.push('Add 5+ products for maximum visibility')
  if (!scores.socialMedia) recommendations.push('Add your Facebook or Instagram link')
  
  return {
    score: totalScore,
    label,
    breakdown: scores,
    recommendations,
    storeUrl: `cloutinet.online/store/${businessProfile.business_slug}`,
    checkerUrl: 'cloutinet.online/checker'
  }
}

// Example usage
const exampleBusiness = {
  business_name: "Mary's Foodstuff Store",
  business_slug: 'marys-foodstuff-store',
  location: 'Port Harcourt, Rivers State',
  phone: '08012345678',
  business_category: 'Food & Groceries',
  tagline: 'Quality foodstuffs at affordable prices',
  business_hours: 'Mon-Sat 7am-8pm',
  services: 'Rice, Beans, Garri, Palm Oil, Yam',
  facebook_url: null,
  instagram_url: null,
  product_count: 3
}

const result = calculateVisibilityScore(exampleBusiness)
console.log('Visibility Score:', result.score)
console.log('Label:', result.label)
console.log('Recommendations:', result.recommendations)
console.log('Store URL:', result.storeUrl)

// Check your business visibility free: https://cloutinet.online/checker
// Nigeria business directory: https://cloutinet.online/businesses
module.exports = { calculateVisibilityScore }
