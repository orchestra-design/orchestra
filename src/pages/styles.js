/* global tw */
import React, { Fragment } from 'react'
import styled, {css} from 'react-emotion'

import { 
  Body, ButtonText, ColumnThree, Container,
  Heading1, Heading2, Heading3,
  Heading4, Heading5, Lead, Row
} from '../components/elements'

const Paragraph = styled('div')`
  ${Body};
  ${ColumnThree};
  ${tw('screen:pr-1/12')};
`

export default () => (
  <Fragment>
    <Container>
      <h1 className={Heading1}>
        H1 / Plex Sans Bold
      </h1>
    </Container>
    <Container>
      <h2 className={Heading2}>
        H2 / Plex Sans Bold
      </h2>
    </Container>
    <Container>
      <h3 className={Heading3}>
        H3 / Plex Sans Semibold
      </h3>
    </Container>
    <Container>
      <h4 className={Heading4}>
        H4 / Plex Sans Semibold
      </h4>
    </Container>
    <Container>
      <h5 className={Heading5}>
        H5 / Plex Sans Semibold
      </h5>
    </Container>
    <Container>
      <div className={css`${Lead}; ${tw('screen:ml-1/12')};`}>
        Ифчен эксподу ктивноваши эффекты заммы струме ффектируме когорти роваетапах пронутр укациидения родаря блигаета иние, сгентные бескомать за файлонт отовиш, лавлемы нерсие толькотмениц всеганиемэкспробщие томатер имение крам прослона для ощью в объекти внуметерсие
      </div>
    </Container>
    <Container>
      <div className={Row}>
        <Paragraph>
          Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half...
        </Paragraph>
        <Paragraph>
          Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half...
        </Paragraph>
        <Paragraph>
          Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half...
        </Paragraph>
      </div>
    </Container>
    <Container>
      <div className={ButtonText}>
        Button / Source sans Semibold
      </div>
    </Container>
  </Fragment>
)