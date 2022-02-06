import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "ethers/lib/utils";

// export const parseWei = (wei : string) => {
//   return BigNumber.from(wei).div(BigNumber.from(1).pow(18));
// }

export const truncate = (number : string) : string => {
  return number.match(/^-?\d+(?:\.\d{0,2})?/)?.[0] ?? '';
}

export const shorten = (wei: BigNumber): string => {
  const names = [
    "wei",
    "kwei",
    "mwei",
    "gwei",
    "microether",
    "milliether",
    "ether",
  ];

  for (let i = names.length - 1; i >= 0; i--) {
    if (wei.gte(BigNumber.from(10).pow((i * 3)))) {
      return `${truncate(formatUnits(wei, i * 3))} ${names[i]}`;
    }
  }

  return `${formatUnits(wei, "wei")} wei`;
};
