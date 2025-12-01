const BIN_ID = process.env.NEXT_PUBLIC_BIN_ID;
const MASTER_KEY = process.env.NEXT_PUBLIC_MASTER_KEY;
const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY;

// --- 1. FETCH DATA (READ) ---
export async function getSiteData() {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': MASTER_KEY
      },
      next: { revalidate: 0 } // Always get fresh data
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    return data.record;
  } catch (error) {
    console.error("Database Error:", error);
    // Return default structure if empty
    return {
      hero: { title: "IDEAS, ENGINEERED.", subtitle: "We build scalable digital infrastructure." },
      portfolio: [],
      blogs: []
    };
  }
}

// --- 2. UPDATE DATA (WRITE) ---
export async function updateSiteData(newData) {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': MASTER_KEY
    },
    body: JSON.stringify(newData)
  });
  return res.json();
}

// --- 3. UPLOAD IMAGE (ImgBB) ---
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: 'POST',
    body: formData
  });
  
  const data = await res.json();
  return data.data.url; // Returns the public image URL
}