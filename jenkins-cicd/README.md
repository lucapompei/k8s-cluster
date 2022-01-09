# Introduction

The folder contains a customized Jenkinsfile to use to build and deploy a generic Maven project.

## Parameters

Base data
- projectName: The project name
- gitUrl: The project git url
- gitBranch: The project git branch to use to run CI/CD
- gitTag: The project git tag to use to run CI/CD
- gitTestBranch (default 'develop'): The local git branch to use to know if push on test environment
- gitCollBranch (default 'release'): The local git branch to use to know if push on coll environment
- gitProdBranch (default 'master'): The local git branch to use to know if push on prod environment

Build data
- jdkVersion (default: OpenJDK-11): The JDK to use to build the project
- customMavenProfile: A custom maven profile to use for building phase

Kubernetes data
- toKubernetes (default: false): Indicates whether the deployment is directed to Kubernetes
- kubernetesCredentials: The Kubernetes credentials ID stored in Jenkins
- kubernetesCluster: The Kubernetes cluster name in which to deploy

Mattermost data
- toMattermost (default: false): Indicates whether the deployment is directed to Kubernetes
- mattermostChannel: The Mattermost channel ID in which to send the notification
- mattermostUrlWebHook: The Mattermost webhook to use to send the notification

Remote GIT data
- toRemoteGit (default: false): Indicates whether the deployment is directed to another remote GIT repository
- gitRemoteTestBranch (default 'develop'): The remote git branch to use to push on remote test environment
- gitRemoteCollBranch (default 'release'): The remote git branch to use to push on remote coll environment
- gitRemoteProdBranch (default 'master'): The remote git branch to use to push on remote prod environment
- gitRemoteCredentials: The git credentials to use to push on remote
- gitRemoteUrl: The git url to use to push on remote
- gitRemoteConfigEmail: The git email to use to push on remote
- gitRemoteConfigName: The git name to use to push on remote

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
                env.GIT_TAG = sh(returnStdout: true, script: 'git tag -l --points-at HEAD').trim()
                echo "Setting git url as ${env.GIT_URL}"
                echo "Setting env as ${env.GIT_BRANCH}"
                echo "Setting git tag as ${env.GIT_TAG}"
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
                [$class: 'StringParameterValue', name: 'gitTag', value: env.GIT_TAG],
                // Optional parameters
                [$class: 'StringParameterValue', name: 'jdkVersion', value: 'OpenJDK-11'],
                [$class: 'StringParameterValue', name: 'customMavenProfile', value: '-Ptest']
                // Kubernetes data...
                // Mattermost data...
                // Remote GIT data...
            ]
        }
    }

}
```
