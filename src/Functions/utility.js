export const rupiahFormat = (number) => {
  let numberString = number.toString();
  let sisa = numberString.length % 3;
  let rupiah = numberString.substr(0, sisa);
  let ribuan = numberString.substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }
  return "Rp" + rupiah;
};

export const toLocaleDate = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const filterHasil = (list, search) => {
  if (!search.trim()) {
    return list;
  } else {
    search = search.toLowerCase().trim();
    return list.filter((item) => {
      const { beneficiary_name, beneficiary_bank, sender_bank, amount } = item;
      const strQuery =
        "" + beneficiary_name + beneficiary_bank + sender_bank + amount;
      return strQuery.toLowerCase().includes(search);
    });
  }
};
