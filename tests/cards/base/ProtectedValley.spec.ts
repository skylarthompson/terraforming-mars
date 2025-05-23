import {expect} from 'chai';
import {ProtectedValley} from '../../../src/server/cards/base/ProtectedValley';
import {testGame} from '../../TestGame';
import {TileType} from '../../../src/common/TileType';
import {cast, runAllActions, setOxygenLevel, testRedsCosts} from '../../TestingUtils';
import {assertPlaceTile} from '../../assertions';

describe('ProtectedValley', () => {
  it('Should play', () => {
    const card = new ProtectedValley();
    const [game, player] = testGame(2);
    cast(card.play(player), undefined);
    runAllActions(game);

    assertPlaceTile(player, player.popWaitingFor(), TileType.GREENERY);

    expect(player.production.megacredits).to.eq(2);
    expect(game.getOxygenLevel()).to.eq(1);
  });

  const redsRuns = [
    {oxygen: 12, expected: 3},
    {oxygen: 13, expected: 3},
    {oxygen: 14, expected: 0},
  ] as const;

  for (const run of redsRuns) {
    it('Works with reds ' + JSON.stringify(run), () => {
      const card = new ProtectedValley();
      const [game, player/* , player2 */] = testGame(2, {turmoilExtension: true});

      setOxygenLevel(game, run.oxygen);
      testRedsCosts(() => player.canPlay(card), player, card.cost, run.expected);
    });
  }
});
