# 🚀 Hyperspace — Netmanagement Online Portal

A modern and elegant interface that blends the power of **Auth0 authentication**, **Xero Partner 2.0 API**, and **Stripe payments**, wrapped in the sleek design of the [HTML5 UP Hyperspace theme](https://html5up.net/hyperspace).

> “In the vastness of hyperspace, your finances remain secure, streamlined, and beautiful.”
# ✨ Hyperspace – Custom Integration Guide

Welcome to the **Hyperspace** universe,  
a constellation of HTML files where imagination weaves the digital fabric.

This project is based on the **HTML5UP Hyperspace** template,  
but here, each page, each fragment, each `index.html` is a star in its own right.  
Your task is to make them shine **together**.

---

## 🌌 Purpose

The main file `index.html` located in the `hyperspace/` folder is your **starting point**.  
However, it is **incomplete** without the other custom pages.  
Your mission is to **complete it** by merging the content of the other `index.html` files  
(from your variations, sections, or subpages), according to your custom layout.

---

## 🛠️ Steps to Merge

1. **Open** the main file:
   ```bash
   hyperspace/index.html

---

## ✨ Features

* 🔐 **Secure Login with Auth0**
  OAuth2 flow with OpenID Connect support for seamless user authentication.

* 💼 **Xero Partner 2.0 Integration**
  Access real-time billing, accounting, and organizational data directly through Xero’s API.

* 💳 **Stripe Payment Flow**
  Embedded payment experiences with Stripe for one-time or recurring billing.

* 🧠 **GPT-4 Data Assistant**
  Integrated AI to help users interpret, summarize, and act on financial insights.

* ⚙️ **API Ready**
  Built with future-proof endpoints to plug into your own financial or crypto backend.

---

## 🔧 Tech Stack

* **Frontend**: HTML5, CSS3 (from Hyperspace), vanilla JS
* **Auth**: Auth0 OAuth2 + redirect callback handling
* **Backend Integration**: Express.js API (external or embedded)
* **Financial Tools**: Xero API + Stripe.js
* **AI Layer**: Optional GPT-4 integration for assistant services

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ellipsis52/html5up-hyperspace-xero.git
cd html5up-hyperspace-xero
```

### 2. Install dependencies

```bash
npm install
```

Make sure you're using **Node.js 16.x** as required by the project:

```bash
nvm install 16
nvm use 16
```

### 3. Configure environment variables

Create a `.env` file and include:

```env
AUTH0_CLIENT_ID=your_client_id
AUTH0_DOMAIN=your_auth0_domain
AUTH0_REDIRECT_URI=https://yourdomain.com/callback
XERO_CLIENT_ID=your_xero_client_id
XERO_CLIENT_SECRET=your_secret
STRIPE_PUBLIC_KEY=your_stripe_key
```

> Optional: Use [dotenv](https://www.npmjs.com/package/dotenv) in your backend if needed.

---

## 🧪 Development

Run a local development server (if using with Vite or another bundler):

```bash
npm run dev
```

Or deploy directly as static HTML if no build step is required.

---

## 🌍 Deployment

This template can be deployed on:

* **Vercel** (recommended)
* **Netlify**
* Any static hosting provider (e.g., GitHub Pages, Cloudflare Pages)

Make sure your Auth0 and Xero callback URLs match your deployment domain.

---

## 📸 Preview

![Hyperspace Login](https://raw.githubusercontent.com/ellipsis52/html5up-hyperspace-xero/main/assets/preview-login.png)

---

## 🤝 Acknowledgements

* [HTML5 UP](https://html5up.net) for the **Hyperspace** design.
* [Auth0](https://auth0.com) for the secure login flow.
* [Xero](https://developer.xero.com) for their powerful API.
* [Stripe](https://stripe.com) for payment processing.
* [OpenAI](https://openai.com) for the AI assistant layer.

---

## 📄 License

Creative Commons for the UI template (HTML5 UP), and MIT for custom code.

---

🚀 Powered by [Netmanagement.online](https://netmanagement.online) – Your partner in intelligent finance automation.


# Express Authorization for RS256-Signed Tokens

This sample demonstrates how to protect endpoints in an Express API by verifying an incoming JWT access token signed by Auth0. The token must be signed with the RS256 algorithm and must be verified against your Auth0 JSON Web Key Set.

## Getting Started

If you haven't already done so, [sign up](https://auth0.com) for your free Auth0 account and create a new client in the [dashboard](https://manage.auth0.com).

Clone the repo or download it from the Express API quickstart page in Auth0's documentation.

## Setup the `.env` File

If you download this sample from the Express API quickstart page, a `.env` file will come pre-populated with your API identifier and Auth0 domain. If you clone the repo from GitHub, you will need to rename `.env.example` to `.env` and provide these values manually.

## Install the Dependencies and Start the API

```bash
npm install
npm start
```

The API will be served at `http://localhost:3010`.

## Endpoints

The sample includes these endpoints:

**GET** /api/public
* An unprotected endpoint which returns a message on success. Does not require a valid JWT access token.

**GET** /api/private
* A protected endpoint which returns a message on success. Requires a valid JWT access token with a `scope` of `read:messages`.

## Running the Sample With Docker

In order to run the example with docker you need to have `docker` installed.

You also need to set the client credentials as explained [previously](#setup-the-env-file).

Execute in command line `sh exec.sh` to run the Docker in Linux, or `.\exec.ps1` to run the Docker in Windows.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.
