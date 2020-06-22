# hpctv

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Pull data from SAM
To do this locally you must set the SAM API username and password, then run:

```bash
bash ./get-sam-data.sh
```

This will populate the ./data directory with 13 JSON files containing HPC data from the SAM API.

## Deploy to staging and production environments

Deployment to AWS S3 occurs via the "hpctv-deployment" AWS Codepipeline. The pipleline contains two build stages separated by a manual approval. To trigger the pipeline, commit changes to this repo and push to the master branch on GitHub. This will trigger the first build stage.

The first build stage of the pipeline will:

* install npm
* build the application
* add the latest git hash as a comment to the bottom of index.html
* push the code up to the S3 bucket at hpctv-test.ucar.edu

At this point, you can access the [staging site](https://hpctv-test.ucar.edu) before promoting to production.

To promote the build to production, manually approve the pipeline to copy the code from the staging S3 bucket into the production S3 bucket. This production build will also invalidate the Cloudfront cache.

## HPC Data

A CircleCI job runs nightly to fetch updated Cheyenne accounting data from SAM. Updated data is synced to the staging and production S3 buckets.