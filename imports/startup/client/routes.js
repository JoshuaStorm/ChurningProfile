import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/pages/login-page.js';
import '../../ui/pages/dashboard-page.js';
import '../../ui/pages/error-page.js';

// Routes that are public
var public = FlowRouter.group({})

// Routes only for loggedIn users
var loggedIn = FlowRouter.group({
    name: 'loggedIn',
    triggersEnter: [checkLoggedIn]
});

// Check Meteor if user is logged in
function checkLoggedIn(ctx, redirect) {
    if (!Meteor.userId() || Meteor.loggingIn()) {
        redirect('/');
    }
}


function redirectIfLoggedIn(ctx, redirect) {
    if (Meteor.userId()) {
        redirect('/dashboard');
    }
}

Accounts.onLogin(function () {
    FlowRouter.go('/dashboard');
});
