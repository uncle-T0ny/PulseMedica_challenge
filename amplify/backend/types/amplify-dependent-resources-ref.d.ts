export type AmplifyDependentResourcesAttributes = {
    "storage": {
        "requests": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "SortKeyName": "string",
            "SortKeyType": "string",
            "Region": "string"
        },
        "requestsS3": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "pulsemedicachallenge42c87add": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "auth": {
        "pulsemedicachallenge": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "apistage": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    }
}