#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { Aspects } from 'aws-cdk-lib';
import { ApplyTags } from '../utils/apply-tag';
import { AwsSolutionsChecks } from 'cdk-nag';
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
    'OWNER',
    'VPC_SUBNET_TYPE',
    'VPC_CIDR_BLOCK',
    'VPC_MAX_AZS',
    'VPC_NAT_GATEWAYS',
);

const appName = process.env.APP_NAME!;
const deployEnvironment = process.env.ENVIRONMENT!;
const deployRegion = process.env.CDK_DEPLOY_REGION!;
const enableDnsHostnames = process.env.ENABLE_DNS_HOSTNAMES === 'true'; // default set vpc is not enabled for DNS hostnames
const enableDnsSupport = process.env.ENABLE_DNS_SUPPORT === 'true'; // default set vpc is not enabled for DNS support
const owner = process.env.OWNER!;

const app = new cdk.App();
const appAspects = Aspects.of(app);

// apply tags to all resources
appAspects.add(new ApplyTags({
  environment: deployEnvironment as 'development' | 'staging' | 'production' | 'demonstration',
  project: appName,
  owner: owner,
}));
appAspects.add(new AwsSolutionsChecks());

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
  vpcSubnetType: process.env.VPC_SUBNET_TYPE!,
  vpcCidrBlock: process.env.VPC_CIDR_BLOCK!,
  vpcMaxAzs: parseInt(process.env.VPC_MAX_AZS!),
  vpcNatGateways: parseInt(process.env.VPC_NAT_GATEWAYS!),
  appName,
  description: `${appName}-${deployRegion}-${deployEnvironment}-AwsVpcCreatorStack`,
  stackName: `${appName}-${deployRegion}-${deployEnvironment}-AwsVpcCreatorStack`,
});

app.synth();
