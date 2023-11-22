import { Config } from "./vipSquad/types";

export const config: Config = {
    PORT: process.env.PORT || 5000,
    domain: "http://localhost:3000",
    origin: ["http://localhost:3000"],
    secret: "gold-squad",
    greedIdxBaseUrl: 'https://api.alternative.me/fng/',
    cryptoAlertToken: '4RTXNrIL9hBuZ4c6MiobuOdBCvPxjl0',
    cryptoPanicToken: 'e582336057b9dc8904cd4c40639d4926cc15781d',
    cryptoPanicBaseUrl: 'https://cryptopanic.com/api/v1/posts',
    resourceHubBaseUrl: 'https://goldsquad777.notion.site/goldsquad777/VIP-Resource-Hub-d6ef81e8fe0249e7827b041239e0c5b7',
    delay: 10000,
    WHOP_API_KEY: "T3un9Vbh5JS57nOcO__AX7SpG44IWohhbv4YIwZeO_M",
    WHOP_CLIENT_SECRET: "Bv56oEFELMdQwXcFaMspCGhLhMj--U0l6EpVJmqZY5Q",
    WHOP_CLIENT_ID: process.env.WHOP_CLIENT_ID as string,
    WHOP_COMPANY_ID: "biz_VdSGAOLB3qAPUa",
    WHOP_REDIRECT_URL: process.env.WHOP_REDIRECT_URL as string
};