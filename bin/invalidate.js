const { CloudFront } = require('aws-sdk');
const cloudfront = new CloudFront();

const params = {
  DistributionId: process.env.DIST_ID,
  InvalidationBatch: {
    CallerReference: +new Date() + process.env.DIST_ID,
    Paths: { Quantity: 1, Items: ['/*'] }
  }
};

cloudfront.createInvalidation(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log(data);
});
