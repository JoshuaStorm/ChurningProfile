import { Meteor } from 'meteor/meteor';
import Card from './card.js';
import CardsOffered from '/collections/cards.js';

Meteor.startup(function() {
    // code to run on server at startup
    var annualFee = { 'amount': 450, 'waivedFirstYear': false };
    var signupBonus = { 'amount': 50000, 'currency': "Ultimate Rewards Points", 'minimumSpend': 5000 };
    var testCard = new Card("Chase", "Visa", "Sapphire Reserve", annualFee, signupBonus);
    console.log(testCard.toString());
});

Meteor.methods({
    // TODO: Add card could only take a name and then just pull all the info from DB
    addCard: function(issuer, network, name) {
        var card = new Card(issuer, network, name);
        CardsOffered.insert({
            'card': card
        });
    },
});
