import dotenv from 'dotenv'

dotenv.config()

export const environmentConfigs = {
    ...process.env
}