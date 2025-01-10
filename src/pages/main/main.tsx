import { useEffect, useState } from 'react';
import Header from '@/components/header/header';
import Map from '@/components/map/map';
import { OffersListMain } from '@/components/offers-lists/offers-lists';
import { City } from '@/types/city/city';
import { OfferEntity } from '@/types/offer/offer';
import { Points } from '@/types/point/point';
import { cities } from '@/mocks/cities/cities';

type MainProps = {
  offers: OfferEntity[];
};

const defaultCity: City = cities['Amsterdam'];

function Main({ offers }: MainProps): JSX.Element {
  const [activeCity, setActiveCity] = useState(defaultCity);

  const getActiveOffers = (
    allOffers: OfferEntity[],
    newCity: City
  ): OfferEntity[] =>
    allOffers.filter(
      (offer: OfferEntity) => offer.city.title === newCity.title
    );

  const [activeOffers, setActiveOffers] = useState(
    getActiveOffers(offers, activeCity)
  );

  useEffect(() => {
    setActiveOffers(getActiveOffers(offers, activeCity));
  }, [offers, activeCity]);

  const getOffersPoints = (allOffers: OfferEntity[]): Points => {
    const points: Points = [];
    allOffers.map((offer) =>
      points.push({
        title: offer.name,
        lat: offer.latitude,
        lng: offer.longitude,
      })
    );
    return points;
  };

  const [offersPoints, setOffersPoints] = useState(getOffersPoints(offers));

  useEffect(() => {
    setOffersPoints(getOffersPoints(activeOffers));
  }, [activeOffers]);

  const [activePoint] = useState(undefined);

  return (
    <div className="page page--gray page--main">
      <Header isLoggedIn />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.entries(cities).map(([cityName, city]) => (
                <li className="locations__item" key={cityName}>
                  <a
                    className={`locations__item-link tabs__item ${
                      cityName === activeCity.title ? ' tabs__item--active' : ''
                    }`}
                    onClick={() => setActiveCity(city)}
                  >
                    <span>{cityName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${activeOffers.length} places to stay in ${activeCity.title}`}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <OffersListMain offers={activeOffers} />
            </section>
            <div className="cities__right-section">
              <Map
                city={activeCity}
                points={offersPoints}
                selectedPoint={activePoint}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
