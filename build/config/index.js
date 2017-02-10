import path from 'path'
import myIp from 'my-ip'

export const CURRENT_IP = myIp()
export const BROWSER_SYNC_PORT = 3000
export const WEBPACK_SERVER_PORT = 8080
export const projectRootPath = path.resolve(__dirname, '../../')
export const projectSourcePath = path.join(projectRootPath, 'src')
export const projectPublicPath = path.join(projectRootPath, 'public')
export const templatePath = path.join(projectSourcePath, 'index.html')
