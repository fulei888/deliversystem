import dotenv from 'dotenv';
dotenv.config();
export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazona',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'AfN2oteha-rwcAdq5_V9999E6wiGPs_XtHYA9BHmuZbCgWl78wu20GwvcDm1fOgj7gH4kGIzxhgaG5Ms',
    accessKeyId: process.env.accessKeyId || 'AKIAJKTLD4CO3GVOLJPA',
    secretAccessKey: process.env.secretAccessKey || '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'

}
