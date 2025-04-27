const TRA_SERVER_DOMAIN = "www.tranimeizle.top";

import { serve } from "bun";

// Arama sonuçları sayfasındaki belirli elementlerin içersindeki veriyi ayıklayacak bir düzenli ifade (regular expression)
const parseRegexp = /<div\s+class=["']flx-block["'][^>]*data-href=["']([^"']+)["'][^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<h[1-6][^>]*>([^<]+)<\/h[1-6]>[\s\S]*?<span[^>]*class=["'][^"']*info-chip[^"']*["'][^>]*>([^<]+)<\/span>[\s\S]*?<span[^>]*class=["'][^"']*info-chip[^"']*["'][^>]*>([^<]+)<\/span>[\s\S]*?<\/div>/gi;

const server = serve({
    port: 3000,
    routes: {
        // "http://localhost:3000/one%20piece" => res.params.query = "one%20piece"
        "/:query": async (res) => {
            if (res.params.query == "favicon.ico") {
                return new Response("Not found.", {
                    status: 404,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                });
            }
            try {
                const req = await fetch("https://" + TRA_SERVER_DOMAIN + "/arama/" + res.params.query);
                const data = await req.text();

                const parsedData = [...data.matchAll(parseRegexp)].map(m => ({
                    title:    m[3].trim(),
                    type:     m[4].trim(),
                    href:     m[1],
                    image:    m[2],
                    duration: m[5].trim()
                }));

                return Response.json(parsedData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                });
            } catch {
                return new Response.json({ error: "tranimeizle server error." }, {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    }
                });
            }
        },
    },

    // root isteği ("http://localhost:3000/")
    fetch(req) {
        return new Response("Usage example: \"" + (new URL(req.url)).origin + "/one piece\"", {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        });
    },
});

console.log(server.url);
