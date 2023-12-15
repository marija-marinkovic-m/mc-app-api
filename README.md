# mc-app-api

This project is an experiment with the action step of a Manychat automation flow. It's a serverless application that can be deployed using the AWS Serverless Application Model (SAM) Command Line Interface (CLI).

## Components

- `mc-app-api`: This is the application's Lambda function, written in TypeScript.
- `events`: These are the invocation events for the Lambda function.
- `template.yaml`: This file defines the AWS resources used by the application.

The `template.yaml` file is where you define resources like Lambda functions and an API Gateway API. 

## Requirements

- An AWS account with administrative access.
- A Slack app installed and set up with the CloudFormation outputs of `MCAppApi` and `MCAppApiStore`.
- A Notion account with administrative access, set up with the resulting API Gateway endpoints.
- A Manychat application installed on your Manychat account. You can use the sample reference provided in `assets/sample-mc-app.json`.

More info: [upstream repo](https://github.com/marija-marinkovic-m/random-bot-app)