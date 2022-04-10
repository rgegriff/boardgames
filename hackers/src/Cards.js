// IDs of the 300 BAUD hackers
export const HACKERS300IDS = [9, 10, 11, 13]
export const HACKERS1200IDS = [12, 14]


export const CARDDATA = [
    {
      "id": 1,
      "name": "VIRUS",
      "data": 0,
      "baud": 300,
      "info": "This card can not be played if you have no other cards in your FILES. When added to your FILES draw 1 card & add it to your FILES or return it to the bottom of the DECK then HACK THE PLANET.",
      "img": "virus.png",
      isPlayValid: (G, ctx) => { G.files[ctx.currentPlayer].length > 0 },
      playToFiles: (G, ctx) => { 
        G.hackThePlanet === true;
        G.playerData[ctx.currentPlayer].virusWormCard = G.deck.drawFromTop();
        ctx.events.setStage('virusWorm');
      },
    },
    {
      "id": 2,
      "name": "THE GIBSON",
      "data": 9,
      "baud": 2400,
      "info": "When added to your FILES, return all 1200 BAUD cards from your FILES to the bottom of the DECK. While in your FILES, if you add any 1200 BAUD card to your FILES then return The Gibson to the bottom of the DECK.",
      "img": "the-gibson.png",
      playToFiles: (G, ctx) => {
          // find any 1200 BAUD cards
          var cards1200BAUD = G.files[ctx.currentPlayer].filter(card => {
              card.baud == 1200
          });
          // for each 1200 BAUD card:
          cards1200BAUD.each(card => {
              // remove card from FILES
              const idx = G.files[ctx.currentPlayer].findIndex(filecard => {
                  filecard.id === card.id
              });
              G.files[ctx.currentPlayer].splice(idx, 1);
              // place card at bottom of deck
              G.deck.placeCardOnBottom(cardFromFiles);
          });
      },
      newFilesPlayed: (G, ctx)
    },
    {
      "id": 3,
      "name": "SPECIAL AGENT",
      "data": 3,
      "baud": 1200,
      "info": "While in your FILES, ignore the effect of any 1200 BAUD Hackers other players add to their FILES.",
      "img": "special-agent.png",
      
    },
    {
      "id": 4,
      "name": "\"SECURITY OFFICER\"",
      "data": 9,
      "baud": 2400,
      "info": "When added to your FILES return all 300 BAUD cards from your FILES to the bottom of the DECK.",
      "img": "security-officer.png"
    },
    {
      "id": 5,
      "name": "SCAPEGOAT",
      "data": 6,
      "baud": 2400,
      "info": "When added to your FILES, if \"Security Officer\" is in another player's FILES, swap it with this card.",
      "img": "scapegoat.png"
    },
    {
      "id": 6,
      "name": "PHONE TAP",
      "data": 3,
      "baud": 300,
      "info": "While in your FILES, you may draw from the bottom of the DECK when you are drawing cards.",
      "img": "phone-tap.png"
    },
    {
      "id": 7,
      "name": "PAYPHONE",
      "data": 3,
      "baud": 1200,
      "info": "While in your FILES if there are any 300 BAUD cards in your FILES, Payphone is worth double.",
      "img": "payphone.png"
    },
    {
      "id": 8,
      "name": "MEDIA ICONS",
      "data": 1,
      "baud": 300,
      "info": "When added to your FILES, draw 1 card then add 1 card from your hand to your FILES.",
      "img": "media-icons.png"
    },
    {
      "id": 9,
      "name": "HACKER",
      "data": 3,
      "baud": 300,
      "info": "While in your FILES, you may return this card to the bottom of the DECK to ignore the effect of another player's card.",
      "img": "hacker-phreak.png"
    },
    {
      "id": 10,
      "name": "HACKER",
      "data": 3,
      "baud": 300,
      "info": "While in your FILES, you may return this card to the bottom of the DECK to ignore the effect of another player's card.",
      "img": "hacker-nikon.png"
    },
    {
      "id": 11,
      "name": "HACKER",
      "data": 3,
      "baud": 300,
      "info": "While in your FILES, you may return this card to the bottom of the DECK to ignore the effect of another player's card.",
      "img": "hacker-joey.png"
    },
    {
      "id": 12,
      "name": "HACKER",
      "data": 4,
      "baud": 1200,
      "info": "When added to your FILES all other players must return any 2400 BAUD cards to the bottom of the DECK.",
      "img": "hacker-dade.png",
      playToFiles: (G, ctx) => {
          // Check for SPECIAL AGENT (id 3)
      }
    },
    {
      "id": 13,
      "name": "HACKER",
      "data": 3,
      "baud": 300,
      "info": "When added to your FILES all other players must return any 2400 BAUD cards to the bottom of the DECK.",
      "img": "hacker-cereal.png"
    },
    {
      "id": 14,
      "name": "HACKER",
      "data": 4,
      "baud": 1200,
      "info": "When added to your FILES, all other players must return any 2400 BAUD cards in their FILES to the bottom of the DECK.",
      "img": "hacker-burn.png",
      playToFiles: (G, ctx) => {
          // Check for SPECIAL AGENT (id 3)
      }
    },
    {
      "id": 15,
      "name": "GARBAGE FILE",
      "data": 5,
      "baud": 2400,
      "info": "While in your FILES, draw 3 cards instead of 1 when drawing cards from the DECK.",
      "img": "garbage-file.png"
    },
    {
      "id": 16,
      "name": "DUMPSTER DIVE",
      "data": 2,
      "baud": 300,
      "info": "When added to your FILES, draw 3 cards then choose 1 card from your hand & put it back in the BOX without revealing it. That card is out of play for the rest of the game.",
      "img": "dumpster-dive.png"
    },
    {
      "id": 17,
      "name": "CYBERDELIA",
      "data": 3,
      "baud": 1200,
      "info": "While in your FILES, if there are any 300 BAUD cards in your FILES, Cyberdelia is worth double.",
      "img": "cyberdelia.png"
    },
    {
      "id": 18,
      "name": "DISKETTE",
      "data": 4,
      "baud":1200,
      "info": "When added to your FILES, if Garbage File is in another player's FILES or in the SNOOP space, then move Garbage File to your FILES.",
      "img": "diskette.png"
    },
    {
      "id": 19,
      "name": "CURTIS",
      "data": 5,
      "baud": 2400,
      "info": "Look slick all day.",
      "img": "curtis.png"
    },
    {
      "id": 20,
      "name": "WORM",
      "data": 0,
      "baud": 300,
      "info": "This card can not be played if you have no other cards in your FILES. When added to your FILES draw 1 card & add it to your FILES or return it to the bottom of the DECK then HACK THE PLANET.",
      "img": "worm.png",
      isPlayValid: (G, ctx) => { G.files[ctx.currentPlayer].length > 0 },
    }
  ];