export default Card;


// Sanitization pattterns
const ISSUER_CHECK = String;  // TODO: Make this a check for a valid issuer like "chase"|"amex"|etc.
const NETWORK_CHECK = String; // TODO: Make this a check for a valid network
const NAME_CHECK = String;    // TODO: Make this a check for a valid card.
                              // Will require keeping an up-to-date card list...
const ANNUAL_FEE_CHECK = Match.ObjectIncluding({ 'amount': Number, 'waivedFirstYear': Boolean });
const SIGNUP_BONUS_CHECK = Match.ObjectIncluding({ 'amount': Number, 'currency': String, 'minimumSpend': Number });

function Card(issuer,
              network,
              name,
              annualFee = { 'amount': 0, 'waivedFirstYear': false },
              signupBonus = { 'amount': 0, 'currency': 'USD', 'minimumSpend': 0 }) {

    check(issuer, ISSUER_CHECK); check(network, NETWORK_CHECK); check(name, NAME_CHECK);
    check(annualFee, ANNUAL_FEE_CHECK); check(signupBonus, SIGNUP_BONUS_CHECK);
    this.issuer = issuer;
    this.network = network;
    this.name = name;
    this.annualFee = annualFee;
    this.signupBonus = signupBonus;
}

Card.prototype.toString = function() {
    return this.issuer + ' ' + this.name + ' ' + this.network + ' card';
}
