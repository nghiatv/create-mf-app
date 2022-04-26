deploy-sandbox:
	aws s3 sync --cache-control 'max-age=31536000' --exclude index.html --exclude remoteEntry.js ./dist/ s3://admin-nextgen.vuiapp.nanofin.tech/module/{{SAFE_NAME}}/ --delete
	aws s3 cp --cache-control 'max-age=0' ./dist/remoteEntry.js s3://admin-nextgen.vuiapp.nanofin.tech/module/{{SAFE_NAME}}/remoteEntry.js --content-type application/javascript

deploy-production:
	aws s3 sync --cache-control 'max-age=31536000' --exclude index.html --exclude remoteEntry.js ./dist/ s3://admin.nextgen.vuiapp.vn/module/{{SAFE_NAME}}/ --delete
	aws s3 cp --cache-control 'max-age=0' ./dist/remoteEntry.js s3://admin.nextgen.vuiapp.vn/module/{{SAFE_NAME}}/remoteEntry.js --content-type application/javascript

list-sandbox:
	aws s3 ls s3://admin-nextgen.vuiapp.nanofin.tech/module/{{SAFE_NAME}}/ --recursive --human-readable --summarize

list-production:
	aws s3 ls s3://admin.nextgen.vuiapp.vn/module/{{SAFE_NAME}}/ --recursive --human-readable --summarize