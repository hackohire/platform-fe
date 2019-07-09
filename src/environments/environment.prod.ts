export const environment = {
  production: true,
  graphql_url: 'https://qs3c3z6r40.execute-api.ap-south-1.amazonaws.com/prod/graphql',
  s3BucketName: 'platformfile-dev',
  s3BucketURL: 'https://platformfile-dev.s3.amazonaws.com/public/',
  permissions: require('../permissions.json')
};
