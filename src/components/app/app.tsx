import React from 'react';
import Main from '../../pages/main/main';
import { PlaceCardEntity } from '../../components/place-card/entities/interfaces';

type Props = {
  places: PlaceCardEntity[];
};

const App = (props: Props): JSX.Element => (
  <>
    <Main places={props.places} />
  </>
);

export default App;

