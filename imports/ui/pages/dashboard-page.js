import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import CardsOffered from '/collections/cards.js';

import './dashboard-page.html';

Template.dashboardPage.helpers({
    cards() {
        return CardsOffered.find();
    },
});

Template.dashboardPage.events({
    'submit .new-card'(event) {
        event.preventDefault();

        // Get value from form elements
        var issuer = event.target.issuer.value;
        var name = event.target.name.value;
        var network = event.target.network.value;

        // Insert a task into the collection
        Meteor.call('addCard', issuer, name, network, function(error, result) {
            // TODO: Clear form
        });
    },
    'click .glyphicon-remove'(event) {
        event.preventDefault();
        Meteor.call('deleteCard', this._id, function(error, result) {
            if (error) console.log('deleteCard: ' + error);
        });
    },
});
