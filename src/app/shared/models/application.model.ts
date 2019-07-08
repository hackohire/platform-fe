export interface Application {
    _id?: string;
    name: string;
    description?: string;
    appSecret?: string;
    __typename?: string;
    uuid?: string;
    apiKey?: string;
    application_url?: string;
    privacy_policy_url?: string;
    status?: ApplicationStatus;
}

enum ApplicationStatus {
    Created,
    Submitted,
    Approved,
    Rejected,
    Archieved,
    Deleted,
    Published,
    Unpublished
}
