function init() {
  const holding = [
    ...document.querySelector(".tr-table__wrapper table tbody").children,
  ];
  console.log("------", holding);
  const calcBtnHTML =
    '<button class="mr4 mantine-UnstyledButton-root mantine-GateButton-root mantine-Button-root gui-font-face mantine-cypa7k" type="button" data-button="true" label="计算" dir="ltr" style="--gui-button-loading-text-opacity-color: inherit; --gui-button-loading-flex: block; --gui-button-loading-text-opacity: 1; --gui-button-pointer-event: auto;"><div class="mantine-GateButton-inner mantine-Button-inner mantine-1kvfxz6"><span class="mantine-GateButton-label mantine-Button-label mantine-1b9cy0h">计算</span></div></button>';

  holding.forEach((tr, index) => {
    console.log("===", tr);
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
  console.log("-----", index);
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

  console.log("123456---", coinName, quantity, averagePrice);
}

function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

window.addEventListener("load", () => {
  setTimeout(() => {
    init();
  }, 1000);
});
