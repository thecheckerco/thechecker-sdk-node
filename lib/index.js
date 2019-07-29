const axios = require('axios');
const FormData = require('form-data');
const concat = require("concat-stream");
const fs = require('fs');

const defaultOptions = {
    baseURL: 'https://api.thechecker.co/v2/',
};

function sendFile(urlPath, filePath) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("files", fs.createReadStream(filePath))
        formData.pipe(concat(async data => {
            const response = await axios.post(urlPath, data, {
                headers: formData.getHeaders()
            });
            resolve(response);
        }))
    })
}

class TheCheckerSDK {
    constructor(options = {}) {
        this.options = Object.assign(defaultOptions, options);
        if (!this.options.baseURL) throw new Error('API Base url required');
        this.baseURL = this.options.baseURL;
        if (!this.options.apiKey) throw new Error('API KEY required');
        this.apiKey = this.options.apiKey;
        this.singleVerification = {};
        this.bulkVerification = {};
        this.loadModules();
    }

    async loadModules() {
        this.singleVerification = {
            verifyEmail: async email => {
                const call = `verify?email=${email}&api_key=${this.apiKey}`;
                const response = await this._get(call);
                if (typeof response !== 'object') throw new Error(response);
                return response;
            },
        };

        this.bulkVerification = {
            verifyEmails: async emails => {
                const call = `verifications?api_key=${this.apiKey}`;
                const response = await axios({
                    method: 'post',
                    url: `${this.baseURL}${call}`,
                    data: { emails } ,
                });
                if (typeof response !== 'object') throw new Error(response);
                return response;
            },
            checkStatus : async(id) => {
                const call = `verifications/${id}?api_key=${this.apiKey}`;
                const response = await this._get(call);
                if (typeof response !== 'object') throw new Error(response);
                return response;
            },
            checkResults: async(id) => {
                const call = `verifications/${id}/json?api_key=${this.apiKey}`;
                const response = await this._get(call);
                if (typeof response !== 'object') throw new Error(response);
                return response;
            },
            uploadFile: async filePath => {
                const call = `verifications?api_key=${this.apiKey}`;
                const response = await sendFile(`${this.baseURL}${call}`, filePath);
                return response;
            },
    };
    }

    async _get(url) {
        try {
            return await axios({
                method: 'get',
                url: `${this.baseURL}${url}`,
            });
        } catch (e) {
            return e.message;
        }
    }

    async _post(url, body = {}) {
        try {
            return await axios({
                method: 'post',
                url: `${this.baseURL}${url}`,
                data: body,
            });
        } catch (e) {
            return e.message;
        }
    }

    async _put(url, body = {}) {
        try {
            return await axios({
                method: 'put',
                url: `${this.baseURL}${url}`,
                data: body,
            });
        } catch (e) {
            return e.message;
        }
    }

    async _delete(url) {
        try {
            return await axios({
                method: 'delete',
                url: `${this.baseURL}${url}`,
            });
        } catch (e) {
            return e.message;
        }
    }
}

module.exports = TheCheckerSDK;
