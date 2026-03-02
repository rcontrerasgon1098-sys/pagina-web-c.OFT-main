const fs = require('fs');
const https = require('https');
const path = require('path');
const url = require('url');

const dataPath = 'src/lib/placeholder-images.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

if (!fs.existsSync('public/images')) fs.mkdirSync('public/images', { recursive: true });
if (!fs.existsSync('public/videos')) fs.mkdirSync('public/videos', { recursive: true });

async function downloadFile(fileUrl, outputPath) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(fileUrl);
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        };

        const file = fs.createWriteStream(outputPath);
        https.get(options, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                downloadFile(res.headers.location, outputPath).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download ${fileUrl}: ${res.statusCode}`));
                return;
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(outputPath, () => reject(err));
        });
    });
}

function getSafeFileName(str) {
    return str.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

async function main() {
    let modified = false;
    for (const img of data.images) {
        if (img.imageUrl && img.imageUrl.startsWith('http')) {
            const ext = path.extname(new URL(img.imageUrl).pathname) || '.jpg';
            const localFileName = `${img.id}${ext}`;
            const localPath = `public/images/${localFileName}`;
            console.log(`Downloading ${img.imageUrl} to ${localPath}`);
            try {
                await downloadFile(img.imageUrl, localPath);
                img.imageUrl = `/images/${localFileName}`;
                modified = true;
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    // Download project videos
    for (const proj of data.projects) {
        if (proj.videoUrl && proj.videoUrl.startsWith('http')) {
            const ext = path.extname(new URL(proj.videoUrl).pathname) || '.mp4';
            const localFileName = `${proj.id}-video${ext}`;
            const localPath = `public/videos/${localFileName}`;
            console.log(`Downloading ${proj.videoUrl} to ${localPath}`);
            try {
                await downloadFile(proj.videoUrl, localPath);
                proj.videoUrl = `/videos/${localFileName}`;
                modified = true;
            } catch (e) {
                console.error(e.message);
            }
        }
    }

    if (modified) {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    }

    // Download global videos
    const videos = [
        { name: 'hero.mp4', url: 'https://raw.githubusercontent.com/Tino0rcg/videos/main/Animando_Imagen_a_Videohd.mp4?raw=true' },
        { name: 'services.mp4', url: 'https://raw.githubusercontent.com/Tino0rcg/videos-varios/main/V%C3%ADdeo%20sin%20t%C3%ADtulo%20%E2%80%90%20Hecho%20con%20Clipchamp.mp4?raw=true' },
        { name: 'services-new.3gp', url: 'https://raw.githubusercontent.com/Tino0rcg/videos-varios/main/TRIAL____________AdobeStock_524737599.3gp?raw=true' }
    ];

    for (const v of videos) {
        const localPath = `public/videos/${v.name}`;
        console.log(`Downloading ${v.url} to ${localPath}`);
        try {
            await downloadFile(v.url, localPath);
        } catch (e) {
            console.error(e.message);
        }
    }

    // Download global logo
    try {
        await downloadFile('https://raw.githubusercontent.com/Tino109/fotos-pagina-web12/main/logogoooddnashe.png', 'public/logo.png');
    } catch (e) {
        console.error(e.message);
    }
}

main().then(() => console.log('All downloads finished.')).catch(console.error);
