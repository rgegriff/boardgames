import { INVALID_MOVE } from "boardgame.io/core";
import { HACKERS300IDS, HACKERS1200IDS, CARDDATA } from "./Cards"

const PLAYERDATA = {
  canDrawBottom: false,
  virusWormCard: null
}

export const Hackers = {
  name: "HACKERS!",
  minPlayers: 3,
  maxPlayers: 4,

  setup: (ctx) => ({
    // clone the card data into the deck, removing the hacker who is fixing the phones.
    deck: {
      drawFromTop: () => {return this._cards.splice(0, 1)},
      drawFromBottom: () => {return this._cards.splice(-1, 1)},
      _cards: CARDDATA.slice(),
      placeCardOnBottom: (card) => {this.cards.push(card)}
    },
    drawSnoop: () => {
      const card = this.snoop;
      if(this.deck._cards.length > 0){
        this.snoop = deck.drawDeckTop();
      }else{
        this.snoop = null;
      }
    },
    snoop: null,
    hands: Array(ctx.numPlayers),
    files: Array(ctx.numPlayers),
    playerData: Array(ctx.numPlayers).fill({...PLAYERDATA}),
    hackThePlanet: false
  }),

  //validateSetupData: validateSetupData,
  phases: {
    setup: {
      moves: { moveSetupRemoveHacker },
      start: true,
      next: "play",
      turn: {
        playOrder: (G, ctx) => [0]
      }
    },
    play: {},
  },

  turn: {
    stages: {
      play: {
        moves: { movePlayToFiles },
        next: "draw"
      },
      virusWorm: {
        moves: { }
        next: "draw"
      },
      draw: {
        moves: { drawSnoop, drawDeckTop, drawDeckBottom },
        next: "distribute",
      },
      distribute: {
        next: "discard"
      },
      discard: {}
    }
  },
  endIf: (G, ctx) => {}
};

function moveSetupRemoveHacker(G, ctx, card_id){
  // Remove one of the 300 BAUD HACKERS from the game
  // Then shuffle the deck
  if(!card_id in HACKERS300IDS){return INVALID_MOVE;}
  const idx = G.deck.findIndex(card => {card.id == card_id});
  G.deck._cards.splice(idx, 1);
  G.deck._cards = ctx.random.Shuffle(G.deck._cards);
  // move to the next phase
  ctx.events.endPhase();
}

function movePlayToFiles(G, ctx, card_data){
  // Evaluate card's isPlayValid if it has one
  if("isPlayValid" in card_data){
    if(!card_data.isPlayValid){
      return INVALID_MOVE;
    }
  }
  // Evaluate card's playToFiles if it has one
  // Evaluate newFilesPlayed on every card in FILES
  G.files[ctx.currentPlayer].forEach(card => {
    if("newFilesPlayed" on )
  });

}

function moveDrawSnoop(G, ctx){
  if(G.snoop === null){return INVALID_MOVE;}

}

function moveDrawDeckTop(G, ctx){
  if(G.deck.length === 0){return INVALID_MOVE;}
}

function moveDrawDeckBottom(G, ctx){
  if(G.deck.length === 0){return INVALID_MOVE;}
  if(!G.playerFlags[ctx.currentPlayer].canDrawBottom){return INVALID_MOVE;}

}


function validateSetupData(setupData, numPlayers){

    if(!HACKERS300IDS.includes(setupData.fixingThePhones)){
      return "fixingThePhones is not a 300 BAUD HACKER";
    }
    if(setupData.startingPlayer >= numPlayers || setupData.startingPlayer < 0){
      return "That is not a player id"
    }


  }



