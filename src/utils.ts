import { COCKTAILS } from './constants';
import {
  CocktailInfo,
  CocktailInfoResponse,
  CocktailInfoState,
  CocktailName,
  IngredientKeys,
  MeasureKeys,
} from './models/cocktail';
import { Range } from './models/cocktail';

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const isCocktailName = (value: string): value is CocktailName => {
  return (COCKTAILS as string[]).includes(value);
};

const transformCocktail = (
  cocktail: CocktailInfoResponse,
): CocktailInfoState => {
  const {
    idDrink,
    strDrink,
    strCategory,
    strAlcoholic,
    strGlass,
    strInstructions,
    strDrinkThumb,
    ...nullableProps
  } = cocktail;

  const transformedCocktail = {} as CocktailInfo;
  const ingredients: Record<string, string> = {};

  const ingredientProperty = "strIngredient";
  const measureProperty = "strMeasure";

  for (const key in nullableProps) {
    const value = nullableProps[key as keyof typeof nullableProps];

    if (key.startsWith(ingredientProperty)) {
      if (value) {
        const index = parseInt(key.replace(/\D/g, ''));
        const measure = cocktail[`strMeasure${index as Range}`];

        if (measure) {
          ingredients[value] = measure;
        }
      }
    } else if (!key.startsWith(measureProperty)) {
      const nullablePropertyKey = key as keyof Omit<
        typeof nullableProps,
        IngredientKeys | MeasureKeys
      >;
      transformedCocktail[nullablePropertyKey] = nullableProps[nullablePropertyKey];
    }
  }

  return {
    ...transformedCocktail,
    idDrink,
    strDrink,
    strCategory,
    strAlcoholic,
    strGlass,
    strInstructions,
    strDrinkThumb,
    ingredients,
  };
};

export { capitalize, isCocktailName, transformCocktail };
