# TheChecker Node.JS SDK

Get rid of email bounces and reach more customers with our proven high-quality yet affordable email verification service.

TheChecker is the most cost-effective email verification and email list cleaning service in the market. We make it easy and affordable for businesses to protect their email sending reputation and avoid inbox delivery issues that lead to a loss of sales opportunities.

What takes TheChecker apart from the competition?

- Accurate results (Up to 99%+)
- Affordable prices
- Blazing-fast verification
- Easy integration
- Powerful API
- #1 in customer satisfaction in G2 Crowd, Capterra and TrustPilot verified reviews
- GDPR compliant
- Awesome live multilanguage customer support


Get 100 FREE credits to test and see the difference with your own eyes.

TheChecker Website - https://wwww.thechecker.co/

TheChecker API Official Documentation - https://app.thechecker.co/docs

### Prerequisites

- Npm;
- Node 8+;

### Methods Avaliables:

- **Single Verification**: verifyEmail;
- **Bulk Verification**: verifyEmails, checkStatus, checkResults, uploadFile;

### Usage:

```js
const TheCheckerSDK = require('thechecker-sdk-node');

(async function() {
    try {
        const sdk = new TheCheckerSDK({
            apiKey: 'YOUR_API_KEY'
        });
        const { singleVerification, bulkVerification } = sdk;

        // verifyAnEmail
        const verifyAnEmail = await singleVerification.verifyEmail('hello@thechecker.co');
        console.log('verifyAnEmail: ', verifyAnEmail.data);

        // verifyEmails
        const verifyEmails = await bulkVerification.verifyEmails([
            'hello@thechecker.co'
        ]);
        console.log('verifyEmails: ', verifyEmails.data);

        // checkStatus
        const checkStatus = await bulkVerification.checkStatus(verifyEmails.data.id);
        console.log('checkStatus: ', checkStatus.data);

        // checkResults
        const checkResults = await bulkVerification.checkResults(verifyEmails.data.id);
        console.log('checkResults: ', checkResults.data);

        // uploadFile
        const uploadFile = await bulkVerification.uploadFile('/file/path');
        console.log('uploadFile: ', uploadFile.data);

    } catch (err) {
        console.error(err);
    }
})();
```

#### By

2019 TheChecker ❤️.
