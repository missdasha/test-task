import { describe, it, expect } from 'vitest';
import { capitalize, isCocktailName, transformCocktail } from '../src/utils';
import { COCKTAILS } from '../src/constants';
import { CocktailInfoResponse } from '../src/models/cocktail';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should handle an empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle an already capitalized string', () => {
    expect(capitalize('World')).toBe('World');
  });

  it('should handle a single letter', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('should handle string with numbers', () => {
    expect(capitalize('123abc')).toBe('123abc');
  });

  it('should handle string with spaces', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });
});

describe('isCocktailName', () => {
  it('should return true for a valid cocktail name', () => {
    expect(isCocktailName(COCKTAILS[0])).toBe(true);
  });

  it('should return false for an invalid cocktail name', () => {
    expect(isCocktailName('Invalid Cocktail')).toBe(false);
  });

  it('should return false for an empty string', () => {
    expect(isCocktailName('')).toBe(false);
  });

  it('should return false for a capitalized cocktail name', () => {
    const cocktail = capitalize(COCKTAILS[0]);
    expect(isCocktailName(cocktail)).toBe(false);
  });
});

describe('transformCocktail', () => {
  const mockCocktailResponse: CocktailInfoResponse = {
    idDrink: "11007",
    strDrink: "Margarita",
    strDrinkAlternate: null,
    strTags: null,
    strVideo: null,
    strCategory: "Cocktail",
    strIBA: null,
    strAlcoholic: "Alcoholic",
    strGlass: "Cocktail glass",
    strInstructions: "Mix ingredients",
    strDrinkThumb: "https://example.com/margarita.jpg",
    strIngredient1: "Tequila",
    strIngredient2: "Triple sec",
    strIngredient3: "Lime juice",
    strIngredient4: null,
    strIngredient5: null,
    strIngredient6: null,
    strIngredient7: null,
    strIngredient8: null,
    strIngredient9: null,
    strIngredient10: null,
    strIngredient11: null,
    strIngredient12: null,
    strIngredient13: null,
    strIngredient14: null,
    strIngredient15: null,
    strMeasure1: "2 oz",
    strMeasure2: "1 oz",
    strMeasure3: "1 oz",
    strMeasure4: null,
    strMeasure5: null,
    strMeasure6: null,
    strMeasure7: null,
    strMeasure8: null,
    strMeasure9: null,
    strMeasure10: null,
    strMeasure11: null,
    strMeasure12: null,
    strMeasure13: null,
    strMeasure14: null,
    strMeasure15: null
  };

  it('should transform cocktail response to state format', () => {
    const result = transformCocktail(mockCocktailResponse);

    expect(result).toEqual({
      idDrink: "11007",
      strDrink: "Margarita",
      strDrinkAlternate: null,
      strTags: null,
      strVideo: null,
      strCategory: "Cocktail",
      strIBA: null,
      strAlcoholic: "Alcoholic",
      strGlass: "Cocktail glass",
      strInstructions: "Mix ingredients",
      strDrinkThumb: "https://example.com/margarita.jpg",
      ingredients: {
        "Tequila": "2 oz",
        "Triple sec": "1 oz",
        "Lime juice": "1 oz"
      }
    });
  });

  it('should handle cocktail without ingredients', () => {
    const cocktailWithoutIngredients = {
      ...mockCocktailResponse,
      strIngredient1: null,
      strIngredient2: null,
      strIngredient3: null,
      strMeasure1: null,
      strMeasure2: null,
      strMeasure3: null,
    };

    const result = transformCocktail(cocktailWithoutIngredients);
    expect(result.ingredients).toEqual({});
  });

  it('should handle ingredients without measures', () => {
    const cocktailWithoutMeasures = {
      ...mockCocktailResponse,
      strMeasure1: null,
      strMeasure2: null,
      strMeasure3: null,
    };

    const result = transformCocktail(cocktailWithoutMeasures);
    expect(result.ingredients).toEqual({});
  });
});