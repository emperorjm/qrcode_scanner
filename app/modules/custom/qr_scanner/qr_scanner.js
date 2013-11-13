/**
 * Implements hook_menu().
 */
function qr_scanner_menu() {
  var items = {
    qr_scanner_main:{
      title:'Barcode Scanner',
      page_callback:'qrcode_scanner_page',
    },
  };
  return items;
}

function qrcode_scanner_page() {
    var content = {
      my_button:{
          theme:'button',
          text:'Scan QR Code',
          attributes:{
            onclick:'scan_barcode()'
          }
        }
    };
    return content;
}

/**
* DrupalGap Qr Scanner Services.
*/
drupalgap.services.qr_code_comp = {
  'add_winner':{
    'options':{
      'type':'post',
      'path':'qr_code_comp.json/add_winner.json',
    },
    'call':function(options){
      try {
        var api_options = drupalgap_chain_callbacks(drupalgap.services.qr_code_comp.add_winner.options, options);
        //api_options.path = 'qr_code_comp.json/add_winner.json?code=' + encodeURIComponent(options.id);
        api_options.path = 'qr_code_comp/add_winner.json';
        api_options.data = 'code=' + encodeURIComponent(options.id);
        drupalgap.api.call(api_options);
      }
      catch (error) {
        navigator.notification.alert(
          error,
          function(){},
          'QR Scanner Error',
          'OK'
        );
      }
    }
  }
};

function scan_barcode() {
    /**drupalgap.services.qr_code_comp.add_winner.call({
        'id':'sdfsgertgertretr',
        'success':function(textResponse){
          alert(textResponse);
        }
      });**/
    var scanner = cordova.require("cordova/plugin/BarcodeScanner");

    scanner.scan( function (result) { 
        drupalgap.services.qr_code_comp.add_winner.call({
            'id':result.text,
            'success':function(textResponse){
              alert(textResponse);
            }
          });
    },
    function (error) {
        navigator.notification.alert(
                error,
                function(){},
                'Scanning failed',
                'OK'
              );
    });
}

/**function scan_barcode() {
    var scanner = cordova.require("cordova/plugin/BarcodeScanner");

    scanner.scan( function (result) {
        drupalgap.services.qr_code_comp.add_winner.call({
            'id':result.text,
            'success':function(textResponse){
              alert(textResponse);
            }
          });
    }, function (error) {
        console.log("Scanning failed: ", error);
    } );
}**/