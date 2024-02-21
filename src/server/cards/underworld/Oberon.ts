import {BonusSource, Colony} from '../../colonies/Colony';
import {ColonyName} from '../../../common/colonies/ColonyName';
import {ColonyBenefit} from '../../../common/colonies/ColonyBenefit';
import {IPlayer} from '../../IPlayer';

export class Oberon extends Colony {
  constructor() {
    super({
      description: [
        'Build a city and reduce your M€ production 1 step',
        'Gain 1 corruption.',
        'Draw 1 card and then discard 1 card',
      ],

      name: ColonyName.OBERON,
      buildType: ColonyBenefit.CUSTOM,
      tradeType: ColonyBenefit.CORRUPTION_PLUS_MC,
      colonyBonusType: ColonyBenefit.DRAW_CARDS_AND_DISCARD_ONE,
      shouldIncreaseTrack: 'ask',
    });
  }

  protected override giveBonus(player: IPlayer, source: BonusSource, bonusType: ColonyBenefit, quantity: number, resource: Resource | undefined, isGiveColonyBonus: boolean) {
    const game = player.game;

    if (bonusType === ColonyBenefit.CUSTOM) {

    } else {
      super.giveBonus(player, source, bonusType, quantity, resource, isGiveColonyBonus);
    }
    //   let action: undefined | DeferredAction<any> = undefined;
    //   switch (bonusType) {
    //   case ColonyBenefit.ADD_RESOURCES_TO_CARD:
    //     const cardResource = this.metadata.cardResource;
    //     action = new AddResourcesToCard(player, cardResource, {count: quantity});
    //     break;

    //   case ColonyBenefit.ADD_RESOURCES_TO_VENUS_CARD:
    //     action = new AddResourcesToCard(
    //       player,
    //       undefined,
    //       {
    //         count: quantity,
    //         restrictedTag: Tag.VENUS,
    //         title: message('Select Venus card to add ${0} resource(s)', (b) => b.number(quantity)),
    //       });
    //     break;

    //   case ColonyBenefit.COPY_TRADE:
    //     const openColonies = game.colonies.filter((colony) => colony.isActive);
    //     action = new SimpleDeferredAction(
    //       player,
    //       () => new SelectColony('Select colony to gain trade income from', 'Select', openColonies)
    //         .andThen((colony) => {
    //           game.log('${0} gained ${1} trade bonus', (b) => b.player(player).colony(colony));
    //           (colony as Colony).handleTrade(player, {
    //             usesTradeFleet: false,
    //             decreaseTrackAfterTrade: false,
    //             giveColonyBonuses: false,
    //           });
    //           return undefined;
    //         }),
    //     );
    //     break;

    //   case ColonyBenefit.DRAW_CARDS:
    //     action = DrawCards.keepAll(player, quantity);
    //     break;

    //   case ColonyBenefit.DRAW_CARDS_AND_BUY_ONE:
    //     action = DrawCards.keepSome(player, 1, {paying: true, logDrawnCard: true});
    //     break;

    //   case ColonyBenefit.DRAW_CARDS_AND_DISCARD_ONE:
    //     player.drawCard();
    //     action = new DiscardCards(player, 1, 1, this.name + ' colony bonus. Select a card to discard');
    //     break;

    //   case ColonyBenefit.DRAW_CARDS_AND_KEEP_ONE:
    //     action = DrawCards.keepSome(player, quantity, {keepMax: 1});
    //     break;

    //   case ColonyBenefit.GAIN_CARD_DISCOUNT:
    //     player.colonies.cardDiscount += 1;
    //     game.log('Cards played by ${0} cost 1 M€ less this generation', (b) => b.player(player));
    //     break;

    //   case ColonyBenefit.GAIN_PRODUCTION:
    //     if (resource === undefined) throw new Error('Resource cannot be undefined');
    //     player.production.add(resource, quantity, {log: true});
    //     break;

    //   case ColonyBenefit.GAIN_RESOURCES:
    //     if (resource === undefined) throw new Error('Resource cannot be undefined');
    //     player.stock.add(resource, quantity, {log: true});
    //     break;

    //   case ColonyBenefit.GAIN_SCIENCE_TAG:
    //     player.tags.gainScienceTag(1);
    //     player.playCard(new ScienceTagCard(), undefined, 'nothing');
    //     game.log('${0} gained 1 Science tag', (b) => b.player(player));
    //     break;

    //   case ColonyBenefit.GAIN_SCIENCE_TAGS_AND_CLONE_TAG:
    //     player.tags.gainScienceTag(2);
    //     player.playCard(new ScienceTagCard(), undefined, 'nothing');
    //     game.log('${0} gained 2 Science tags', (b) => b.player(player));
    //     break;

    //   case ColonyBenefit.GAIN_INFLUENCE:
    //     Turmoil.ifTurmoil(game, (turmoil) => {
    //       turmoil.addInfluenceBonus(player);
    //       game.log('${0} gained 1 influence', (b) => b.player(player));
    //     });
    //     break;

    //   case ColonyBenefit.PLACE_DELEGATES:
    //     Turmoil.ifTurmoil(game, (turmoil) => {
    //       const availablePlayerDelegates = turmoil.getAvailableDelegateCount(player);
    //       const qty = Math.min(quantity, availablePlayerDelegates);
    //       for (let i = 0; i < qty; i++) {
    //         game.defer(new SendDelegateToArea(player));
    //       }
    //     });
    //     break;

    //   case ColonyBenefit.GIVE_MC_PER_DELEGATE:
    //     Turmoil.ifTurmoil(game, (turmoil) => {
    //       const partyDelegateCount = sum(turmoil.parties.map((party) => party.delegates.get(player)));
    //       player.stock.add(Resource.MEGACREDITS, partyDelegateCount, {log: true});
    //     });
    //     break;

    //   case ColonyBenefit.GAIN_TR:
    //     if (quantity > 0) {
    //       player.increaseTerraformRating(quantity, {log: true});
    //     }
    //     break;

    //   case ColonyBenefit.GAIN_VP:
    //     if (quantity > 0) {
    //       player.colonies.victoryPoints += quantity;
    //       game.log('${0} gained ${1} VP', (b) => b.player(player).number(quantity));
    //     }
    //     break;

    //   case ColonyBenefit.INCREASE_VENUS_SCALE:
    //     game.increaseVenusScaleLevel(player, quantity as 3|2|1);
    //     game.log('${0} increased Venus scale ${1} step(s)', (b) => b.player(player).number(quantity));
    //     break;

    //   case ColonyBenefit.LOSE_RESOURCES:
    //     if (resource === undefined) throw new Error('Resource cannot be undefined');
    //     player.stock.deduct(resource, quantity);
    //     break;

    //   case ColonyBenefit.OPPONENT_DISCARD:
    //     if (game.isSoloMode()) break;
    //     action = new SimpleDeferredAction(
    //       player,
    //       () => {
    //         const playersWithCards = game.getPlayers().filter((p) => p.cardsInHand.length > 0);
    //         if (playersWithCards.length === 0) return undefined;
    //         return new SelectPlayer(playersWithCards, 'Select player to discard a card', 'Select')
    //           .andThen((selectedPlayer) => {
    //             game.defer(new DiscardCards(selectedPlayer, 1, 1, this.name + ' colony effect. Select a card to discard'));
    //             return undefined;
    //           });
    //       });
    //     break;

    //   case ColonyBenefit.PLACE_OCEAN_TILE:
    //     action = new PlaceOceanTile(player);
    //     break;

    //   case ColonyBenefit.STEAL_RESOURCES:
    //     if (resource === undefined) throw new Error('Resource cannot be undefined');
    //     action = new StealResources(player, resource, quantity);
    //     break;

    //   default:
    //     throw new Error('Unsupported benefit type');
    //   }

  //   if (action !== undefined) {
  //     if (isGiveColonyBonus) {
  //       /*
  //        * When this method is called from within the GiveColonyBonus deferred action
  //        * we return the player input directly instead of deferring it
  //        */
  //       return action.execute(); // undefined | PlayerInput
  //     } else {
  //       game.defer(action);
  //       return undefined;
  //     }
  //   } else {
  //     return undefined;
  //   }
  }
}


// The Oberon colony started out as a prefab
// structure manufacturing plant. But by virtue of its
// business, companies would routinely send their best
// engineers and negotiators to it. As they inevitably met
// each other on-site, all sorts of deals and contracts would
// be struck. Eventually, this grew into Oberon becoming a
// business center for habitat-building experts, where
// knowledge and patents change hands behind closed
// doors, and away from Earth's scrutiny.


// If your M€ production is at -5, you cannot build a colony here.

// Trade income:Gain 1 corruption. Also gain an amount of M€ equal to the number of a specific tag
// you have. The tag you need to count is indicated by the colony marker. (f.e.: If it's
// indicating the building tag and you have 5 building tags, you gain 5 M€.) If it's in
// the very last space, you gain 1 M€ per different tag you have.
// Manu
