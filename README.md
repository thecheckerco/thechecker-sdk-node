# TheChecker Node.JS SDK

This project its a SDK to TheChecker API.
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
