/**
 * Copied from the official Paseo example plugin `lifecycle-actions`
 * (plugin-examples/lifecycle-actions/server/inspect.ts @ 5acfbb3777d7fbac634f4ed83aefed56fb49cb8f, Apache-2.0),
 * with one change: text items are separated by a newline, so a marker that opens a line cannot be
 * glued to the end of the previous item's text.
 */
import type { AgentTimelineItem } from "@getpaseo/protocol/agent-types";

export function latestOutputText(timeline: readonly AgentTimelineItem[]): string {
  let output = "";
  for (const item of timeline) {
    if (item.type === "user_message") {
      output = "";
    } else if ("text" in item && typeof item.text === "string") {
      output += item.text.endsWith("\n") ? item.text : `${item.text}\n`;
    } else {
      output += JSON.stringify(item) + "\n";
    }
  }
  return output;
}
