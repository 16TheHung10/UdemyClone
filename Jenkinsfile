pipeline {

  agent { node {label 'jenkins-agents'}}

  environment {
    DOCKER_IMAGE = "fivesixonetwo/mockproject-team2"
    DOCKER_TAG = "${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
  }

  stages {
    

    stage("Build Image") {
      
      steps {
        sh "sudo docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} . "
        sh "sudo docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
        sh "sudo docker image ls | grep ${DOCKER_IMAGE}"
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'echo $DOCKER_PASSWORD |   sudo docker login --username $DOCKER_USERNAME --password-stdin'
            sh "sudo docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
            sh "sudo docker push ${DOCKER_IMAGE}:latest"
        }

        //clean to save disk
        sh "sudo docker image rm ${DOCKER_IMAGE}:${DOCKER_TAG}"
        sh "sudo docker image rm ${DOCKER_IMAGE}:latest"
      }
    }
    stage("Deploy Image") {
      
      steps {

        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh "sudo docker stop mockproject-team2"
            sh "sudo docker rm mockproject-team2"
            sh 'docker rmi -f $(docker images -a -q)'
            sh "sudo docker run --restart unless-stopped -dp 80:3000 --name mockproject-team2 ${DOCKER_IMAGE}:${DOCKER_TAG}"
        }

        //clean to save disk
        // sh "sudo docker image rm ${DOCKER_IMAGE}:${DOCKER_TAG}"
        // sh "sudo docker image rm ${DOCKER_IMAGE}:latest"
      }
    }
  }

  post {
    success {
      echo "SUCCESSFULLLLLLLLLLL"
    }
    failure {
      echo "FAILEDDDDDDDDDDDDD"
    }
  }
}
