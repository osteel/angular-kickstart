# Angular Kickstart

My personal Angular project kickstart.

## Features

 - Modularized approach
 - Configs for development, staging and production
 - Livereload (development)
 - Javascript concatenation/minification
 - CSS concatenation/minification
 - Asset revisioning
 - html5mode routing
 
Also incudes by default:
    
 - [AngularUI Router](https://github.com/angular-ui/ui-router)
 - [Restangular](https://github.com/mgonto/restangular)
 - [cssnext](https://cssnext.github.io/)
 - [Skeleton](http://getskeleton.com/)
 - [Modernizr](http://modernizr.com/)
 - [Lodash](https://lodash.com/) (compat)
 - [Moment.js](http://momentjs.com/)
 - [ngProgressLite](http://labs.voronianski.com/ngprogress-lite.js/)

## Requirements

 - [npm](https://www.npmjs.com/) (and Node.js)
 - [Grunt](http://gruntjs.com/)
 - [Bower](http://bower.io/)

## Install

Clone the project:

	clone https://github.com/osteel/angular-kickstart.git
    
Then go to its root and run:

	cd angular-kickstart
    npm install
    bower install

### Vagrant

As I like to use a separate Vagrant box for each of my projects, the kickstart comes with a Vagrant config file, including all of the requirements listed above. Simply clone the project and run from the root:

	clone https://github.com/osteel/angular-kickstart.git
	cd angular-kickstart
    vagrant up
    
This will bring up and provision an Ubuntu 14.04.1 server (can take a while).
    
`ssh` the box and install the dependencies:

    vagrant ssh
    cd /var/www
    sudo npm install
    bower install
    
## Use

### Development

Go to the project's root and run:

    grunt dev
    
Visit http://localhost:8888 when the tasks are done running. Livereload is set up by default so anytime you update an HTML, CSS or JS file, the website automatically refreshes itself.

*Note:* if you use Vagrant, you might need to use a [browser extension](http://livereload.com/extensions/) as well.

When using the kickstart in development mode, files are served from the `src/` folder and aren't minified.

You will find an example module and a submodule into `src/components/`. [Apiary](https://apiary.io/) is used to mimic an [external API](http://docs.angularkickstart.apiary.io/) (see `src/components/example/example-data.js` for example calls).

### Staging and production

`grunt staging` and `grunt prod` will respectively run the project in staging and production modes, loading there own config in the process (see `src/config/`).

Files are concatenated and minified and placed into `dist/`. That's the folder that should be served in production.

It is possible to test the staging config locally. Simply uncomment this line from `Gruntfile.js`:

    ,"connect:staging"
    
Save and run:

    grunt staging
    
You can now access http://localhost:8888 and use the website served from `dist/`.

## To-do

 - JSHint
 - Testing
 - Fabric