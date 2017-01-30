def notifyFailed() {
  emailext(
    subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
    body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
             <p>Check console output at &QUOT;<a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>&QUOT;</p>""",
    recipientProviders: [[$class: 'CulpritsRecipientProvider'],
                         [$class: 'FailingTestSuspectsRecipientProvider']],
    to: 'anton.atanasov@fourth.com dimitar.angelov@fourth.com georgi.kolev@fourthlimited.onmicrosoft.com konstantin.tsolev@fourth.com simeon.minchev@fourth.com stefan.uzunov@fourth.com',
    mimeType: 'text/html'
  )
}

def generateRandomPort() {
  r = new Random()
  return r.nextInt(1001) + 8000
}

def isPRBranch() {
  branch = env.BRANCH_NAME
  return branch || branch.contains('PR')
}

try {
  // Only run on nodes (slaves) with a label of 'ember'.
  node ('ember') {
    stage('Get code') {
      // get the code
      checkout scm
      sh 'echo $BRANCH_NAME'
    }

    stage('Install dependencies') {


      // Make sure we can access our private npm packages.
      withCredentials([[$class: 'StringBinding', credentialsId: 'bdae9b67-57e7-422c-b3a5-72aa1964987c', variable: 'npmrc']]) {
        sh 'echo $npmrc > $HOME/.npmrc'
      }

      // Grab SSH KEY
      withCredentials([[$class: 'FileBinding', credentialsId: 'DOCKER_GIT_FILE', variable: 'dockergitkey']]) {
        sh 'sudo cp "$dockergitkey" ./id_rsa'
      }

      // This script wraps the npm and bower install process. It
      // checksums package.json and bower.json and only runs npm or
      // bower if the checksum doesn't match
      sh './install_deps.sh'
    }

    stage('Run tests') {
      port = generateRandomPort()
      exit = sh ( returnStatus: true, script: "ember test --reporter xunit --test-port ${port} --silent > output.xml" )
      junit 'output.xml'

      if (exit != 0) {
        error 'Tests Failed'
      }
    }
    // The BRANCH_NAME env variable is only set by the Multibranch
    // pipeline job type. In other words, only the job that sits over
    // 'develop' will go into the deploy stage below.
    /*if (!env.BRANCH_NAME || !env.BRANCH_NAME.contains('PR')) {
      stage('Deploy to development') {
        // Build and deploy
        withCredentials([[$class: 'StringBinding', credentialsId: 'menucycles-dev-ftp-password', variable: 'PASSWORD']]) {
          sh 'ember build --environment=production'
          // sh './setupServer.sh'
          sh 'ember deploy development'
        }
      }
    }

  def promoteToQA = false

  if (!isPRBranch()) {
    stage('promote to qa') {
      try {
        milestone() // cancel older builds that are still waiting on the input step
        input 'Promote?'
        milestone()
        promoteToQA = true
      } catch(err) {
        // if we don't promote then don't fail the build
        currentBuild.result = 'SUCCESS'
      }

      if (promoteToQA) {
        node('ember') {
          // deploy the previously built app to QA
          withCredentials([[$class: 'StringBinding', credentialsId: 'menucycles-dev-ftp-password', variable: 'PASSWORD']]) {
            sh 'ember deploy qa'
          }
        }
      }
    }*/
  }
} catch (e) {
  // if anything goes wrong, notify the relevant people
  currentBuild.result='FAILED'
  node('ember') {
    notifyFailed()
  }
  throw e
}
