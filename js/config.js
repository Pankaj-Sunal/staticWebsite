// ------------------------------------------------------------------
// Edit this file to change contact details and gallery photos.
// Everything on the page reads from here, so you only change it once.
// ------------------------------------------------------------------
window.SITE_CONFIG = {
  name: "Green Acres Farmhouse",

  // Phone in international format, digits only for WhatsApp (no +, spaces or dashes)
  phoneDisplay: "+91 98765 43210",
  phoneTel: "+919876543210",
  whatsappNumber: "919876543210",
  whatsappDefaultMessage: "Hi! I'd like to enquire about a stay at Green Acres Farmhouse.",

  email: "stay@example.com",

  address: "Village Road, Near Lake View, Your City, State 000000",
  // Get this from Google Maps > Share > Embed a map > copy the src="..." URL
  mapEmbedUrl:
    "https://www.google.com/maps?q=India&output=embed",

  // Gallery: replace `src` with your own photos, e.g. "images/pool-1.jpg"
  // category must match one of the filter buttons: rooms, outdoor, pool, dining
  gallery: [
    { src: "https://picsum.photos/seed/farm1/1200/800", alt: "Farmhouse front view", category: "outdoor" },
    { src: "https://picsum.photos/seed/farm2/1200/800", alt: "Master bedroom", category: "rooms" },
    { src: "https://picsum.photos/seed/farm3/1200/800", alt: "Swimming pool", category: "pool" },
    { src: "https://picsum.photos/seed/farm4/1200/800", alt: "Garden lawn", category: "outdoor" },
    { src: "https://picsum.photos/seed/farm5/1200/800", alt: "Dining area", category: "dining" },
    { src: "https://picsum.photos/seed/farm6/1200/800", alt: "Second bedroom", category: "rooms" },
    { src: "https://picsum.photos/seed/farm7/1200/800", alt: "Pool at sunset", category: "pool" },
    { src: "https://picsum.photos/seed/farm8/1200/800", alt: "Bonfire area", category: "outdoor" },
    { src: "https://picsum.photos/seed/farm9/1200/800", alt: "Barbecue setup", category: "dining" },
    { src: "https://picsum.photos/seed/farm10/1200/800", alt: "Living room", category: "rooms" },
    { src: "https://picsum.photos/seed/farm11/1200/800", alt: "Orchard walk", category: "outdoor" },
    { src: "https://picsum.photos/seed/farm12/1200/800", alt: "Poolside seating", category: "pool" },
  ],
};
