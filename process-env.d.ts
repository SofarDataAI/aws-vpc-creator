declare module NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        CDK_DEPLOY_REGION: string;
        ENVIRONMENT: string;
        APP_NAME: string;
        ENABLE_DNS_HOSTNAMES: string;
        ENABLE_DNS_SUPPORT: string;
        OWNER: string;
    }
}
