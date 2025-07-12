// login.js
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("login-container");

    if (!container) return;

    container.innerHTML = `
    <form id="login-form" style="max-width: 400px; margin: auto;">
      <div style="margin-bottom: 1rem;">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Your username" required style="width: 100%; padding: 0.5rem;">
      </div>
      <div style="margin-bottom: 1rem;">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Your password" required style="width: 100%; padding: 0.5rem;">
      </div>
      <button type="submit" style="padding: 0.5rem 1rem;">Login</button>
    </form>
  `;

    // Handle form submission
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        alert(`Bienvenue, ${username} 🌟`);
        // Tu peux ici ajouter un appel API pour une vraie authentification
    });
}); {
    "clientName": "Client Name",
    "companyName": "Company Name"
}
"pageTitle": "Log in | ${clientName}",
"title": "Welcome",
"description": "Log in to ${companyName} to continue to ${clientName}.",
"separatorText": "Or",
"buttonText": "Continue",
"federatedConnectionButtonText": "Continue with ${connectionName}",
"footerLinkText": "Sign up",
"signupActionLinkText": "${footerLinkText}",
"footerText": "Don't have an account?",
"signupActionText": "${footerText}",
"forgotPasswordText": "Forgot password?",
"passwordPlaceholder": "Password",
"usernamePlaceholder": "Username or email address",
"emailPlaceholder": "Email address",
"phonePlaceholder": "Phone number",
"usernameOnlyPlaceholder": "Username",
"phoneOrUsernameOrEmailPlaceholder": "Phone or Username or Email",
"phoneOrEmailPlaceholder": "Phone number or Email address",
"phoneOrUsernamePlaceholder": "Phone Number or Username",
"usernameOrEmailPlaceholder": "Username or Email address",
"editEmailText": "Edit",
"alertListTitle": "Alerts",
"invitationTitle": "You've Been Invited!",
"invitationDescription": "Log in to accept ${inviterName}'s invitation to join ${companyName} on ${clientName}.",
"captchaCodePlaceholder": "Enter the code shown above",
"logoAltText": "${companyName}",
"showPasswordText": "Show password",
"hidePasswordText": "Hide password",
"wrong-credentials": "Wrong username or password",
"wrong-email-credentials": "Wrong email or password",
"wrong-username-credentials": "Incorrect username or password",
"wrong-phone-credentials": "Incorrect phone number or password",
"wrong-email-username-credentials": "Incorrect email address, username, or password",
"wrong-email-phone-username-credentials": " Incorrect email address, phone number, username, or password. Phone numbers must include the country code.",
"wrong-email-phone-credentials": "Incorrect email address, phone number, or password. Phone numbers must include the country code.",
"wrong-phone-username-credentials": "Incorrect phone number, username or password. Phone numbers must include the country code.",
"invalid-code": "The code you entered is invalid",
"invalid-expired-code": "Invalid or expired user code",
"custom-script-error-code": "Something went wrong, please try again later.",
"auth0-users-validation": "Something went wrong, please try again later",
"authentication-failure": "We are sorry, something went wrong when attempting to log in",
"invalid-connection": "Invalid connection",
"ip-blocked": "We have detected suspicious login behavior and further attempts will be blocked. Please contact the administrator.",
"no-db-connection": "Invalid connection",
"password-breached": "We have detected a potential security issue with this account. To protect your account, we have prevented this login. Please reset your password to proceed.",
"user-blocked": "Your account has been blocked after multiple consecutive login attempts.",
"same-user-login": "Too many login attempts for this user. Please wait, and try again later.",
"no-email": "Please enter an email address",
"no-password": "Password is required",
"no-username": "Username is required",
"captcha-validation-failure": "We are sorry, something went wrong while validating the captcha response. Please try again.",
"invalid-recaptcha": "Select the checkbox to verify you are not a robot.",
"invalid-captcha": "Solve the challenge question to verify you are not a robot.",
"captcha-client-failure": "We couldn’t load the security challenge. Please try again. (Error code: #{errorCode})"
} <
!DOCTYPE html >
    <
    html >
    <
    head >
    <
    meta charset = "utf-8" >
    <
    meta http - equiv = "X-UA-Compatible"
content = "IE=edge,chrome=1" >
    <
    title > Sign In with Auth0 < /title> <
meta name = "viewport"
content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" / >
    <
    /head> <
body >

    <
    !--[
        if IE 8
    ] >
    <
    script src = "//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js" > < /script> <![endif]-- >

    <
    !--[
        if lte IE 9
    ] >
    <
    script src = "https://cdn.auth0.com/js/base64.js" > < /script> <
script src = "https://cdn.auth0.com/js/es5-shim.min.js" > < /script> <![endif]-- >

    <
    script src = "https://cdn.auth0.com/js/lock/13.0/lock.min.js" > < /script> <
script >
    // Decode utf8 characters properly
    var config = JSON.parse(decodeURIComponent(escape(window.atob('@@config@@'))));
config.extraParams = config.extraParams || {};
var connection = config.connection;
var prompt = config.prompt;
var languageDictionary;
var language;

if (config.dict && config.dict.signin && config.dict.signin.title) {
    languageDictionary = {
        title: config.dict.signin.title
    };
} else if (typeof config.dict === 'string') {
    language = config.dict;
}
var loginHint = config.extraParams.login_hint;
var colors = config.colors || {};

// Available Lock configuration options: https://auth0.com/docs/libraries/lock/lock-configuration
var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
    auth: {
        redirectUrl: config.callbackURL,
        responseType: (config.internalOptions || {}).response_type ||
            (config.callbackOnLocationHash ? 'token' : 'code'),
        params: config.internalOptions
    },
    configurationBaseUrl: config.clientConfigurationBaseUrl,
    overrides: {
        __tenant: config.auth0Tenant,
        __token_issuer: config.authorizationServer.issuer
    },
    assetsUrl: config.assetsUrl,
    allowedConnections: connection ? [connection] : null,
    rememberLastLogin: !prompt,
    language: language,
    languageBaseUrl: config.languageBaseUrl,
    languageDictionary: languageDictionary,
    theme: {
        //logo:            'YOUR LOGO HERE',
        primaryColor: colors.primary ? colors.primary : 'green'
    },
    prefill: loginHint ? {
        email: loginHint,
        username: loginHint
    } : null,
    closable: false,
    defaultADUsernameFromEmailPrefix: false
});

if (colors.page_background) {
    var css = '.auth0-lock.auth0-lock .auth0-lock-overlay { background: ' +
        colors.page_background +
        ' }';
    var style = document.createElement('style');

    style.appendChild(document.createTextNode(css));

    document.body.appendChild(style);
}

lock.show(); <
/script> < /
body > <
    /html>  <
script >
    window.addEventListener('message', function (event) {
        if (event.data === 'close') {
            lock.hide();
        }
    }); <
/script></script >