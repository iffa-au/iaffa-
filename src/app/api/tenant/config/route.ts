import { NextResponse } from "next/server";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// 2. Connect to DynamoDB using the AWS SDK.
// Initialize the client outside the handler to reuse the connection across invocations.
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-2",
  // If running locally, you must provide credentials or rely on environment variables. 
  // In AWS Lambda/Amplify, IAM roles handle this automatically.
});

const docClient = DynamoDBDocumentClient.from(client);

export async function GET(request: Request) {
  try {
    // 1. Extract host from headers
    const hostHeader = request.headers.get("host") || "";
    
    let host = hostHeader.split(":")[0].replace(/^www\./, "").toLowerCase();

    if (!host) {
      return NextResponse.json(
        { error: "Must provide a host header" },
        { status: 400 }
      );
    }

    // 3. Search the table where domainName == host using a Scan
    const tableName = process.env.DYNAMODB_TENANT_TABLE || "TenantConfigs";

    const command = new ScanCommand({
      TableName: tableName,
      FilterExpression: "DomainName = :domain",
      ExpressionAttributeValues: {
        ":domain": host,
      },
    });

    const response = await docClient.send(command);

    // 4. Return the result as a JSON response
    // ScanCommand returns an array of "Items", so we take the first match
    if (!response.Items || response.Items.length === 0) {
      return NextResponse.json(
        {
          error: "Tenant configuration not found",
          domain: host
        },
        { status: 404 }
      );
    }

    return NextResponse.json(response.Items[0], {
      status: 200,
      headers: {
        // Cache the response at the edge for 5 minutes, serve stale data for up to 10 minutes while revalidating
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        // Ensure cross-origin requests work if accessed directly (can lock to specific domains in production)
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (error) {
    console.error("Error fetching tenant config:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
