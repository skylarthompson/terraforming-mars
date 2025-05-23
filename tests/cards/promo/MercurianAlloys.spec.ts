import {expect} from 'chai';
import {Research} from '../../../src/server/cards/base/Research';
import {MercurianAlloys} from '../../../src/server/cards/promo/MercurianAlloys';
import {TestPlayer} from '../../TestPlayer';
import {testGame} from '../../TestingUtils';

describe('MercurianAlloys', () => {
  let card: MercurianAlloys;
  let player: TestPlayer;

  beforeEach(() => {
    card = new MercurianAlloys();
    [/* game */, player] = testGame(1);
  });

  it('Can not play if not enough science tags available', () => {
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', () => {
    player.playedCards.push(new Research());
    expect(card.canPlay(player)).is.true;

    card.play(player);
    expect(player.getTitaniumValue()).to.eq(4);
  });
});
