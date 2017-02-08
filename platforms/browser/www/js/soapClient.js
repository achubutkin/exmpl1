
var soapClient = {
    options: {
        xmlns: 'http://www.sandbox1c.org',
        method: 'post'
    },
    get: function (url, operation, parameters) {
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.withCredentials = true;
        xmlHttpRequest.open(this.options.method, url);

        var requestHeaders =
            [
                'X-Requested-With', 'XMLHttpRequest', 
                'X-Prototype-Version', '1.0.0',
                'SOAPAction', this.options.xmlns + '#Sandbox1C:' + operation
            ];
        if (this.options.method == 'post')
            requestHeaders.push('Content-type', 'application/x-www-form-urlencoded');
        for (var i = 0; i < requestHeaders.length; i += 2)
            xmlHttpRequest.setRequestHeader(requestHeaders[i], requestHeaders[i + 1]);

        xmlHttpRequest.send(this.createSoapEnvelope(operation));
    },

    createSoapEnvelope: function (name, parameters) {
        var xml =
            '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
            '   <soap:Body>' +
            '       <m:' + name + ' xmlns:m="' + this.options.xmlns + '">' +
			            this.createSoapParameters(parameters) +
		    '       </m:' + name + '>' +
            '   </soap:Body>' +
            '</soap:Envelope>';
        return xml;
    },

    createSoapParameters: function (parameters) {
        var xml = '';
        if (parameters) {
            for (var i = 0; i < parameters.length; i += 2)
                xml += 
                    '<m:' + parameters[i] + ' xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
                        parameters[i + 1] +
                    '</m:' + parameters[i] + '>';
        }
        return xml;
    }
}