import { devLog, utf8ByteLength } from "@balsamic/dev";
import { JSDOM } from "jsdom";
import { domRemoveExternalCssAndScripts, stripUtf8BOM } from "../lib/code-utils";
import { sizeDifference } from "../lib/logging";
import type { ViteBundledOutput } from "./build-vite";
import { htmlMinify } from "./html-minify";

export async function htmlCssToJs(sources: ViteBundledOutput) {
  return devLog.timed(
    async function html_css_to_js() {
      const dom = new JSDOM(stripUtf8BOM(sources.html));

      const scriptsTags = Array.from(dom.window.document.querySelectorAll("script"));
      let js = [...scriptsTags.map((scriptTag) => scriptTag.textContent), sources.js].join("\n");
      scriptsTags.forEach((scriptTag) => scriptTag.remove());

      const styleTags = Array.from(dom.window.document.querySelectorAll("style"));
      const css = [...styleTags.map((styleTag) => styleTag.textContent), sources.css].join("\n");
      styleTags.forEach((styleTag) => styleTag.remove());

      domRemoveExternalCssAndScripts(dom);

      let bodyHtml = dom.window.document.body.innerHTML;
      bodyHtml = await htmlMinify(bodyHtml, { type: "fragment", prependUtf8BOM: false, timed: false });
      dom.window.document.body.innerHTML = "";

      if (css) {
        bodyHtml = `<style>${css}</style>${bodyHtml}`;
      }

      if (bodyHtml) {
        js = `document.body.innerHTML=${JSON.stringify(bodyHtml)};${js}`;
      }

      if (js) {
        const script = dom.window.document.createElement("script");
        script.type = "module";
        script.src = "/index.js";
        script.toggleAttribute("crossorigin", true);
        dom.window.document.body.appendChild(script);
      }

      const finalHtml = await htmlMinify(`<!DOCTYPE html>${dom.window.document.documentElement.outerHTML || ""}`, {
        type: "page",
        prependUtf8BOM: true,
        timed: false,
      });

      this.setSuccessText(
        sizeDifference(utf8ByteLength(sources.html, sources.css, sources.js), utf8ByteLength(js, finalHtml)),
      );
      return {
        html: finalHtml,
        js,
      };
    },
    { spinner: true },
  );
}
