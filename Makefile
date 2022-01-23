PROFILE=serverless
STACK=github-actions
GITHUBORG=lewisojile

CREATED_ROLE=github-actions-Role-56IHHM969DKJ

deploy:
	AWS_PROFILE=$(PROFILE) aws cloudformation deploy --stack-name $(STACK) --template-file oidc-role.yml --parameter-overrides  GitHubOrg=$(GITHUBORG) --capabilities CAPABILITY_IAM

getrole:
	aws iam get-role --role-name $(CREATED_ROLE)

# view attached policies
list-attached-role-policies:
	aws iam list-attached-role-policies --role-name $(CREATED_ROLE)