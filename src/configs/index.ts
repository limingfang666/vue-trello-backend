/*
 * @Description: 项目中会用到许多的一些动态可变数据，比如不同环境下（开发、测试、生成等）主机地址，端口，数据库连接信息等。
 * @Author: lmfang
 * @Date: 2022-09-20 16:16:49
 * @LastEditTime: 2022-11-10 15:53:34
 * @LastEditors: lmfang
 */
import databaseConfig from './database.json'

// 也可以把类型声明放到单独的 .d.ts 文件中，如：/src/types/global.d.ts
interface IDatabaseConfig {
    username: string,
    password: string | undefined,
    database: string,
    host: string,
    dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql",
    timezone: string
}

const configs = {
    development: {
        server: {
            host: 'localhost',
            port: '8080'
        },
        database: databaseConfig.development as IDatabaseConfig,
        jwt: {
            jwtKey: 'trello'
        }
    },
    test: {
        server: {
            host: 'localhost',
            port: '8080'
        },
        database: databaseConfig.test as IDatabaseConfig,
        jwt: {
            jwtKey: 'trello'
        }
    },
    production: {
        server: {
            host: 'localhost',
            port: '8080'
        },
        database: databaseConfig.production as IDatabaseConfig,
        jwt: {
            jwtKey: 'trello'
        }
    },
}

// type configsKey = "development" | "test" | "production"
type configsKey = keyof typeof configs;

// 全局变量process表示的是当前的node进程(需要安装npm i --save @types/node)
const NODE_ENV = process.env.NODE_ENV as configsKey || 'development';

//const NODE_ENV: "development" | "test" | "production"
export default configs[NODE_ENV];