let xmls='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
                            xmlns:web="http://www.webserviceX.NET/">\
            <soapenv:Header/>\
            <soapenv:Body>\
              <web:ConversionRate>\
                <web:FromCurrency>INR</web:FromCurrency>\
                <web:ToCurrency>USD</web:ToCurrency>\
              </web:ConversionRate>\
            </soapenv:Body>\
          </soapenv:Envelope>';

axios.post('http://www.webservicex.com/CurrencyConvertor.asmx?wsdl',
           xmls,
           {headers:
             {'Content-Type': 'text/xml'}
           }).then(res=>{
             console.log(res);
           }).catch(err=>{console.log(err)});