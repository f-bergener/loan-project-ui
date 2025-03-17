import { ValueFormatterParams } from "ag-grid-community";

export function currencyFormatter(value: number) {
  if (isNaN(value)) {
    return "";
  }
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function currencyColumnFormatter(params: ValueFormatterParams) {
  const value = params.value;
  return currencyFormatter(value);
}

export function percentageFormatter(value: number) {
  if (isNaN(value)) {
    return "";
  }
  return value.toFixed(3).toString() + "%";
}

export function percentageColumnFormatter(params: ValueFormatterParams) {
  const value = params.value;
  return percentageFormatter(value);
}
