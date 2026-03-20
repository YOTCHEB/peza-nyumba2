import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sample users with phone-based auth
const sampleUsers = [
  {
    email: 'landlord@test.com',
    phone: '+265888123456',
    password: 'password',
    full_name: 'James Banda',
    role: 'landlord',
  },
  {
    email: 'tenant@test.com',
    phone: '+265999234567',
    password: 'password',
    full_name: 'Grace Phiri',
    role: 'tenant',
  },
  {
    email: 'admin@test.com',
    phone: '+265888000000',
    password: 'admin123',
    full_name: 'Admin User',
    role: 'admin',
  },
  {
    email: 'patrick.moyo@test.com',
    phone: '+265884345678',
    password: 'password',
    full_name: 'Patrick Moyo',
    role: 'landlord',
  },
  {
    email: 'mercy.chirwa@test.com',
    phone: '+265991456789',
    password: 'password',
    full_name: 'Mercy Chirwa',
    role: 'landlord',
  },
  {
    email: 'agnes.nkhoma@test.com',
    phone: '+265995678901',
    password: 'password',
    full_name: 'Agnes Nkhoma',
    role: 'landlord',
  },
];

// All 16 sample listings from data.ts
const sampleListings = [
  {
    title: 'Spacious 2 Bedroom in Area 47',
    property_type: 'House',
    bedrooms: 2,
    rent_price: 150000,
    city: 'Lilongwe',
    area: 'Area 47',
    description: 'A well-maintained 2-bedroom house in the heart of Area 47. Close to shops, schools, and public transport. Spacious living room and a nice backyard. Ideal for a small family or working professionals.',
    amenities: ['Water', 'Electricity', 'Flush Toilet', 'Bathroom', 'Kitchen', 'Parking'],
    images: ['/images/property-house-2bed.jpg'],
    contact_phone: '+265888123456',
    contact_whatsapp: '+265888123456',
    status: 'Available',
    is_approved: true,
    is_featured: true,
    latitude: -13.9526,
    longitude: 33.7541,
  },
  {
    title: 'Single Room in Namiwawa',
    property_type: 'Room',
    bedrooms: 1,
    rent_price: 35000,
    city: 'Lilongwe',
    area: 'Namiwawa',
    description: 'Affordable single room for students or single working professionals. Shared bathroom and kitchen. Very close to Queen Elizabeth Central Hospital and the city centre.',
    amenities: ['Electricity', 'Water', 'Pit Toilet', 'Bathroom'],
    images: ['/images/property-room.jpg'],
    contact_phone: '+265999234567',
    contact_whatsapp: '+265999234567',
    status: 'Available',
    is_approved: true,
    is_featured: false,
    latitude: -15.7867,
    longitude: 35.0068,
  },
  {
    title: '3 Bedroom House in Area 43',
    property_type: 'House',
    bedrooms: 3,
    rent_price: 250000,
    city: 'Lilongwe',
    area: 'Area 43',
    description: 'Beautiful 3-bedroom house with modern finishes in Area 43. Tiled floors throughout, large kitchen, and a secure compound with a wall fence. Perfect for families.',
    amenities: ['Water', 'Electricity', 'Flush Toilet', 'Bathroom', 'Kitchen', 'Parking', 'Wall Fence', 'Tiled Floors'],
    images: ['/images/property-house-3bed.jpg'],
    contact_phone: '+265884345678',
    contact_whatsapp: '+265884345678',
    status: 'Available',
    is_approved: true,
    is_featured: true,
    latitude: -13.9726,
    longitude: 33.7841,
  },
  {
    title: 'Bedsitter near Bunda Turnoff',
    property_type: 'Bedsitter',
    bedrooms: 1,
    rent_price: 80000,
    city: 'Lilongwe',
    area: 'Bunda Turnoff',
    description: 'Self-contained bedsitter with its own bathroom and small kitchenette. Good for LUANAR students or single professionals. Located near Bunda Turnoff with easy access to the city.',
    amenities: ['Water', 'Electricity', 'Flush Toilet', 'Bathroom', 'Kitchen'],
    images: ['/images/property-bedsitter.jpg'],
    contact_phone: '+265991456789',
    contact_whatsapp: '+265991456789',
    status: 'Available',
    is_approved: true,
    is_featured: false,
    latitude: -13.9826,
    longitude: 33.7641,
  },
  {
    title: 'Shop Space in Limbe Market',
    property_type: 'Shop/Office',
    bedrooms: 0,
    rent_price: 100000,
    city: 'Zomba',
    area: 'Limbe',
    description: 'Prime shop space in Limbe Market area. High foot traffic, perfect for retail business. Includes electricity and water. Ground floor with good visibility from the main road.',
    amenities: ['Electricity', 'Water'],
    images: ['/images/property-shop.jpg'],
    contact_phone: '+265888567890',
    contact_whatsapp: '+265888567890',
    status: 'Available',
    is_approved: true,
    is_featured: false,
    latitude: -15.8167,
    longitude: 35.0568,
  },
  {
    title: 'Modern 2 Bedroom Apartment in Mapanga',
    property_type: 'Apartment',
    bedrooms: 2,
    rent_price: 180000,
    city: 'Zomba',
    area: 'Mapanga',
    description: 'Newly built 2-bedroom apartment in a quiet area of Mapanga. Modern kitchen, tiled floors, and ample parking. Security guard on site 24/7.',
    amenities: ['Water', 'Electricity', 'Flush Toilet', 'Bathroom', 'Kitchen', 'Parking', 'Tiled Floors'],
    images: ['/images/property-apartment.jpg'],
    contact_phone: '+265995678901',
    contact_whatsapp: '+265995678901',
    status: 'Available',
    is_approved: true,
    is_featured: true,
    latitude: -15.7467,
    longitude: 35.0368,
  },
  {
    title: 'Student Room near UNIMA Zomba',
    property_type: 'Room',
    bedrooms: 1,
    rent_price: 30000,
    city: 'Zomba',
    area: 'University Area',
    description: 'Cozy room near UNIMA Zomba campus. Walking distance to Chancellor College. Shared bathroom. Quiet neighbourhood good for studying. Includes water and electricity.',
    amenities: ['Water', 'Electricity', 'Pit Toilet', 'Bathroom'],
    images: ['/images/property-room.jpg'],
    contact_phone: '+265881789012',
    contact_whatsapp: '+265881789012',
    status: 'Available',
    is_approved: true,
    is_featured: false,
    latitude: -15.3833,
    longitude: 35.3188,
  },
  {
    title: '4 Bedroom House in Area 25',
    property_type: 'House',
    bedrooms: 4,
    rent_price: 350000,
    city: 'Lilongwe',
    area: 'Area 25',
    description: 'Spacious 4-bedroom house in Area 25 with a large garden, servant quarters, and double garage. High-end finishes throughout. Ideal for diplomats or large families.',
    amenities: ['Water', 'Electricity', 'Flush Toilet', 'Bathroom', 'Kitchen', 'Parking', 'Wall Fence', 'Tiled Floors'],
    images: ['/images/property-house-4bed.jpg'],
    contact_phone: '+265999890123',
    contact_whatsapp: '+265999890123',
    status: 'Available',
    is_approved: true,
    is_featured: true,
    latitude: -13.9426,
    longitude: 33.8041,
  },
  {
    title: 'Student Room near Chancellor College',
    property_type: 'Room',
    bedrooms: 1,
    rent_price: 25000,
    city: 'Zomba',
    area: 'Chancellor College',
    description: 'Affordable room for Chancellor College (UNIMA) students. Just 5 minutes walk from campus. Shared facilities. Quiet study environment. Many students in the area.',
    amenities: ['Electricity', 'Water', 'Pit Toilet'],
    images: ['/images/property-room.jpg'],
    contact_phone: '+265884901234',
    contact_whatsapp: '+265884901234',
    status: 'Available',
    is_approved: true,
    is_featured: true,
    latitude: -15.3933,
    longitude: 35.3288,
  },
  {
    title: 'Office Space in City Centre',
    property_type: 'Shop/Office',
    bedrooms: 0,
    rent_price: 200000,
    city: 'Lilongwe',
    area: 'City Centre',
    description: 'Professional office space in Lilongwe City Centre. 3 rooms with reception area. Air conditioned. Suitable for NGOs, consultancy firms, or business offices.',
    amenities: ['Electricity', 'Water', 'Flush Toilet', 'Parking'],
    images: ['/images/property-office.jpg'],
    contact_phone: '+265991012345',
    contact_whatsapp: '+265991012345',
    status: 'Available',
    is_approved: true,
    is_featured: false,
    latitude: -13.9626,
    longitude: 33.7741,
  },
  {
    title: '2 Bedroom in Chirimba, Zomba',
    property_type: 'House',
    bedrooms: 2,
    rent_price: 120000,
    city: 'Zomba',
    area: 'Chirimba',
    description: 'Neat 2-bedroom house in Chirimba. Recently renovated with new plumbing and electrical. Close to shops and public transport. Good for small families.',
    amenities: ['Water', 'Electricity', 'Flush Toilet', 'Bathroom', 'Kitchen', 'Wall Fence'],
    images: ['/images/property-house-2bed.jpg'],
    contact_phone: '+265888112233',
    contact_whatsapp: '+265888112233',
    status: 'Available',
    is_approved: true,
    is_featured: false,
    latitude: -15.3633,
    longitude: 35.2988,
  },
  {
    title: 'Bedsitter in Area 18, Lilongwe',
    property_type: 'Bedsitter',
    bedrooms: 1,
    rent_price: 65000,
    city: 'Lilongwe',
    area: 'Area 18',
    description: 'Compact self-contained bedsitter in Area 18. Includes bathroom and cooking space. Ideal for single working professionals or UNIMA students. Close to Old Town.',
    amenities: ['Water', 'Electricity', 'Flush Toilet', 'Bathroom', 'Kitchen'],
    images: ['/images/property-bedsitter.jpg'],
    contact_phone: '+265995223344',
    contact_whatsapp: '+265995223344',
    status: 'Taken',
    is_approved: true,
    is_featured: false,
    latitude: -13.9326,
    longitude: 33.7841,
  },
  {
    title: 'Affordable Room in Dzaleka Camp',
    property_type: 'Room',
    bedrooms: 1,
    rent_price: 20000,
    city: 'Dzaleka',
    area: 'Dzaleka Main',
    description: 'Simple but clean room available in Dzaleka Refugee Camp. Close to market and community centre. Water and electricity included. Ideal for individuals or couples.',
    amenities: ['Water', 'Electricity', 'Pit Toilet'],
    images: ['/images/property-room.jpg'],
    contact_phone: '+265881334455',
    contact_whatsapp: '+265881334455',
    status: 'Available',
    is_approved: true,
    is_featured: false,
    latitude: -13.7833,
    longitude: 33.9833,
  },
  {
    title: '2 Bedroom House in Dzaleka',
    property_type: 'House',
    bedrooms: 2,
    rent_price: 45000,
    city: 'Dzaleka',
    area: 'Dzaleka Extension',
    description: 'Newly built 2-bedroom house in Dzaleka extension area. Has a small compound. Water from borehole. Electricity connected. Good for small families.',
    amenities: ['Water', 'Electricity', 'Pit Toilet', 'Bathroom', 'Kitchen'],
    images: ['/images/property-house-2bed.jpg'],
    contact_phone: '+265999445566',
    contact_whatsapp: '+265999445566',
    status: 'Available',
    is_approved: true,
    is_featured: true,
    latitude: -13.7883,
    longitude: 33.9883,
  },
  {
    title: 'Student Bedsitter near Zomba Plateau',
    property_type: 'Bedsitter',
    bedrooms: 1,
    rent_price: 40000,
    city: 'Zomba',
    area: 'Zomba Town',
    description: 'Self-contained bedsitter near Zomba Plateau. Perfect for UNIMA students and lecturers. Walking distance to Chancellor College. Quiet environment for studying.',
    amenities: ['Water', 'Electricity', 'Flush Toilet', 'Bathroom', 'Kitchen'],
    images: ['/images/property-bedsitter.jpg'],
    contact_phone: '+265884556677',
    contact_whatsapp: '+265884556677',
    status: 'Available',
    is_approved: true,
    is_featured: false,
    latitude: -15.3733,
    longitude: 35.3088,
  },
  {
    title: 'Student Room near LUANAR Bunda',
    property_type: 'Room',
    bedrooms: 1,
    rent_price: 28000,
    city: 'Lilongwe',
    area: 'Bunda Campus',
    description: 'Affordable room walking distance from LUANAR Bunda Campus. Many students in the area. Shared facilities. Landlord is helpful and student-friendly.',
    amenities: ['Water', 'Electricity', 'Pit Toilet', 'Bathroom'],
    images: ['/images/property-room.jpg'],
    contact_phone: '+265991667788',
    contact_whatsapp: '+265991667788',
    status: 'Available',
    is_approved: true,
    is_featured: false,
    latitude: -14.1733,
    longitude: 33.7688,
  },
];

async function seed() {
  try {
    console.log('🌱 Starting database seed...');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await supabase.from('favorites').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('reports').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('listings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Get all existing users and delete their auth accounts first
    const { data: existingUsers } = await supabase.from('users').select('auth_id, email');
    if (existingUsers) {
      console.log('🗑️  Deleting existing auth users...');
      for (const user of existingUsers) {
        if (user.auth_id) {
          try {
            await supabase.auth.admin.deleteUser(user.auth_id);
          } catch (err: any) {
            // Ignore errors
          }
        }
      }
    }
    
    await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Create users
    console.log('👥 Creating users...');
    const userIds: Record<string, string> = {};

    for (const userData of sampleUsers) {
      try {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
          email_confirm: true,
          user_metadata: {
            full_name: userData.full_name,
            phone: userData.phone,
            role: userData.role,
          },
        });

        if (authError) {
          console.error(`Error creating auth user ${userData.email}:`, authError.message);
          continue;
        }

        // Create public user
        const { data: user, error: userError } = await supabase
          .from('users')
          .insert({
            auth_id: authData.user.id,
            full_name: userData.full_name,
            phone: userData.phone,
            email: userData.email,
            role: userData.role,
          })
          .select()
          .single();

        if (userError) {
          console.error(`Error creating user ${userData.email}:`, userError.message);
          // Rollback auth user
          await supabase.auth.admin.deleteUser(authData.user.id);
          continue;
        }

        userIds[userData.phone] = user.id;
        console.log(`✓ Created user: ${userData.full_name} (${userData.phone})`);
      } catch (err: any) {
        console.error(`Error with user ${userData.email}:`, err.message);
      }
    }

    // Create listings
    console.log('🏠 Creating listings...');
    const landlordId = userIds['+265888123456'];

    if (!landlordId) {
      console.error('Landlord user not found!');
      return;
    }

    for (const listingData of sampleListings) {
      try {
        const { data: listing, error } = await supabase
          .from('listings')
          .insert({
            landlord_id: landlordId,
            ...listingData,
          })
          .select()
          .single();

        if (error) {
          console.error(`Error creating listing "${listingData.title}":`, error.message);
          continue;
        }

        console.log(`✓ Created listing: ${listingData.title}`);
      } catch (err: any) {
        console.error(`Error with listing "${listingData.title}":`, err.message);
      }
    }

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Users created: ${Object.keys(userIds).length}`);
    console.log(`   - Listings created: ${sampleListings.length}`);
    console.log(`\n🔐 Demo Login Credentials:`);
    console.log(`   Landlord: +265888123456 / password`);
    console.log(`   Tenant: +265999234567 / password`);
    console.log(`   Admin: +265888000000 / admin123`);
  } catch (error: any) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
