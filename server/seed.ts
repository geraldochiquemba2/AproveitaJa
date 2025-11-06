import { storage } from "./storage";

async function seed() {
  try {
    console.log("Seeding database...");
    
    const existingAdmin = await storage.getUserByPhone("9123456789");
    if (existingAdmin) {
      console.log("Admin user already exists, skipping seed.");
      return;
    }

    const admin = await storage.createUser({
      phone: "9123456789",
      password: "123456789",
      name: "Admin",
      role: "admin",
    });

    console.log("Admin user created successfully:", {
      id: admin.id,
      phone: admin.phone,
      name: admin.name,
      role: admin.role,
    });
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
