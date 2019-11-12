# Deploy to test/prod environments

Four Git repositories are involved:

* https://github.com/NCAR/hpctv         (Javascript frontend)
* https://github.com/NCAR/hpctv-gateway (Spring boot application interfacing with SAM)
* https://github.com/NCAR/hpctv-cache   (Nginx proxy/cache)
* https://github.com/NCAR/hpctv-host    (Ansible configuration)

Repositories hpctv, hpctv-gateway, hpctv-cache are configured with a circle-ci job that builds
a docker image and ships it to an AWS ECR repository. This job is triggered when a release is
made in the repository with a version tag (i.e 1.2.3). The values of the versions are collected
in the file envvars.rc of the repository hpctv-host, which is the repository containing the
Ansible configuration used for provisioning and building the docker containers on the host
running HPCTV. This file describes what versions of the three images are going to be selected
when running Ansible.

To release a new version of HPCTV, draft a new release in the hpctv repository using the next tag
version in sequence. Verify the circle-ci job runs to completion. Update the envvars.rc file of
the repository hpctv-host with the new version of hpctv. Then:

1. Login as yourself with ssh to ansiblemaster.nwsc.ucar.edu
2. Sudo the bash shell as the user _annie (Joel or Dan or Nick have to grant this permission)
3. Change directory to the home directory of _annie and then to the subdirectory hpctv-host
4. Run either deploy-test.sh or deploy-prod.sh to release the new version of hpctv (you will
   need the Ansible Vault password for hpctv-host from the swegkdb keepass database.

Example:

```bash
ssh [username]@ansiblemaster.nwsc.ucar.edu
sudo -u _annie bash
cd
cd hpctv-host/
./deploy-test.sh
```

The scripts deploy-test.sh and deploy-prod.sh execute Ansible against the hpctv-host repository
using Docker. The image used is homegrown and available DockerHub: ncar/ansible-run-playbook.

> Sometimes the Docker daemon isn't running on ansiblemaster. You'll see the error message below. Nick
will restart it for you:
    * docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?. See 'docker run --help'.
