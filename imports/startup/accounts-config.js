import { AccountsTemplates } from 'meteor/useraccounts:core';
import { FlowRouter } from 'meteor/kadira:flow-router';

/**
 * The useraccounts package must be configured for both client and server to work properly.
 * See the Guide for reference (https://github.com/meteor-useraccounts/core/blob/master/Guide.md)
 */

AccountsTemplates.configure({
    showForgotPasswordLink: true,
    onLogoutHook: redirectLogout,
});

function redirectLogout() {
    console.log("On logout hook");
    FlowRouter.go('/');
}

/* **********************************************************************************************/
/* haven't quite figured this functionality out yet - this section of code is useless as of now */
// AccountsTemplates.configureRoute('signIn', {
//   name: 'signin',
//   path: '/dashboard',
// });
//
// AccountsTemplates.configureRoute('signUp', {
//   name: 'join',
//   path: '/join',
// });
//
// AccountsTemplates.configureRoute('forgotPwd');
//
// AccountsTemplates.configureRoute('resetPwd', {
//   name: 'resetPwd',
//   path: '/reset-password',
// });
/* **********************************************************************************************/
