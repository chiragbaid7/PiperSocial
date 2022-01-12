
const {development} = require('../config/config');
const S3 = require("aws-sdk/clients/s3");

const s3 = new S3({
  region: development.region,
  accessKeyId: development.access_key_id,
  secretAccessKey: development.secret_access_key,
});

exports.uploadobject = async (file) => {
  /*\
    file.stream is a readeable stream 
    **so get the data from buffer memory and send it to aws 
  */
  const chunks = [];
  for await (let chunk of file.stream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  const params = {
    Bucket: development.AWS_BUCKET_NAME,
    Body: buffer,
    Key: file.originalName,
    ContentType: file.clientReportedMimeType,
    ACL: "public-read",
  };

  return s3.upload(params).promise();
};
exports.getobject = async (file) => {
  const download = {
    Bucket: development.AWS_BUCKET_NAME,
    Key: file,
  };
  return s3.getObject(download).promise();
};

exports.deleteobject = async (file) => {
  const params = {
    Bucket: development.AWS_BUCKET_NAME,
    Key: file,
  };
  return s3.deleteObject(params).promise();
};
