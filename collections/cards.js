import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import Schemas from './schemas.js';

const CardsOffered = new Mongo.Collection('CardsOffered');
export default CardsOffered;


// TODO: REMOVE autopublish
// Autopublish is a prototyping package which allows direct access to all databases
// in both server side and client side code.


// if (Meteor.isServer) {
//     // TODO: For testing purposes, this schema is the cards a user has.
//     // I think we'll ultimately want to make this a "cards available" DB and each
//     // user will have a simple array of cards owned (mapped by name perhaps?)
//     // That you can then just query the "cards available" for details
//     Meteor.publish('CardsOffered', function cardsPublication() {
//         var cards = CardsOffered.find();
//         return cards;
//     });
// }

// TODO:
// Disallow direct client-side access of database completely.
// I prefer giving server hooks in the ./server/ APIs
// CardsOffered.allow({
//   insert() { return false; },
//   update() { return false; },
//   remove() { return false; }
// });
//
// CardsOffered.deny({
//   insert() { return true; },
//   update() { return true; },
//   remove() { return true; }
// });


// TODO: Actually make a real schema
Schemas.CardsOffered = new SimpleSchema({
    'card': {
        type: Object
    },
    'card.issuer': {
        type: String,
        label: "The company that issues the credit card, such as Chase"
    },
    'card.name': {
        type: String,
        label: "The name of the card, such as Sapphire Reserve"
    },
    'card.network': {
        type: String,
        label: "The payment network this card is supported by, such as Visa"
    },
    'card.annualFee': {
        type: Object,
        label: "The details of the cards annual fee, including if it is waived the first year"
    },
    'card.annualFee.amount': {
        type: Number,
        label: "The annual fee of this card, in USD"
    },
    'card.annualFee.waivedFirstYear': {
        type: Boolean,
        label: "Whether or not the annual fee is waived the first year"
    },
    'card.signupBonus': {
        type: Object,
        label: "The details of the cards signup bonus"
    },
    'card.signupBonus.amount': {
        type: Number,
        label: "The amount of the signup bonus"
    },
    'card.signupBonus.currency': {
        type: String,
        label: "The currency of the signup bonus, such as USD cashback or Ultime Rewards Points"
    },
    'card.signupBonus.minimumSpend': {
        type: Number,
        label: "The amount of spend needed for the signup bonus"
    }
});



CardsOffered.attachSchema(Schemas.CardsOffered);
