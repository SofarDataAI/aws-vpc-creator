import { StackProps } from "aws-cdk-lib";

export interface AwsVpcCreatorStackProps extends StackProps {
    /**
     * The name of the application.
     */
    readonly appName: string;
    /**
     * Prefix used for naming AWS resources.
     */
    readonly resourcePrefix: string;
    /**
     * The environment where the CDK stack will be deployed.
     */
    readonly cdkDeployEnvironment: string;
    /**
     * The AWS region where the stack will be deployed.
     */
    readonly cdkDeployRegion: string;
    /**
     * Enable DNS hostnames in the VPC.
     */
    readonly enableDnsHostnames: boolean;
    /**
     * Enable DNS support in the VPC.
     */
    readonly enableDnsSupport: boolean;
}
