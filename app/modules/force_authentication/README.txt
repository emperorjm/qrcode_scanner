A DrupalGap module that sends anonymous users to the App's login page when the
app first loads.

Setup
=====

It is up to you to make sure no blocks are visible on the user login and
registration pages within your app. That way, app users can't navigate away from
the login or registration pages within your app. Block visibility settings are
specified in your settings.js file.

For exapmle, you probably don't want the main menu to show up for anonymous
users if you are going to force authentication. So you could do something like
this in your settings.js file:

drupalgap.settings = {

  /* ... */

  'blocks':{

    'my_theme_name':{ /* the machine name of your theme */

      'sub_navigation':{ /* the machine name of the theme's region */
      
        'main_menu':{ /* the machine name of the menu */
          
          /* hide main menu from anonymous users */
          'roles':{
            'value':['anonymous user'],
            'mode':'exclude',
          }
          
        },

      }

    },

  },

  /* ... */

};

