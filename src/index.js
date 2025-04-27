const PORT = 3000;
const TRA_SERVER_DOMAIN = "www.tranimeizle.top";

// Arama sonuçları sayfasındaki belirli elementlerin içersindeki veriyi ayıklayacak bir düzenli ifade (regular expression)
const PARSE_REGEXP = /<div\s+class=["']flx-block["'][^>]*data-href=["']([^"']+)["'][^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<h[1-6][^>]*>([^<]+)<\/h[1-6]>[\s\S]*?<span[^>]*class=["'][^"']*info-chip[^"']*["'][^>]*>([^<]+)<\/span>[\s\S]*?<span[^>]*class=["'][^"']*info-chip[^"']*["'][^>]*>([^<]+)<\/span>[\s\S]*?<\/div>/gi;



import express from 'express';
const app = express();

// "http://localhost:3000/one%20piece" => req.params.query = "one%20piece"
app.get('/:query', async (req, res) => {

    const query = req.params.query;

    if (query == "favicon.ico") {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(404);
        res.send("Request failed.");
        return;
    }

    try {
        const response = await fetch("https://" + TRA_SERVER_DOMAIN + "/arama/" + query);
        const data = await response.text();

        const parsedData = [...data.matchAll(PARSE_REGEXP)].map(m => ({
            title:    m[3].trim(),
            type:     m[4].trim(),
            href:     m[1],
            image:    m[2],
            duration: m[5].trim()
        }));

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(parsedData);
    } catch (error) {
        res.status(500).json({ error: "tranimeizle server error." });
    }
});

app.get('/', (req, res) => {
    const url = req.protocol + "://" + req.get('host');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(`Usage example: "${url}/one piece"`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
