import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsVpcCreatorStackProps } from './AwsVpcCreatorStackProps';

export class AwsVpcCreatorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsVpcCreatorStackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsVpcCreatorQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
