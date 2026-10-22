# Green Acres Farmhouse – Static Website

A responsive one-page website for a farmhouse stay. It's built with plain HTML, Tailwind CSS (loaded from a CDN) and vanilla JavaScript, so there's **no build step**: what's in this folder is what gets hosted.

## Files

```
index.html      – the page (all sections and layout)
js/config.js    – EDIT THIS: name, phone, WhatsApp, email, address, map, gallery photos
js/main.js      – menu, gallery and lightbox, enquiry form logic
images/         – put your real photos here
CNAME.example   – rename to CNAME and put your domain in it once you buy one
.nojekyll       – tells GitHub Pages to serve files as-is
```

## Run locally

Open `index.html` in a browser, or run a tiny local server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Replace the placeholders

1. **Contact details**: edit `js/config.js` (`phoneDisplay`, `phoneTel`, `whatsappNumber`, `email`, `address`).
   - `whatsappNumber` is digits only, with the country code: `919876543210`.
2. **Photos**: copy your images into `images/` (for example `images/pool-1.jpg`) and change the `src` values in the `gallery` list in `js/config.js`.
   Also replace the hero and about images in `index.html` (search for `picsum.photos`).
   Resize photos to about 1600px wide and compress them (https://squoosh.app) so the page loads fast on mobile.
3. **Map**: in Google Maps, search your farmhouse, then go to **Share → Embed a map**, copy the URL inside `src="..."` and paste it as `mapEmbedUrl`.

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial farmhouse website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then on GitHub, open the repo and go to **Settings → Pages → Build and deployment**:
- Source: **Deploy from a branch**
- Branch: **main**, folder **/ (root)**, then click Save

After 1–2 minutes the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Connect your Cloudflare domain

Say your domain is `greenacresfarm.in`.

**1. Tell GitHub the domain.** Rename `CNAME.example` to `CNAME`, replace its content with your domain (one line, e.g. `greenacresfarm.in`) and push.
You can also set it under **Settings → Pages → Custom domain**.

**2. Add DNS records in Cloudflare** (Dashboard → your domain → **DNS → Records**):

| Type  | Name  | Content                    | Proxy status |
|-------|-------|----------------------------|--------------|
| A     | `@`   | `185.199.108.153`          | DNS only (grey cloud) |
| A     | `@`   | `185.199.109.153`          | DNS only |
| A     | `@`   | `185.199.110.153`          | DNS only |
| A     | `@`   | `185.199.111.153`          | DNS only |
| CNAME | `www` | `<your-username>.github.io`| DNS only |

Optional (IPv6): add AAAA records for `@` pointing to `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

**3. Wait for HTTPS.** Once GitHub shows "DNS check successful", tick **Enforce HTTPS** in Settings → Pages. The certificate can take up to 24 hours, but usually much less.

**4. (Optional) Turn the Cloudflare proxy on.** After HTTPS works, you can switch the records to **Proxied** (orange cloud) for Cloudflare caching. If you do, set **SSL/TLS → Overview** to **Full** (not Flexible), or you'll get a redirect loop.

**Recommended:** verify the domain in GitHub (**your profile Settings → Pages → Add a domain**). This adds a TXT record and stops anyone else from claiming your domain on GitHub Pages.

## Notes and next steps

- **Tailwind CDN**: the browser build is great for learning, but it compiles CSS in the visitor's browser. For a faster production site, later switch to the [Tailwind CLI](https://tailwindcss.com/docs/installation/tailwind-cli) and commit the generated CSS file.
- **Enquiry form**: there's no server, so the form opens WhatsApp or the visitor's email app with the details pre-filled. If you want form submissions delivered straight to your inbox, use a free service like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
- **Google listing**: add the site to [Google Search Console](https://search.google.com/search-console) and create a Google Business Profile so people can find the farmhouse.
