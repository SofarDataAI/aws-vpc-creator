## 2024-04-24

### Added
- Added environment variables `VPC_SUBNET_TYPE`, `VPC_CIDR_BLOCK`, `VPC_MAX_AZS`, and `VPC_NAT_GATEWAYS` to configure the VPC in the `AwsVpcCreatorStack` class.
- Updated the `checkEnvVariables` function to include the new environment variables.
- Updated the `AwsVpcCreatorStackProps` interface to include new properties for VPC configuration.
- Updated the `AwsVpcCreatorStack` constructor to use the new environment variables for VPC configuration.
- Added `parseVpcSubnetType` function to parse VPC subnet type string in `vpc-type-parser.ts`.

## 2024-04-20

### Added
- Added imports for `Aspects`, `ApplyTags`, and `AwsSolutionsChecks` in `bin/aws-vpc-creator.ts`.
- Added `owner` variable and applied tags to all resources using `appAspects` in `bin/aws-vpc-creator.ts`.
- Updated `vpcFlowLogRole` in `lib/aws-vpc-creator-stack.ts` to use inline policies instead of managed policies.
- Added inline policy `VpcFlowLogsPolicy` to allow `logs:CreateLogStream` and `logs:PutLogEvents` actions on the VPC flow log group in `lib/aws-vpc-creator-stack.ts`.
- Added `OWNER` environment variable declaration in `process-env.d.ts`.
- Added `ApplyTags` class for applying tags to resources in `utils/apply-tag.ts`.
- Added `OWNER` environment variable to `.env.example`.
- Updated `aws-cdk-lib` and `cdk-nag` versions in `package-lock.json` and `package.json`.

## 2024-04-14

### Added
- Added the `dotenv` package to load environment variables from a `.env` file.
- Added a check for required environment variables in the `checkEnvVariables` function.
- Added VPC creation and configuration logic in `AwsVpcCreatorStack`.
- Added VPC flow logs configuration in `AwsVpcCreatorStack`.
- Added an output for the VPC ID in `AwsVpcCreatorStack`.
- Added an example `.env` file.

### Updated
- Updated the constructor of `AwsVpcCreatorStack` to accept additional props and added environment variables to the constructor.

### Updated Dependencies
- Updated dependencies: aws-cdk-lib, constructs, dotenv.
- Added new dependency: cdk-ecr-deployment.