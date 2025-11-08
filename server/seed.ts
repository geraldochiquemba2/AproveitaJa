import { storage } from "./storage";

async function seed() {
  try {
    console.log("Seeding database...");
    
    const existingAdmin = await storage.getUserByPhone("9123456789");
    if (!existingAdmin) {
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
    } else {
      console.log("Admin user already exists.");
    }

    const existingVendor = await storage.getUserByPhone("9999999991");
    let vendor;
    
    if (!existingVendor) {
      vendor = await storage.createUser({
        phone: "9999999991",
        password: "vendor123",
        name: "Manuel Santos",
        role: "vendor",
      });

      console.log("Vendor user created successfully:", {
        id: vendor.id,
        phone: vendor.phone,
        name: vendor.name,
        role: vendor.role,
      });
    } else {
      vendor = existingVendor;
      console.log("Vendor user already exists.");
    }

    const existingStores = await storage.getStoresByUserId(vendor.id);
    if (existingStores.length > 0) {
      console.log(`Stores already exist for vendor ${vendor.phone}, skipping store and product creation.`);
      process.exit(0);
      return;
    }

    const stores = [
      {
        storeName: "Supermercado Luanda Central",
        supervisorPhone: "9999999991",
        province: "Luanda",
        municipality: "Luanda",
        address: "Avenida 4 de Fevereiro, 123",
        latitude: "-8.8390",
        longitude: "13.2894",
      },
      {
        storeName: "Mercearia Viana",
        supervisorPhone: "9999999991",
        province: "Luanda",
        municipality: "Viana",
        address: "Rua Principal de Viana, 45",
        latitude: "-8.8925",
        longitude: "13.3761",
      },
      {
        storeName: "Minimercado Cacuaco",
        supervisorPhone: "9999999991",
        province: "Luanda",
        municipality: "Cacuaco",
        address: "Estrada de Cacuaco, 67",
        latitude: "-8.7773",
        longitude: "13.3703",
      },
      {
        storeName: "Supermercado Talatona",
        supervisorPhone: "9999999991",
        province: "Luanda",
        municipality: "Talatona",
        address: "Avenida Talatona, Edifício Comercial 2",
        latitude: "-8.9532",
        longitude: "13.1856",
      },
      {
        storeName: "Loja de Conveniência Kilamba",
        supervisorPhone: "9999999991",
        province: "Luanda",
        municipality: "Belas",
        address: "Kilamba Kiaxi, Quarteirão K, Loja 12",
        latitude: "-8.9876",
        longitude: "13.2345",
      },
    ];

    console.log("Creating stores...");
    const createdStores = [];
    for (const storeData of stores) {
      const store = await storage.createStore({
        userId: vendor.id,
        ...storeData,
      });
      createdStores.push(store);
      console.log(`Store created: ${store.storeName}`);
    }

    const productTemplates = [
      {
        name: "Pão Fresco Integral",
        originalPrice: "500",
        discountedPrice: "250",
        imageUrl: "/assets/stock_images/fresh_bread_loaves_b_73b0a02b.jpg",
        stockQuantity: "50",
        daysUntilExpiration: 2,
      },
      {
        name: "Pão Francês",
        originalPrice: "300",
        discountedPrice: "150",
        imageUrl: "/assets/stock_images/fresh_bread_loaves_b_21d80b46.jpg",
        stockQuantity: "80",
        daysUntilExpiration: 1,
      },
      {
        name: "Frutas Frescas Sortidas",
        originalPrice: "2000",
        discountedPrice: "1000",
        imageUrl: "/assets/stock_images/fresh_fruits_vegetab_a0471eb2.jpg",
        stockQuantity: "30",
        daysUntilExpiration: 3,
      },
      {
        name: "Vegetais Frescos do Dia",
        originalPrice: "1500",
        discountedPrice: "750",
        imageUrl: "/assets/stock_images/fresh_fruits_vegetab_b624c8c9.jpg",
        stockQuantity: "40",
        daysUntilExpiration: 2,
      },
      {
        name: "Salada Mista",
        originalPrice: "1200",
        discountedPrice: "600",
        imageUrl: "/assets/stock_images/fresh_fruits_vegetab_74d08584.jpg",
        stockQuantity: "25",
        daysUntilExpiration: 1,
      },
      {
        name: "Leite Fresco 1L",
        originalPrice: "800",
        discountedPrice: "400",
        imageUrl: "/assets/stock_images/dairy_products_milk__b25d2d49.jpg",
        stockQuantity: "60",
        daysUntilExpiration: 4,
      },
      {
        name: "Iogurte Natural Pack 4",
        originalPrice: "1000",
        discountedPrice: "500",
        imageUrl: "/assets/stock_images/dairy_products_milk__f5fdc0ec.jpg",
        stockQuantity: "45",
        daysUntilExpiration: 5,
      },
      {
        name: "Queijo Fresco 200g",
        originalPrice: "1500",
        discountedPrice: "750",
        imageUrl: "/assets/stock_images/dairy_products_milk__98ca8cb9.jpg",
        stockQuantity: "35",
        daysUntilExpiration: 6,
      },
      {
        name: "Frango Fresco",
        originalPrice: "3000",
        discountedPrice: "1500",
        imageUrl: "/assets/stock_images/fresh_meat_chicken_b_4e2c28d5.jpg",
        stockQuantity: "20",
        daysUntilExpiration: 2,
      },
      {
        name: "Carne de Vaca",
        originalPrice: "4500",
        discountedPrice: "2250",
        imageUrl: "/assets/stock_images/fresh_meat_chicken_b_30a4ef66.jpg",
        stockQuantity: "15",
        daysUntilExpiration: 2,
      },
      {
        name: "Produtos Embalados Sortidos",
        originalPrice: "2500",
        discountedPrice: "1250",
        imageUrl: "/assets/stock_images/packaged_grocery_foo_b20b2387.jpg",
        stockQuantity: "55",
        daysUntilExpiration: 7,
      },
      {
        name: "Pack Mercearia Básica",
        originalPrice: "3500",
        discountedPrice: "1750",
        imageUrl: "/assets/stock_images/packaged_grocery_foo_a39ae6e7.jpg",
        stockQuantity: "40",
        daysUntilExpiration: 10,
      },
      {
        name: "Bolo Chocolate",
        originalPrice: "2000",
        discountedPrice: "1000",
        imageUrl: "/assets/stock_images/desserts_cakes_pastr_88807911.jpg",
        stockQuantity: "12",
        daysUntilExpiration: 1,
      },
      {
        name: "Doces Sortidos",
        originalPrice: "1800",
        discountedPrice: "900",
        imageUrl: "/assets/stock_images/desserts_cakes_pastr_dd0177c5.jpg",
        stockQuantity: "18",
        daysUntilExpiration: 2,
      },
      {
        name: "Sumo Natural 1L",
        originalPrice: "1200",
        discountedPrice: "600",
        imageUrl: "/assets/stock_images/beverages_juice_bott_ea9c6a65.jpg",
        stockQuantity: "50",
        daysUntilExpiration: 5,
      },
      {
        name: "Pack Bebidas 6un",
        originalPrice: "3000",
        discountedPrice: "1500",
        imageUrl: "/assets/stock_images/beverages_juice_bott_03be81dd.jpg",
        stockQuantity: "30",
        daysUntilExpiration: 8,
      },
    ];

    console.log("Creating products...");
    let totalProductsCreated = 0;
    
    for (const store of createdStores) {
      const productsPerStore = Math.floor(Math.random() * 5) + 8;
      const shuffled = [...productTemplates].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < productsPerStore && i < shuffled.length; i++) {
        const template = shuffled[i];
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + template.daysUntilExpiration);
        
        await storage.createProduct({
          storeId: store.id,
          name: template.name,
          originalPrice: template.originalPrice,
          discountedPrice: template.discountedPrice,
          expirationDate: expirationDate,
          imageUrl: template.imageUrl,
          province: store.province,
          municipality: store.municipality,
          supervisorPhone: store.supervisorPhone,
          stockQuantity: template.stockQuantity,
        });
        
        totalProductsCreated++;
      }
      
      console.log(`Created ${productsPerStore} products for ${store.storeName}`);
    }

    console.log(`\nSeeding completed successfully!`);
    console.log(`- Created ${createdStores.length} stores`);
    console.log(`- Created ${totalProductsCreated} products`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
