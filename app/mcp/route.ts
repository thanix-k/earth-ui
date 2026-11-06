import { createMcpHandler } from "@modelcontextprotocol/server";
import { createDocsServer } from "@/lib/mcp";

const handler = createMcpHandler(createDocsServer);

const serve = (request: Request) => handler.fetch(request);

export { serve as GET, serve as POST, serve as DELETE };
