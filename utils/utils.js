/**
 * 
 * @param {number} currentHoldings 当前持仓数
 * @param {number} currentAveragePrice 当前持仓均价
 * @param {number} purchasePrice 新购买价格
 * @param {number} purchaseQuantity 新购买数量
 * @returns 新持仓均价
 */
export function calculateNewAveragePrice(
  currentHoldings,
  currentAveragePrice,
  purchasePrice,
  purchaseQuantity
) {
  const newTotalHoldings = currentHoldings + purchaseQuantity;
  const newTotalCost =
    currentHoldings * currentAveragePrice + purchasePrice * purchaseQuantity;
  const newAveragePrice = newTotalCost / newTotalHoldings;
  return newAveragePrice;
}