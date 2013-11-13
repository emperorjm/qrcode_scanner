var force_authentication_front_page;

/**
 * Implements hook_device_connected().
 */
function force_authentication_device_connected() {
  try {
    // When the device is connected, if the user is anonymous save a backup of
    // the path to the front page, then set the front page path to the user
    // login page.
    if (drupalgap.user.uid == 0) {
      force_authentication_front_page = drupalgap.settings.front;
      drupalgap.settings.front = 'user/login';
    }
  }
  catch (error) {
    alert('force_authentication_deviceready - ' + error);
  }
}

/**
 * Implements force_authentication hook_services_success().
 */
function force_authentication_services_success(options, data) {
  try {
    // When the user login service resource is successful, set the front page
    // back to its original value.
    if ((options.service == 'user' || options.service == 'drupalgap_user') && options.resource == 'login') {
      drupalgap.settings.front = force_authentication_front_page;
    }
  }
  catch (error) {
    alert('force_authentication_services_success - ' + error);
  }
}

