# Introduction

The folder contains a customized Jenkinsfile to use to build and deploy a generic Maven project.

## Parameters

Base data
- projectName: The project name
- gitUrl: The project git url
- gitBranch: The project git branch to use to run CI/CD
- gitProductionBranch (default: master): The branch used for production release, for which the git tag became mandatory

Build data
- jdkVersion (default: OpenJDK-11): The JDK to use to build the project
- customMavenCommand: A custom maven command to use for building phase
- sonarAllowedBranches (default: develop), description: The comma-separated list of branches for which use Sonar

Kubernetes data
- toKubernetes (default: false): Indicates whether the deployment is directed to Kubernetes
- kubernetesCredentials: The Kubernetes credentials ID stored in Jenkins
- kubernetesCluster: The Kubernetes cluster name in which to deploy
- kubernetesBranchMapping (default: master): The list of allowed branches for which deploy on Kubernetes

Mattermost data
- toMattermost (default: false): Indicates whether the deployment is directed to Kubernetes
- mattermostChannel: The Mattermost channel ID in which to send the notification
- mattermostUrlWebHook: The Mattermost webhook to use to send the notification

Remote GIT data
- toRemoteGit (default: false): Indicates whether the deployment is directed to another remote GIT repository
- gitRemotes: The (semicolon separated) list of, comma separated values, remote urls and credentials
- gitRemoteConfigEmail: The git email to use to push on remote
- gitRemoteConfigName: The git name to use to push on remote
- gitRemoteBranchMapping (default: develop:develop,release:release,master:master,hotfix:hotfix): The map of allowed branches for which push on remote branch

## Steps

- Build
- Test
- SonarQube statis analysis
- SonarQube quality gate
- (optional) Publish on Kubernetes
- (optional) Communicate on Mattesmost
- (optional) Push to another remote GIT

## Usage

The project that wants to use this template must only declare two steps like the following ones:

```groovy
stages {

    stage('Defining environment') {
        steps {
            script {
                echo "Defining environment"
                env.GIT_URL = sh(returnStdout: true, script: 'git config remote.origin.url').trim()
                echo "Setting git url as ${env.GIT_URL}"
                echo "Setting env as ${env.GIT_BRANCH}"
            }
        }
    }

    stage('Run CI/CD') {
        steps {
            build job: cicdJob, parameters: [
                // Mandatory parameters
                [$class: 'StringParameterValue', name: 'projectName', value: 'MyProjectName'],
                [$class: 'StringParameterValue', name: 'gitUrl', value: env.GIT_URL],
                [$class: 'StringParameterValue', name: 'gitBranch', value: env.GIT_BRANCH],
                // Optional parameters
                [$class: 'StringParameterValue', name: 'jdkVersion', value: 'OpenJDK-11'],
                [$class: 'StringParameterValue', name: 'customMavenCommand', value: '-Ptest']
                // Kubernetes data...
                // Mattermost data...
                // Remote GIT data...
            ]
        }
    }

}
```
