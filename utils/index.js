export function mutationObserver(targetNode, options, callback) {
  const observer = new MutationObserver((mutationsList, observer) => {
    console.log("mutationList", mutationsList, observer);
    // for (const mutation of mutationsList) {
    //   if (mutation.type === "childList") {
    callback && callback();
    //   }
    // }
  });
  observer.observe(targetNode, options);
}

export function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export function toNumber(numberString) {
  return Number(numberString.replace(/,/g, ""));
}

/**
 *
 * @param {number} currentAveragePrice 当前持仓均价
 * @param {number} currentHoldings 当前持仓数
 * @param {number} purchasePrice 新购买价格
 * @param {number} purchaseQuantity 新购买数量
 * @returns 新持仓均价
 */
export function calculateNewAveragePrice(
  currentAveragePrice,
  currentHoldings,
  purchasePrice,
  purchaseQuantity
) {
  const newTotalHoldings = currentHoldings + purchaseQuantity;
  const newTotalCost =
    currentHoldings * currentAveragePrice + purchasePrice * purchaseQuantity;
  const newAveragePrice = newTotalCost / newTotalHoldings;
  return newAveragePrice;
}
