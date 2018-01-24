import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import CardsOffered from '../../collections/cards.js';

import './body.html';

Template.body.helpers({
    cards() {
        console.log(CardsOffered);
        return CardsOffered.find();
    },
});

Template.body.events({
    'submit .new-card'(event) {
        event.preventDefault();

        // Get value from form elements
        var issuer = event.target.issuer.value;
        var name = event.target.name.value;
        var network = event.target.network.value;

        // Insert a task into the collection
        Meteor.call('addCard', issuer, name, network, function(error, result) {
            // Clear form
        });
    },
});
