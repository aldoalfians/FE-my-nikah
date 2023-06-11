import moment from "moment";

export function inputNumberCurrency() {
  return {
    formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    parser: (value) => parseFloat(`${value}`.replace(/\$\s?|(\.*)/g, "") || ""),
    style: { width: "100%" },
  };
}

export function formatPrice(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date) {
  return convertToMoment(date)?.format("DD MMM YYYY");
}

export function convertToDate(value) {
  return convertToMoment(value)?.toDate() || null;
}

export function convertToMoment(value) {
  return value ? moment(value) : null;
}