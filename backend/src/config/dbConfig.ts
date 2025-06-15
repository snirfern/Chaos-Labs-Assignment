export const clickHouseConfig = () => ({
    url: `http://${process.env.DB_HOST|| 'localhost'}:${process.env.DB_PORT|| '8123'}`,
    username: process.env.DB_USER || 'devuser',
    password: process.env.DB_PASSWORD|| 'devpassword'
})

