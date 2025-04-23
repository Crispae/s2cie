## Mdoule to handle the utils related
import re

import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError


def list_public_ip(
    aws_region, regex_pattern, aws_access_key_id=None, aws_secret_access_key=None
):

    ## credentials to access the keys
    aws_access_key_id = aws_access_key_id
    aws_secret_access_key = aws_secret_access_key
    aws_region = aws_region

    try:
        # If logged in from console
        ec2_client = boto3.client("ec2", region_name=aws_region)

    except NoCredentialsError:
        print("Credentials not found. Trying with explicit credentials...")

        try:
            # If using explicit credentials
            ec2_client = boto3.client(
                "ec2",
                aws_access_key_id=aws_access_key_id,
                aws_secret_access_key=aws_secret_access_key,
                region_name=aws_region,
            )
            print("Successfully authenticated with explicit credentials.")

        except (NoCredentialsError, PartialCredentialsError) as e:

            raise ValueError(
                f"Provided aws credentials are incorrect, please provide the correct credentials. {str(e)}"
            )
            # Handle the authentication failure as needed

    ## Requesting AWS to reterive the Public IP
    response = ec2_client.describe_instances(
        Filters=[{"Name": "instance-state-name", "Values": ["running"]}]
    )

    # Extract public IPs based on the provided regex pattern
    public_ips = []
    for reservation in response["Reservations"]:
        for instance in reservation["Instances"]:
            # Assuming the instance name is stored in a tag named 'Name'
            instance_name = None
            for tag in instance.get("Tags", []):
                if tag["Key"] == "Name":
                    instance_name = tag["Value"]
                    break

            # Check if the instance name matches the regex pattern
            if instance_name and re.match(regex_pattern, instance_name):
                public_ip = instance.get("PublicIpAddress")
                if public_ip:
                    public_ips.append(public_ip)

    return public_ips


def sort_response(response):
    """
    Sort response accroding to the count of entity.

    """
    sorted_dict = {}
    for key in response:
        sorted_res = sorted(
            response[key].items(), key=lambda x: x[1]["count"], reverse=True
        )
        sorted_res = {key: value for key, value in sorted_res}
        sorted_dict[key] = sorted_res

    return sorted_dict