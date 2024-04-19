import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

const fetchProducts = async () => {
  const REGION = 'us-east-1';
  const s3Client = new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: REGION },
      identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
    }),
  });
  const params = {
    Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
    Key: 'products',
  };
  try {
    const res = await s3Client.send(new GetObjectCommand(params));
    const bodyString = await res.Body.transformToString();
    return JSON.parse(bodyString);
  } catch (error) {
    console.error('Error: ', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export { fetchProducts };
