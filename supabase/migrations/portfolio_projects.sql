-- Insert 33 realistic portfolio projects for Seranex
-- Mix of different business types common in Sri Lanka

INSERT INTO projects (title, category, description, tech_stack, status, featured, image_url) VALUES
-- Featured Projects (already on homepage)
('The Heritage Colombo', 'Restaurant & Catering', 'Fine dining restaurant website with online reservations and menu showcase', ARRAY['React', 'Next.js', 'Tailwind'], 'Live', true, '/artifacts/portfolio_restaurant.png'),
('Glamour Studio', 'Beauty & Wellness', 'Modern salon website with appointment booking and service catalog', ARRAY['React', 'Next.js', 'Stripe'], 'Live', true, '/artifacts/portfolio_salon.png'),
('Urban Threads', 'Fashion E-commerce', 'Clothing e-commerce platform with shopping cart and payment integration', ARRAY['Next.js', 'Stripe', 'PostgreSQL'], 'Live', true, '/artifacts/portfolio_shop.png'),

-- Restaurants & Cafes
('Spice Garden Kandy', 'Restaurant', 'Traditional Sri Lankan restaurant with digital menu and table reservations', ARRAY['WordPress', 'WooCommerce'], 'Live', false, '/logos/zx-white.png'),
('Cafe Mocha Colombo 7', 'Cafe & Bakery', 'Trendy cafe website with online ordering and delivery tracking', ARRAY['React', 'Node.js'], 'Live', false, '/logos/zx-white.png'),
('The Sea View Galle', 'Restaurant', 'Beachfront restaurant website with event booking system', ARRAY['Next.js', 'Supabase'], 'Live', false, '/logos/zx-white.png'),

-- E-commerce
('TechMart Lanka', 'E-commerce', 'Electronics online store with advanced filtering and payment gateway', ARRAY['Next.js', 'Stripe', 'MongoDB'], 'Live', false, '/logos/zx-white.png'),
('Ceylon Spice Exports', 'E-commerce', 'Spice export business website with international shipping integration', ARRAY['WooCommerce', 'PayPal'], 'Live', false, '/logos/zx-white.png'),
('Kids Paradise', 'E-commerce', 'Children''s clothing and toys e-commerce platform', ARRAY['Shopify', 'React'], 'Live', false, '/logos/zx-white.png'),
('Furniture Depot', 'E-commerce', 'Online furniture store with 3D product views and AR features', ARRAY['Three.js', 'React'], 'Live', false, '/logos/zx-white.png'),
('Book Haven Nugegoda', 'E-commerce', 'Online bookstore with inventory management system', ARRAY['Laravel', 'MySQL'], 'Live', false, '/logos/zx-white.png'),

-- Healthcare
('City Medical Center', 'Healthcare', 'Medical clinic website with online appointment scheduling', ARRAY['React', 'Firebase'], 'Live', false, '/logos/zx-white.png'),
('Wellness Pharmacy', 'Healthcare', 'Pharmacy website with prescription upload and home delivery', ARRAY['Next.js', 'PostgreSQL'], 'Live', false, '/logos/zx-white.png'),
('Dental Care Plus', 'Healthcare', 'Dental clinic website with treatment catalog and booking system', ARRAY['WordPress', 'Custom PHP'], 'Live', false, '/logos/zx-white.png'),

-- Education
('Smart Kids Academy', 'Education', 'Preschool website with parent portal and online enrollment', ARRAY['React', 'Node.js'], 'Live', false, '/logos/zx-white.png'),
('English Masters Institute', 'Education', 'Language institute website with course management system', ARRAY['Next.js', 'Stripe'],  'Live', false, '/logos/zx-white.png'),
('Tech Bootcamp Sri Lanka', 'Education', 'Coding bootcamp platform with video lessons and assignments', ARRAY['React', 'Firebase', 'Vimeo'], 'Live', false, '/logos/zx-white.png'),

-- Real Estate
('Prime Properties Colombo', 'Real Estate', 'Property listing website with advanced search and virtual tours', ARRAY['Next.js', 'Mapbox'], 'Live', false, '/logos/zx-white.png'),
('Sunset Apartments', 'Real Estate', 'Luxury apartment complex website with unit availability tracker', ARRAY['React', 'PostgreSQL'], 'Live', false, '/logos/zx-white.png'),

-- Automotive
('Auto Care Center', 'Automotive', 'Car service center website with online booking and service history', ARRAY['Laravel', 'MySQL'], 'Live', false, '/logos/zx-white.png'),
('Wheels Lanka', 'Automotive', 'Used car dealership website with inventory management', ARRAY['Next.js', 'Supabase'], 'Live', false, '/logos/zx-white.png'),

-- Hotels & Tourism
('Beach Resort Bentota', 'Hospitality', 'Beach resort website with room booking and package deals', ARRAY['Next.js', 'Stripe'], 'Live', false, '/logos/zx-white.png'),
('Adventure Tours Lanka', 'Tourism', 'Tour operator website with itinerary builder and online payments', ARRAY['React', 'PayPal'], 'Live', false, '/logos/zx-white.png'),
('Hill Country Guest House', 'Hospitality', 'Boutique hotel website with availability calendar', ARRAY['WordPress', 'Booking Plugin'], 'Live', false, '/logos/zx-white.png'),

-- Professional Services
('Legal Associates', 'Law Firm', 'Law firm website with case study showcase and client portal', ARRAY['Next.js', 'Auth0'], 'Live', false, '/logos/zx-white.png'),
('Insight Accounting', 'Accounting', 'Accounting firm website with service calculator and consultation booking', ARRAY['React', 'Node.js'], 'Live', false, '/logos/zx-white.png'),
('Creative Hub Studios', 'Marketing Agency', 'Digital marketing agency portfolio with project showcase', ARRAY['Next.js', 'Contentful'], 'Live', false, '/logos/zx-white.png'),

-- Fitness & Sports
('FitZone Gym', 'Fitness', 'Gym website with membership plans and class schedules', ARRAY['React', 'Stripe'], 'Live', false, '/logos/zx-white.png'),
('Yoga Sanctuary', 'Wellness', 'Yoga studio website with online class booking and instructor profiles', ARRAY['WordPress', 'Custom Theme'], 'Live', false, '/logos/zx-white.png'),

-- Fashion & Beauty
('Bridal Elegance', 'Fashion', 'Bridal boutique website with dress catalog and appointment system', ARRAY['Next.js', 'Cloudinary'], 'Live', false, '/logos/zx-white.png'),
('Gents Salon Colombo', 'Beauty & Grooming', 'Men''s salon website with service menu and online booking', ARRAY['React', 'Firebase'], 'Live', false, '/logos/zx-white.png'),

-- Specialty Businesses
('Pet Paradise Veterinary', 'Veterinary', 'Veterinary clinic website with pet health records portal', ARRAY['React', 'PostgreSQL'], 'Live', false, '/logos/zx-white.png'),
('Green Thumb Nursery', 'Gardening', 'Plant nursery e-commerce with care guides and delivery tracking', ARRAY['WooCommerce', 'Custom Plugin'], 'Live', false, '/logos/zx-white.png'),
('Event Magic Lanka', 'Event Planning', 'Event planning company website with package builder and gallery', ARRAY['Next.js', 'Cloudinary'], 'Live', false, '/logos/zx-white.png')

ON CONFLICT (title) DO NOTHING;
