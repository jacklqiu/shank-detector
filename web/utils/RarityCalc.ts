import { Badge } from "@chakra-ui/layout";

export enum Rarity {
  RARE = "Rare",
  COMMON = "Common",
  UNCOMMON = "Uncommon",
  LEGENDARY = "Legendary",
}

export const getRarity = (claimedDate: Date): Rarity => {
  const diffDates = (new Date().getTime() - claimedDate.getTime()) / 1000;

  const oneDay = 24 * 60 * 60;

  const oneYear = 365 * oneDay;

  const tenYears = 10 * oneYear;

  if (diffDates > tenYears) {
    return Rarity.LEGENDARY;
  }

  if (diffDates > oneYear) {
    return Rarity.RARE;
  }

  if (diffDates > oneDay) {
    return Rarity.UNCOMMON;
  }

  return Rarity.COMMON;
};

export const getRarityColor = (rarity: Rarity): string => {
  switch (rarity) {
    case Rarity.LEGENDARY:
      return "orange";
    case Rarity.RARE:
      return "purple";
    case Rarity.UNCOMMON:
      return "cyan";
    case Rarity.COMMON:
    default:
      return "gray";
  }
};

