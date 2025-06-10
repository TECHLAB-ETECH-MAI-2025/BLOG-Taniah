const ApiService = {
    uri: '/api/v1',

    /**
     * Set akk HTTP request
     */
    requests: {},

    /**
     * Set the default HTTP request headers
     */
    setHeader() {
        // Nothing
    },

    /**
     * Set the default Accept-Language request language
     */
    setLanguage(value) {
        axios.defaults.headers.common['Accept-Language'] = value;
    },

    /**
     * Set the default HTTP request URI
     */
    setUri(value) {
        this.uri = value
    },

    /**
     * Send the GET HTTP request
     * @param resource
     * @param params
     * @param main
     * @returns {*}
     */
    get(resource, params, main = false) {
        if(main){
            if(this.requests[resource]){
                this.requests[resource].cancel()
            }
            this.requests[resource] = axios.CancelToken.source();
            if(!params){
                params = {}
            }
            params.cancelToken = this.requests[resource].token
        }
        return axios.get(this.uri + resource, params)
    },

    post(resource, params) {
        const request = axios.post(this.uri + resource, params)
        request.catch((error) => {
            const response = error.response
            if(response && response.data){
                if(response.data.message) {
                    console.log(response.data.message)
                }
            }else{
                console.error(response.data.message)
            }
        })
        return request
    },

    put(resource, params) {
        const request = axios.put(this.uri + resource, params)
        request.catch((error) => {
            const response = error.response
            if(response.data.message) {
                console.error(response.data.message)
            }
        })
        return request
    },

    delete(resource, params) {
        const request = axios.delete(this.uri + resource, params)
        request.catch((error) => {
            const response = error.response
            if(response.data.message) {
                console.error(response.data.message)
            }
        })
        return request
    },
};

export default ApiService;