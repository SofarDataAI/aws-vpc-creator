#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { checkEnvVariables } from '../utils/check-environment-variables';
import { AwsVpcCreatorStack } from '../lib/aws-vpc-creator-stack';

dotenv.config(); // Load environment variables from .env file

const { CDK_DEFAULT_ACCOUNT: account } = process.env;

// check variables
checkEnvVariables('APP_NAME',
    'ENVIRONMENT',
    'CDK_DEPLOY_REGION',
    'ENABLE_DNS_HOSTNAMES',
    'ENABLE_DNS_SUPPORT',
);

const appName = process.env.APP_NAME!;
const deployEnvironment = process.env.ENVIRONMENT!;
const deployRegion = process.env.CDK_DEPLOY_REGION!;
const enableDnsHostnames = process.env.ENABLE_DNS_HOSTNAMES === 'true'; // default set vpc is not enabled for DNS hostnames
const enableDnsSupport = process.env.ENABLE_DNS_SUPPORT === 'true'; // default set vpc is not enabled for DNS support

const app = new cdk.App();
new AwsVpcCreatorStack(app, `${appName}-${deployRegion}-${deployEnvironment}-AwsVpcCreatorStack`, {
  resourcePrefix: `${appName}-${deployRegion}-${deployEnvironment}`,
  cdkDeployRegion: deployRegion,
  cdkDeployEnvironment: deployEnvironment,
  env: {
      account,
      region: deployRegion,
  },
  enableDnsHostnames,
  enableDnsSupport,
  appName,
  description: `${appName}-${deployRegion}-${deployEnvironment}-AwsVpcCreatorStack`,
  stackName: `${appName}-${deployRegion}-${deployEnvironment}-AwsVpcCreatorStack`,
});

app.synth();
