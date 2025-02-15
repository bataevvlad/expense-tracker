import { exec } from 'child_process'

import { ExecutorContext } from '@nx/devkit'

export interface DockerBuildExecutorSchema {
  imageName: string;
  dockerFile: string;
}

export default async function runExecutor(
  options: DockerBuildExecutorSchema,
  context: ExecutorContext
) {
  console.log(`Building Docker image: ${options.imageName}`)

  // Fix: Add '.' at the end to specify the build context
  // docker build -t mobile-app -f apps/mobile/Dockerfile .
  const command = `docker build -t ${options.imageName} -f ${options.dockerFile} .`

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr)
        reject({ success: false })
      } else {
        console.log(stdout)
        resolve({ success: true })
      }
    })
  })
}
