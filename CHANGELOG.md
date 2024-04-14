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