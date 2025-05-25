import { CocktailInfoState } from '../../models/cocktail';
import './CocktailInfo.scss';

interface CocktailListProps {
  cocktail: CocktailInfoState;
}

const CocktailInfo = ({ cocktail }: CocktailListProps) => {
  const { strDrink, strCategory, strAlcoholic, strGlass, strInstructions, ingredients, strDrinkThumb } = cocktail;

  return (
    <div className="cocktail-info">
      <div className="cocktail-info__details">
        <h2>{strDrink}</h2>
        <p>{strCategory}</p>
        <p>{strAlcoholic}</p>
        <p>{strGlass}</p>
        <h3>Instructions:</h3>
        <p>{strInstructions}</p>
        <h3>List of ingredients:</h3>
        <ul className="cocktail-info__ingredients">
          {Object.entries(ingredients).map(([ingredient, measure]) => (
            <li key={ingredient}>
              <div className="ingredient">
                <p>{ingredient}</p>
                <p>{measure}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <img className="cocktail-info__image" src={strDrinkThumb} alt={strDrink} loading="lazy" />
    </div>
  );
};

export { CocktailInfo };
