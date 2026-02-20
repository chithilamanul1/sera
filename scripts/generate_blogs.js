const fs = require('fs');

const topics = [
    { cat: 'AI', title: "How AI is Revolutionizing Businesses in Colombo", kw: ["AI Colombo", "Business Automation Sri Lanka", "Smart Office"] },
    { cat: 'Web', title: "Why Your Gampaha Business Needs a Next.js Website", kw: ["Web Development Gampaha", "Next.js Sri Lanka", "Modern Web Design"] },
    { cat: 'Mobile', title: "The Future of Mobile Apps in Kandy's Tourism Sector", kw: ["Mobile Apps Kandy", "Tourism Tech Sri Lanka", "Travel Apps"] },
    { cat: 'Enterprise', title: "Scalable ERP Systems for Manufacturing in Seeduwa", kw: ["ERP Seeduwa", "Manufacturing Software", "Logistics Automation"] },
    { cat: 'AI', title: "The Ethics of Autonomous Agents in Global Markets", kw: ["AI Ethics", "Autonomous Agents", "Global Tech Trends"] },
    { cat: 'Web', title: "Optimizing Web Vitals for Better SEO in Sri Lanka", kw: ["SEO Sri Lanka", "Web Vitals", "Faster Websites"] },
    { cat: 'Mobile', title: "React Native vs Flutter: What should Sri Lankan Startups Choose?", kw: ["React Native Sri Lanka", "Flutter Development", "Startup Tech Stack"] },
    { cat: 'Enterprise', title: "Why Digital Sovereignty is the next big thing for Banks", kw: ["Digital Sovereignty", "Banking Software", "Data Security"] },
    { cat: 'AI', title: "Predictive Analytics for Tea Exports in Sri Lanka", kw: ["Predictive Analytics", "Tea Industry Technology", "Data Science Sri Lanka"] },
    { cat: 'Web', title: "Building E-commerce Giants: A Guide for Negombo Photographers", kw: ["E-commerce Negombo", "Photography Portfolio", "Digital Sales"] },
];

const generatePosts = (count) => {
    const posts = [];
    for (let i = 0; i < count; i++) {
        const topic = topics[i % topics.length];
        const id = `extra-${i + 1}`;
        const date = new Date(Date.now() - (i * 86400000)).toISOString().split('T')[0];

        posts.push({
            id,
            title: `${topic.title} - Vol. ${Math.floor(i / 10) + 1}`,
            slug: `${topic.title.toLowerCase().replace(/ /g, '-')}-${i}`,
            excerpt: `Insightful analysis on ${topic.title.toLowerCase()} and its impact on the modern landscape.`,
            content: `## ${topic.title}\n\nThis is a detailed analysis of how digital transformation is changing the landscape for businesses focusing on ${topic.cat}. By leveraging elite architectures like Next.js and AI integration, companies can achieve 10x growth in record time.`,
            coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1715&auto=format&fit=crop",
            category: topic.cat,
            keywords: [...topic.kw, "Seranex", "Elite Engineering"],
            publishedAt: date,
            readTime: 5 + (i % 5)
        });
    }
    return posts;
};

const newPosts = generatePosts(50);
const filePath = 'e:/desktop/SeraNex Modern ui/lib/blog/posts.ts';
const currentFile = fs.readFileSync(filePath, 'utf8');

// Find the end of the array
const arrayEndIndex = currentFile.lastIndexOf('];');
const postsString = newPosts.map(p => JSON.stringify(p, null, 4)).join(',\n');

const updatedFile = currentFile.slice(0, arrayEndIndex) + ',\n' + postsString + '\n' + currentFile.slice(arrayEndIndex);

fs.writeFileSync(filePath, updatedFile);
console.log("Successfully generated 50 SEO blog posts!");
