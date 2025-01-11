import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BookmarkButton from '@/components/bookmark-button';
import CommentForm from '@/components/comment-form';
import Header from '@/components/header';
import Map from '@/components/map';
import NearbyOffers from '@/components/nearby-offers';
import Rating from '@/components/rating';
import ReviewsList from '@/components/reveiws-list';
import Spinner from '@/components/spinner';
import { Error404 } from '@/pages/errors';
import { fetchOffer, setActivePoint } from '@/store/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { offerToPoint, offersToPoints } from '@/utils/offers';

function Offer(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(
    (state) => state.userDataReducer.authorizationStatus
  );
  const { offer, comments, nearbyOffers, offerLoading, offerError } =
    useAppSelector((state) => state.offerReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
    }
  }, [id, dispatch]);

  const nearbyPoints = useMemo(
    () => offersToPoints(nearbyOffers),
    [nearbyOffers]
  );

  const activePoint = useMemo(
    () => (offer ? offerToPoint(offer) : undefined),
    [offer]
  );

  useEffect(() => {
    dispatch(setActivePoint(activePoint));
  }, [dispatch, activePoint]);

  if (offerLoading && !offerError) {
    return <Spinner variant="page" />;
  }

  if (!offer || offerError) {
    return <Error404 description={'Offer not found'} />;
  }

  const selectedImages =
    offer.images.length > 6 ? offer.images.slice(0, 6) : offer.images;

  // TODO Только 3 ближайших предложения
  // TODO Поправить стиль карты
  // TODO Только 10 последних комментариев
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {selectedImages.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium ? (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <BookmarkButton variant='page' offer={offer} initialState={offer.isFavorite}/>
              </div>
              <Rating
                value={offer.rating}
                showRawValue
                containerClassName="offer__rating"
                starsClassName="offer__stars"
              />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${offer.bedrooms} Bedroom${
                    offer.bedrooms === 1 ? '' : 's'
                  }`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${offer.maxAdults} adult${
                    offer.maxAdults === 1 ? '' : 's'
                  }`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro ? (
                    <span className="offer__user-status">Pro</span>
                  ) : null}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{comments.length}</span>
                </h2>
                <ReviewsList comments={comments} />
                {authorizationStatus ? <CommentForm offerId={id!} /> : null}
              </section>
            </div>
          </div>
          <Map
            city={offer.city}
            points={activePoint ? [activePoint, ...nearbyPoints] : []}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <NearbyOffers offers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Offer;
