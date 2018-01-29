import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body.js';
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
    console.log("Checking if logged in ");
    if (!Meteor.userId() || Meteor.loggingIn()) {
        redirect('/');
    }
}


function redirectIfLoggedIn(ctx, redirect) {
    console.log("Redirecting");
    if (Meteor.userId()) {
        redirect('/dashboard');
    }
}

Accounts.onLogin(function () {
    console.log("Redirecting");
    FlowRouter.go('/dashboard');
});

// NOTE: Not totally sure why I did this on my previous Meteor project.
//       Should remove after confirming we don't need it.
Blaze._allowJavascriptUrls();

Accounts.loginServicesConfigured();

public.route('/', {
    name: 'App.home',
    action: function(params) {
        Tracker.autorun(function() {
            console.log("Rendering login page");
            if (!Meteor.loggingIn()) BlazeLayout.render('app-body', { main: 'login-page' });
        });
    }
});

loggedIn.route('/dashboard', {
    name: 'App.dashboard',
    triggersEnter: [checkLoggedIn],
    action: function() {
        console.log("Rendering dashboard");
        BlazeLayout.render('app-body', { main: 'dashboard-page' });
    },
    subscriptions: function(params) {
        this.register('Users', Meteor.subscribe('Users'));
    }
});

public.route('/error', {
    name: 'App.error',
    action() {
        BlazeLayout.render('app-body', { main: 'error-page' });
    },
});

// the App_notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
    action() {
        BlazeLayout.render('app-body', { main: 'error-page' });
    },
};
