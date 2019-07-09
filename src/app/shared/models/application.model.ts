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

export enum ApplicationStatus {
    Created = 'Created',
    Submitted = 'Submitted',
    Approved = 'Approved',
    Rejected = 'Rejected',
    Archieved = 'Archieved',
    Deleted = 'Deleted',
    Published = 'Published',
    Unpublished = 'Unpublished'
}
