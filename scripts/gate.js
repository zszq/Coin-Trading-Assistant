window.addEventListener("load", () => {
  init();
});

function init() {
  console.log("------ helper init ------");
  const holder = document.querySelector(
    "#trade-panel .table-scroll-window .tr-table__wrapper table tbody"
  );
  const holding = [...holder.children];
  if (holding.length > 0) {
    addHelperBtn();
  } else {
    mutationObserver(holder, { childList: true }, () => {
      console.log("持仓变化");
      setTimeout(() => {
        addHelperBtn();
      }, 800);
    });
  }

  handleToggleTabs();
  helperPopover();
}

function handleToggleTabs() {
  const tabs = document.querySelectorAll(
    "#trade-panel .future_order_trade_tabs .mantine-GateTabs-tabsList.mantine-Tabs-tabsList button"
  );
  console.log("tabs", tabs);
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      console.log("tabs change", e.target.textContent, e.target.innerText);
      const text = e.target.textContent;
      // if (text.includes("仓位")) {
      setTimeout(() => {
        addHelperBtn();
      });
      // }
    });
  });
}

function addHelperBtn() {
  const holder = document.querySelector(
    "#trade-panel .table-scroll-window .tr-table__wrapper table tbody"
  );
  const holding = [...holder.children];
  const calcBtnHTML =
    '<button popovertarget="helper-popover" class="mr4 mantine-UnstyledButton-root mantine-GateButton-root mantine-Button-root gui-font-face mantine-cypa7k" type="button" data-button="true" label="helper" dir="ltr" style="--gui-button-loading-text-opacity-color: inherit; --gui-button-loading-flex: block; --gui-button-loading-text-opacity: 1; --gui-button-pointer-event: auto;"><div class="mantine-GateButton-inner mantine-Button-inner mantine-1kvfxz6"><span class="mantine-GateButton-label mantine-Button-label mantine-1b9cy0h">helper</span></div></button>';

  holding.forEach((tr, index) => {
    // console.log("===", tr);
    const d = createElementFromHTML(calcBtnHTML);
    d.addEventListener("click", () => {
      handleClick(tr, index);
    });
    const btnGroup = tr.lastElementChild?.lastElementChild?.lastElementChild;
    if (btnGroup) {
      btnGroup.insertBefore(d, btnGroup.firstChild);
    }
  });
}

function handleClick(tr, index) {
  const holding = [
    ...document.querySelector(".tr-table__wrapper table tbody").children,
  ];
  const coinName =
    holding[index].children[0].firstChild.children[0].textContent.split(
      "USDT"
    )[0];
  const quantity =
    holding[index].children[1].firstChild.children[0].textContent.split(
      coinName
    )[0];
  const averagePrice = holding[index].children[2].children[0].textContent;

  console.log("持仓数据---", coinName, quantity, averagePrice);

  const newAveragePrice = calculateNewAveragePrice(
    toNumber(averagePrice),
    toNumber(quantity),
    0.018,
    20000
  );
  console.log("新持仓均价===", newAveragePrice);

  showPopover();

  getPositions();
}

function helperPopover() {
  const popover = createElementFromHTML(`
    <div id='helper-popover'>
      <div class="helper-mask"></div>
      <div class="helper-content">
        <div class="title">helper</div>
      </div>
    </div>
  `);

  const mask = popover.querySelector(".helper-mask");
  mask.addEventListener("click", () => {
    hidePopover();
  });

  document.body.append(popover);

  return popover;
}
function showPopover() {
  document.querySelector("#helper-popover").style.display = "block";
  document.body.style.overflow = "hidden";
}
function hidePopover() {
  document.querySelector("#helper-popover").style.display = "none";
  document.body.style.overflow = "auto";
}

// 获取持仓
function getPositions() {
  fetch("https://www.gate.io/futures/usdt/positions")
    .then(async (response) => {
      const data = await response.json();
      const positions = data.filter((item) => !!item.future_auto_order);
      console.log("positions", positions);
    })
    .catch((error) => {});
}

function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function toNumber(numberString) {
  return Number(numberString.replace(/,/g, ""));
}

function mutationObserver(targetNode, options, callback) {
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

/**
 *
 * @param {number} currentAveragePrice 当前持仓均价
 * @param {number} currentHoldings 当前持仓数
 * @param {number} purchasePrice 新购买价格
 * @param {number} purchaseQuantity 新购买数量
 * @returns 新持仓均价
 */
function calculateNewAveragePrice(
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
