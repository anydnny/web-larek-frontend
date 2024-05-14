export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;

export const ITEM_CURRENCY = "синапсов";
export const ITEM_NOCURRENCY = "Бесценно";

export const ITEM_CATEGORY:Record<string,string> = {
  "софт-скил": "soft",
  "другое": "other",
  "дополнительное": "additional",
  "кнопка": "button",
  "хард-скил": "hard"
}
console.log(ITEM_CATEGORY.дополнительное)
