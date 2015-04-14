# Twilert Frontend

This is the Angular-based frontend for Twilert.

## Install

### Development

Clone the repo and have a look at https://github.com/code/twilert-webapp/blob/master/.provision/bootstrap.sh to know about the required packages.

To get started, run `npm install`, `bower install` and then `grunt dev`; the app will pop up at localhost:1337 by default (port collision management is activated - check what Vagrant says when "up"ing the machine).

**Note:** if you are using a VM on a Windows host, you might need to run `npm install --no-bin-links` to prevent npm from trying to create symlinks.

#### Vagrant

You can use Vagrant to set up a VM. Install Vagrant ( http://www.vagrantup.com/downloads.html ) and a provider (like VirtualBox ( https://www.virtualbox.org/wiki/Downloads )), go to the project folder and:

`vagrant up`

ssh your VM, go to /var/www, run `npm install`, `bower install` and then `grunt dev`

#### Local

This config is as part of getting the whole Twilert ecosystem running locally (the webapp, the backend and the Twitter Data Service).

Create a local.json file under src/config. This file is deliberately ignored by git as most likely specific to each post. It looks like this:

    {
        "API_BASE_URL": "http://192.168.50.2:1338/api/",
        "AUTH_BASE_URL": "http://192.168.50.2:1338/",
        "MARKETING_WEBSITE_URL": "https://marketing.staging.twilert.com/",
        "X_CLIENT_ID_HEADER": "web-development",
        "INTERCOM_APP_ID": "8w0mpiy3"
    }

`"API_BASE_URL"` and `"AUTH_BASE_URL"` refer to the IP/port of the backend, as setup locally. Refer to https://github.com/code/twilert-backend for more details.
The rest of the properties is of no importance.

Finally, just run `grunt local` instead of `grunt dev`

### Staging

There's a fabric script to automate staging deployment:

`fab deploy_staging` (from the project root)

It will ssh *root@en.staging.twilert.com*, ensure whatever needed package is installed and pull the master branch.

It will then install npm and bower dependencies and finally run `grunt staging` to generate the concatenated, uglified, minified... version.

### Notes

- grunt-contrib-stylus version is forced to 0.13.2 as the most recent version (0.17 at the time of writing) generates defective CSS files
- all other npm packages' versions have been frozen as well by safety

## Workflow

GitHub Flow inspired: http://scottchacon.com/2011/08/31/github-flow.html

- Branch out master
- Develop a feature
- Test the branch on staging if necessary, using `fab deploy_staging` (allows to choose a branch instead of just master)
- Push the branch + PR if peer-review is wanted
- Merge to master
- Push to production using `fab deploy_production` => produces a tag with the current timestamp, allows to enter a description
- In case of problem, rollback to a previous tag using `fab rollback_production` (allows to choose a tag)