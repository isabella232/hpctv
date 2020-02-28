# Deploy to test/prod environments

Commit changes and push to the master branch. This will trigger the "hpctv" AWS Codepipeline.

The first stage of the pipeline will:
* install npm
* build the application
* add the latest git hash as a comment to the bottom of index.html
* push the code up to the S3 bucket at hpctv-test.ucar.edu

You will need to manually approve the pipeline to copy the code from the stage s3 bucket into the production s3 bucket. This build will also invalidate the Cloudfront cache.
