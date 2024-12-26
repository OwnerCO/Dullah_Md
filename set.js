const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNklrbHR2YjNQam4zS2JLNW5zdHRweTJmRGRLN3ovSHEvZ2szeHJkM2xVWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMitjdGg5OENYYXBtWFN4SHIwZE9iRTZyb0F1cTErZU43RjJhRHRZVmdWMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQmdoK0JXMXV5TXNoQStBVkdySWNrMWJRNWlZbjZZWE14K0ErUFBuSEY4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQT01vTFNHaDcrOXdpYkk4WGcyWmRvUjg3QTFKcEhKdXhPR2NsS1duMncwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9HWVd2NjN2QUdZUjl0ZjE5Szh4YVVKREVsOWQrSHE5L0lISlNiSXExWGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNEMlV2T3I4aGwvcHJ2QlZkdjdqeUc0a3l6bEo0MS9Vdks0eEVub0t3MTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEJBcDhxcHU4RmFianVPN0hiVndORzBETWFlYm83anFYSk1EWjVZNlFIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWG5pUVNUTThzc3lKMFl3R1c4cnR1SHhrMUhHTmFha0ZUZzJWS1UzLzYyOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdRSTEyVW9JWVF2elp4T2ZOS0txK0xOLy9lajhIcHpUNDBydnp4emZGOWk0NXI5anNJWHQ0enpWMU5lZDBLOGF1Snh0cjAwbzR6YkdLQldieERCU2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIxLCJhZHZTZWNyZXRLZXkiOiJ3ZDhuUmNadE1vZHQ5MnZaa3R1aDRKNkJtOGtCaWZlNWJnRjh0R3NYWmhFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUxOTc4MTk0OTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdGNDY4MkMzMzgxRUE3NTIzQzc2OEVFQUIzNUIxOEVCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzUyNDIxNDN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTc4MTk0OTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQ3Q0ZGRTkzMUZCOENCNTg0QzBBNTczRUZEQzc3MzBCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzUyNDIxNDN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjY1Y3EzMUx1U21PYUcwcWtxczJDbVEiLCJwaG9uZUlkIjoiNGU2ZDIyMjMtNTQ4Zi00YjFjLTgzNGYtNDhiYzdiODQ4YjYzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlRbjhSSVdyZFh1aHRQbG5oNTFGRkhEY0NwQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUQkxBNnhxSFNCTlBIcEhSdDJTbDVxQmwwVXc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiM0tIS05QMlkiLCJtZSI6eyJpZCI6IjUxOTc4MTk0OTMzOjQ1QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlN5c3NvbHV0aW9ucyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTitRbHZVR0VKRGp0cnNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiejRuUVJmTEZiSFpRanNWU0FhVG5FejJ6RDFuWis4OStEY3dPTzVwTzVSZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWHByait0dGVjOTRSWnhwM1FPbmRMQjNGWktrSFFNWVdxcm9jSXJVcGxQeWVvb2xPbURCUms2L3ZDUklZVzA5Y01BL3Zyb2pab3p5MHRqOWVoK0FtQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IktVbWIwT3FQaGNMYXRERklMOEhTMHhkZ1FPMzJINXZ2cEhWU2pTWSt1VjV2QzZjWmlJTlJnN3JrU3RJS09rSmhrY2NWL0lMNkhsQkNIZnQzZStpbWlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTE5NzgxOTQ5MzM6NDVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYytKMEVYeXhXeDJVSTdGVWdHazV4TTlzdzlaMmZ2UGZnM01EanVhVHVVWSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNTI0MjE0MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMRXEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "@CyberPsycho",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "51978194933",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE : process.env.ANTIDELETE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
