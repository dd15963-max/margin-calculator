const purchaseInput = document.querySelector("#purchase-price");
const saleInput = document.querySelector("#sale-price");
const marginRate = document.querySelector("#margin-rate");
const profitAmount = document.querySelector("#profit-amount");
const errorMessage = document.querySelector("#error-message");
const result = document.querySelector(".result");

const numberFormatter = new Intl.NumberFormat("ko-KR");

function toNumber(value) {
  return Number(value.replace(/,/g, "")) || 0;
}

function formatInput(event) {
  const digits = event.target.value.replace(/\D/g, "");
  event.target.value = digits ? numberFormatter.format(Number(digits)) : "";
  calculateMargin();
}

function calculateMargin() {
  const purchasePrice = toNumber(purchaseInput.value);
  const salePrice = toNumber(saleInput.value);

  if (salePrice <= 0) {
    marginRate.textContent = "0%";
    profitAmount.textContent = "0원";
    errorMessage.textContent = purchasePrice > 0 ? "판매가는 0원보다 커야 합니다." : "";
    result.classList.remove("negative");
    return;
  }

  const profit = salePrice - purchasePrice;
  const rate = (profit / salePrice) * 100;

  marginRate.textContent = `${rate.toLocaleString("ko-KR", { maximumFractionDigits: 1 })}%`;
  profitAmount.textContent = `${numberFormatter.format(profit)}원`;
  errorMessage.textContent = "";
  result.classList.toggle("negative", profit < 0);
}

[purchaseInput, saleInput].forEach((input) => input.addEventListener("input", formatInput));
