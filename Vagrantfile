# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    # Used box
    config.vm.box = "ubuntu/trusty32"

    # Accessing "localhost:8888" will access port 8888 on the guest machine.
    config.vm.network :forwarded_port, guest: 8888, host: 8888, auto_correct: true

    # Accessing "localhost:35729" will access port 35729 on the guest machine.
    config.vm.network :forwarded_port, guest: 35729, host: 35729

    # Create a public network
    config.vm.network :public_network

    # Install stuff
    config.vm.provision :shell, :path => ".provision/bootstrap.sh", privileged: false

end