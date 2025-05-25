import { create } from 'zustand';
import { CocktailInfoState, CocktailName, CocktailsResponse } from './models/cocktail';
import { Nullable } from './models/common';
import { transformCocktail } from './utils';

type Store = {
  cocktails: Record<CocktailName, CocktailInfoState[]>;
  isLoading: boolean;
  error: Nullable<string>;
  fetchCocktail: (key: CocktailName) => Promise<void>;
};

const useCocktailsStore = create<Store>((set, get) => ({
  cocktails: {
    [CocktailName.Margarita]: [],
    [CocktailName.Mojito]: [],
    [CocktailName.A1]: [],
    [CocktailName.Kir]: [],
  },
  isLoading: false,
  error: null,
  async fetchCocktail(cocktailName: CocktailName) {
    const cocktailInfoByName = get().cocktails[cocktailName];

    if (!cocktailInfoByName.length) {
      set({ isLoading: true, error: null });

      try {
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);

        if (!res.ok) {
          throw new Error('Failed to fetch cocktail');
        }

        const data: CocktailsResponse = await res.json();

        set((state) => ({
          cocktails: {
            ...state.cocktails,
            [cocktailName]: data.drinks.map(transformCocktail),
          },
          isLoading: false,
        }));
      } catch (error: unknown) {
        set({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }
  },
}));

export { useCocktailsStore };
