import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { AwsVpcCreatorStackProps } from './AwsVpcCreatorStackProps';

/**
 * The AwsVpcCreatorStack class is responsible for creating a VPC and its related resources
 * within AWS using the AWS CDK. It sets up a VPC with public and private subnets, configures
 * NAT gateways for high availability, and establishes logging for VPC flow logs.
 *
 * @param {Construct} scope - The scope in which to define this construct.
 * @param {string} id - The scoped construct ID.
 * @param {AwsVpcCreatorStackProps} props - The stack properties including resource prefix,
 *                                          application name, and environment settings.
 */
export class AwsVpcCreatorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsVpcCreatorStackProps) {
    super(scope, id, props);

    const removalPolicy = props.cdkDeployEnvironment === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;
    // create vpc
    const vpcName = `${props.resourcePrefix}-VPC`;
    const awsVpc = new ec2.Vpc(this, vpcName, {
            ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'), //IPs in Range - 65,536
            natGateways: 3, // for high availability
            maxAzs: 3, // for high availability
            subnetConfiguration: [
                {
                    name: `${props.resourcePrefix}-PUBLIC`,
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 24, //IPs in Range - 256
                },
                {
                    name: `${props.resourcePrefix}-PRIVATE_WITH_EGRESS`,
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidrMask: 24, //IPs in Range - 256
                },
            ],
            enableDnsHostnames: props.enableDnsHostnames,
            enableDnsSupport: props.enableDnsSupport,
    });

    // apply removal policy to all vpc and subnet resources
    awsVpc.applyRemovalPolicy(removalPolicy);
    for (const subnet of awsVpc.privateSubnets) {
        subnet.applyRemovalPolicy(removalPolicy);
    }
    for (const subnet of awsVpc.isolatedSubnets) {
        subnet.applyRemovalPolicy(removalPolicy);
    }
    for (const subnet of awsVpc.publicSubnets) {
        subnet.applyRemovalPolicy(removalPolicy);
    }

    const vpcFlowLogRole = new iam.Role(this, `${props.resourcePrefix}-RoleVpcFlowLogs`, {
        assumedBy: new iam.ServicePrincipal("vpc-flow-logs.amazonaws.com"),
        managedPolicies: [
            iam.ManagedPolicy.fromAwsManagedPolicyName("CloudWatchFullAccess"),
        ],
    });

    const vpcFlowLogGroup = new logs.LogGroup(this, `${props.resourcePrefix}-VpcFlowLogGroup`, {
        retention: RetentionDays.ONE_MONTH,
        removalPolicy: removalPolicy,
    });

    new logs.LogStream(this, `${props.resourcePrefix}-VpcFlowLogStream`, {
        logGroup: vpcFlowLogGroup,
        removalPolicy: removalPolicy,
    });

    new ec2.FlowLog(this, `${props.resourcePrefix}-VpcFlowLog`, {
        resourceType: ec2.FlowLogResourceType.fromVpc(awsVpc),
        destination: ec2.FlowLogDestination.toCloudWatchLogs(vpcFlowLogGroup, vpcFlowLogRole),
        trafficType: ec2.FlowLogTrafficType.ALL,
    });

    // print out vpc id
    new cdk.CfnOutput(this, `${props.resourcePrefix}-VPC-ID-Export`, {
        value: awsVpc.vpcId,
        exportName: `${props.resourcePrefix}-VPC-ID-Export`,
        description: 'Infrastructure VPC ID.',
    });
  }
}
