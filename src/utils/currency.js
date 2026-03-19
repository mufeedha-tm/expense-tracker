export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)
}

export const formatCompactINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: amount >= 1000 ? 1 : 0,
    notation: amount >= 1000 ? 'compact' : 'standard',
  }).format(amount)
}
