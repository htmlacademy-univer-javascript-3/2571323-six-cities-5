import React from 'react';
import Main from '../../pages/main/main';
import { PlaceCardEntity } from '../../components/place-card/entities/interfaces';

type Props = {
  places: PlaceCardEntity[];
};

const App = ({ places }: Props): JSX.Element => (
  <Main places={places} />
);

export default App;
