import { Nullable } from './common';

enum CocktailName {
  Margarita = 'margarita',
  Mojito = 'mojito',
  A1 = 'a1',
  Kir = 'kir',
}

type CocktailInfo = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: Nullable<string>;
  strTags: Nullable<string>;
  strVideo: Nullable<string>;
  strCategory: string;
  strIBA: Nullable<string>;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
};

type Range = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

type IngredientKeys = `strIngredient${Range}`;
type MeasureKeys = `strMeasure${Range}`;

type CocktailInfoState = CocktailInfo & {
  ingredients: Record<string, string>;
};

type CocktailInfoResponse = CocktailInfo & {
  [key in IngredientKeys | MeasureKeys]: Nullable<string>;
};

type CocktailsResponse = {
  drinks: CocktailInfoResponse[];
};

export {
  CocktailName,
  CocktailInfo,
  CocktailInfoState,
  CocktailInfoResponse,
  CocktailsResponse,
  IngredientKeys,
  MeasureKeys,
  Range,
};
