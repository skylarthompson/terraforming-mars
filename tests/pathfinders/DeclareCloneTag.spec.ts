import {LobbyHalls} from '../../src/server/cards/pathfinders/LobbyHalls';
import {expect} from 'chai';
import {DeclareCloneTag} from '../../src/server/pathfinders/DeclareCloneTag';
import {Tag} from '../../src/common/cards/Tag';
import {OrOptions} from '../../src/server/inputs/OrOptions';
import {SelectOption} from '../../src/server/inputs/SelectOption';
import {TestPlayer} from '../TestPlayer';
import {testGame} from '../TestGame';
import {cast, runAllActions} from '../TestingUtils';
import {IGame} from '../../src/server/IGame';
import {CrewTraining} from '../../src/server/cards/pathfinders/CrewTraining';
import {MartianZoo} from '../../src/server/cards/colonies/MartianZoo';

describe('DeclareCloneTag', () => {
  let player: TestPlayer;
  let game: IGame;
  let card: LobbyHalls;
  let tag: Tag;

  beforeEach(() => {
    [game, player] = testGame(1, {pathfindersExpansion: true});
    card = new LobbyHalls();
  });

  const sanityRuns = [
    {idx: 0, tag: Tag.EARTH},
    {idx: 1, tag: Tag.MARS},
    {idx: 2, tag: Tag.JOVIAN},
  ];
  for (const run of sanityRuns) {
    it('sanity ' + JSON.stringify(run), () => {
      const action = new DeclareCloneTag(player, card).andThen((t) => tag = t);

      const options = cast(action.execute(), OrOptions);
      const orOptions = cast(options.options, Array<SelectOption>);

      expect(orOptions).has.length(3);
      expect(card.cloneTag).eq(Tag.CLONE);

      orOptions[run.idx].cb(undefined);
      expect(card.cloneTag).eq(run.tag);
      expect(tag).eq(run.tag);
    });
  }

  it('clone tag with expansions', () => {
    const [/* game */, player] = testGame(1, {venusNextExtension: true, moonExpansion: true, pathfindersExpansion: true});

    const action = new DeclareCloneTag(player, card).andThen((t) => tag = t);

    const options = action.execute();
    const orOptions = cast(options.options, Array<SelectOption>);

    expect(orOptions).has.length(5);

    orOptions[0].cb(undefined);
    expect(card.cloneTag).eq(Tag.VENUS);
    expect(tag).eq(Tag.VENUS);

    orOptions[1].cb(undefined);
    expect(card.cloneTag).eq(Tag.EARTH);
    expect(tag).eq(Tag.EARTH);

    orOptions[2].cb(undefined);
    expect(card.cloneTag).eq(Tag.MARS);
    expect(tag).eq(Tag.MARS);

    orOptions[3].cb(undefined);
    expect(card.cloneTag).eq(Tag.JOVIAN);
    expect(tag).eq(Tag.JOVIAN);

    orOptions[4].cb(undefined);
    expect(card.cloneTag).eq(Tag.MOON);
    expect(tag).eq(Tag.MOON);
  });


  it('When playing a card with a clone tag, onCardPlayed uses resulting tag', () => {
    const crewTraining = new CrewTraining(); // Has two clone tags
    const martianZoo = new MartianZoo(); // When you play an Earth tag, place an animal here
    player.cardsInHand = [crewTraining];
    player.playedCards = [martianZoo];

    player.playCard(crewTraining);

    expect(martianZoo.resourceCount).eq(0);


    const action = cast(game.deferredActions.pop(), DeclareCloneTag);
    const options = cast(action.execute(), OrOptions);

    const titles = options.options.map((o) => o.title as String);
    const idx = titles.indexOf('earth');
    options.options[idx].cb();

    runAllActions(game);

    expect(crewTraining.tags).deep.eq([Tag.EARTH, Tag.EARTH]);
    expect(martianZoo.resourceCount).eq(2);
  });
});
