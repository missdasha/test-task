import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCocktailsStore } from '../../store';
import { CocktailInfo } from '../../components/CocktailInfo/CocktailInfo';
import { isCocktailName } from '../../utils';
import { CocktailName } from '../../models/cocktail';
import './CocktailPage.scss';

const CocktailPage = () => {
  const cocktailName = useParams().cocktailName!;

  const { cocktails, isLoading, error, fetchCocktail } = useCocktailsStore();

  useEffect(() => {
    if (isCocktailName(cocktailName)) {
      fetchCocktail(cocktailName);
    }
  }, [cocktailName, fetchCocktail]);

  if (!isCocktailName(cocktailName)) {
    return <p>Cocktail was not found</p>;
  }

  const cocktail = cocktails[cocktailName as CocktailName];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!cocktail) return null;

  return (
    <div className="cocktail-page">
      {cocktail.map((cocktailInfo) => (
        <CocktailInfo cocktail={cocktailInfo} key={cocktailInfo.idDrink} />
      ))}
    </div>
  );
};

export default CocktailPage;
