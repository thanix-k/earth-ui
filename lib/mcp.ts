import { McpServer } from "@modelcontextprotocol/server";
import { registerSearchTool, registerSourceTools } from "fumadocs-core/mcp";
import { createFromSource } from "fumadocs-core/search/server";
import { llms } from "fumadocs-core/source/llms";
import { source } from "@/lib/source";

const docsLlms = llms(() => source, {
  renderPage: (page) => page.data.getText("processed"),
});

const search = createFromSource(source);

export function createDocsServer() {
  const mcp = new McpServer({ name: "earth-ui-docs", version: "1.0.0" });
  registerSourceTools(mcp, source, docsLlms);
  registerSearchTool(mcp, search);
  return mcp;
}
