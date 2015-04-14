from __future__ import with_statement
from fabric.api import * # evil
import datetime
 
env.roledefs = {
    'staging': ['root@app.staging.twilert.com'],
    'production': ['root@app.twilert.com']
}

github_repo = "git@github.com:code/twilert-webapp.git"

def package_available(packages):
    if not type(packages) is list:
        packages = [packages]

    installed = True
    for package in packages:
        installed = installed and run('dpkg -s %s >/dev/null 2>&1' % package, warn_only=True).succeeded

    return installed

def provision_node():
    if not package_available('nodejs'):
        if not package_available('python-software-properties'):
            run('apt-get install -y python-software-properties')
        if not package_available('python'):
            run('apt-get install -y python')
        if not package_available('g++'):
            run('apt-get install -y g++')
        if not package_available('make'):
            run('apt-get install -y make')
        run('add-apt-repository ppa:chris-lea/node.js')
        run('apt-get update')
        run('apt-get install -y nodejs')

def provision_grunt():
    if run('grunt --version', warn_only=True).failed:
        run('npm install -g grunt-cli')

def provision_bower():
    if run('bower --version', warn_only=True).failed:
        run('npm install -g bower')

def provision_karma():
    if run('karma --version', warn_only=True).failed:
        run('npm install -g karma-cli')

def provision_user():
    if run('id twilert-frontend', warn_only=True).failed:
        run('adduser twilert-frontend --disabled-login --home /srv/twilert-frontend --gecos ""')

    if sudo('cat /srv/twilert-frontend/.ssh/id_rsa.pub', user='twilert-frontend', warn_only=True).failed:
        sudo('ssh-keygen -N "" -f /srv/twilert-frontend/.ssh/id_rsa', user='twilert-frontend')
        key = sudo('cat /srv/twilert-frontend/.ssh/id_rsa.pub', user='twilert-frontend')
        prompt("Add this key to the twilert-webapp GitHub repo and hit return when done:\n\n%s\n\n" % key)

def provision_app(branch = "master"):
    with cd('/srv/twilert-frontend'):
        if run('test -d latest', warn_only=True).failed:
            sudo('git clone %s latest' % github_repo, user='twilert-frontend')
        with cd('latest'):
            sudo('git fetch --all', user='twilert-frontend')
            if (sudo('git show-ref --verify --quiet refs/heads/%s' % branch, user='twilert-frontend', warn_only=True).failed):
                sudo('git checkout --track origin/%s' % branch, user='twilert-frontend')
            elif (sudo('git rev-parse --symbolic-full-name --abbrev-ref HEAD', user='twilert-frontend') != branch):
                sudo('git checkout %s' % branch, user='twilert-frontend')
            sudo('git reset --hard HEAD', user='twilert-frontend')
            sudo('git pull', user='twilert-frontend')
            sudo('git fetch --tags', user='twilert-frontend')
            run('npm install')
            run('bower install --allow-root')

def make_tag():
    fastprint("\n")
    message = prompt('Enter release description: ')
    utc_str = datetime.datetime.utcnow().strftime("%Y-%m-%d-%H-%M-%S")
    local("git tag deploy-%s -m '%s'" % (utc_str, message))
    local('git push --tags')

def choose_tag():
    local('git fetch --tags')
    fastprint("\nShowing latest tags for reference:\n\n")
    local('git tag | sort -V | tail -5')
    fastprint("\n")
    tag = prompt('Choose a tag: ')
    fastprint("\n")
    with settings(warn_only=True):
        if local('git tag | grep "%s"' % tag).failed:
            warn("This tag doesn't exist")
            return choose_tag()
    return tag

def choose_branch():
    local('git fetch --all')
    fastprint("\nLocal branches:\n\n")
    local('git branch')
    fastprint("\n")
    branch = prompt('Choose a branch: ')
    fastprint("\n")
    with settings(warn_only=True):
        exists_locally = local('git show-ref --verify --quiet refs/heads/%s' % branch).succeeded
        exists_remotely = local('git ls-remote --exit-code %s %s' % (github_repo, branch)).succeeded
        if (exists_locally == False & exists_remotely == False):
            warn("This branch doesn't exist")
            return choose_branch()
        elif (exists_remotely == False):
            local('git push -u origin %s' % branch)
    return branch

def can_deploy():
    with cd('/srv/twilert-frontend'):
        if run('test -f .deploy', warn_only=True).failed:
            run('touch .deploy')
            return True
        else:
            fastprint("\nOngoing deployment - if this doesn't sound right, manually delete /srv/twilert-frontend/.deploy on the server")
            return False

def end_deploy():
    with cd('/srv/twilert-frontend'):
        run('rm .deploy')

def provision(branch = "master"):
    provision_node()
    provision_grunt()
    provision_bower()
    provision_karma()
    provision_user()
    provision_app(branch)

def rollback():
    tag = choose_tag()
    local('git push --tags')
    provision_user()
    provision_app()
    with cd('/srv/twilert-frontend/latest'):
        sudo('git checkout "%s"' % tag, user='twilert-frontend')

@task
@roles('production')
def deploy_production():
    if (can_deploy() == True):
        make_tag()
        provision()
        with cd('/srv/twilert-frontend/latest'):
            run('grunt prod')
        end_deploy()

@task
@roles('staging')
def deploy_staging():
    if (can_deploy() == True):
        branch = "master"
        fastprint("\n")
        branch_choice = prompt('Other branch than master? [y/N] ')
        if branch_choice.lower() == 'y':
            branch = choose_branch()
        provision(branch)
        with cd('/srv/twilert-frontend/latest'):
            run('grunt staging')
        end_deploy()

@task
@roles('production')
def rollback_production():
    rollback()
    with cd('/srv/twilert-frontend/latest'):
        run('grunt prod')

@task
@roles('staging')
def rollback_staging():
    rollback()
    with cd('/srv/twilert-frontend/latest'):
        run('grunt staging')