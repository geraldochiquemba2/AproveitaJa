import { type User, type InsertUser, type Product, type InsertProduct, type Store, type InsertStore, type Order, type InsertOrder, users, stores, products, orders } from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, and, gt, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export type OrderWithDetails = Order & {
  buyer: User;
  product: Product;
  store: Store;
};

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Stores
  getStore(id: string): Promise<Store | undefined>;
  getStoresByUserId(userId: string): Promise<Store[]>;
  createStore(store: InsertStore): Promise<Store>;
  
  // Products
  getProduct(id: string): Promise<Product | undefined>;
  getActiveProducts(): Promise<Product[]>;
  getProductsByStoreId(storeId: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined>;
  
  // Orders
  getOrder(id: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;
  getAllOrdersWithDetails(): Promise<OrderWithDetails[]>;
  getOrdersByBuyerId(buyerId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private stores: Map<string, Store>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.stores = new Map();
    this.products = new Map();
    this.orders = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.phone === phone);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = {
      ...insertUser,
      id,
      password: hashedPassword,
      role: insertUser.role ?? "buyer",
      address: insertUser.address ?? null,
      latitude: insertUser.latitude ?? null,
      longitude: insertUser.longitude ?? null,
    };
    this.users.set(id, user);
    return user;
  }

  // Stores
  async getStore(id: string): Promise<Store | undefined> {
    return this.stores.get(id);
  }

  async getStoresByUserId(userId: string): Promise<Store[]> {
    return Array.from(this.stores.values()).filter((store) => store.userId === userId);
  }

  async createStore(insertStore: InsertStore): Promise<Store> {
    const id = randomUUID();
    const store: Store = { 
      ...insertStore, 
      id,
      latitude: insertStore.latitude ?? null,
      longitude: insertStore.longitude ?? null,
    };
    this.stores.set(id, store);
    return store;
  }

  // Products
  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getActiveProducts(): Promise<Product[]> {
    const now = new Date();
    
    return Array.from(this.products.values()).filter(
      (product) => 
        product.isActive && 
        new Date(product.expirationDate) > now
    );
  }

  async getProductsByStoreId(storeId: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.storeId === storeId
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
      isActive: true,
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updated = { ...product, ...updates };
    this.products.set(id, updated);
    return updated;
  }

  // Orders
  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getAllOrdersWithDetails(): Promise<OrderWithDetails[]> {
    const allOrders = Array.from(this.orders.values());
    const ordersWithDetails: OrderWithDetails[] = [];

    for (const order of allOrders) {
      const buyer = await this.getUser(order.buyerId);
      const product = await this.getProduct(order.productId);
      const store = product ? await this.getStore(product.storeId) : undefined;

      if (buyer && product && store) {
        ordersWithDetails.push({
          ...order,
          buyer,
          product,
          store,
        });
      }
    }

    return ordersWithDetails;
  }

  async getOrdersByBuyerId(buyerId: string): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.buyerId === buyerId
    );
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      quantity: insertOrder.quantity ?? "1",
      deliveryAddress: insertOrder.deliveryAddress ?? null,
      deliveryLatitude: insertOrder.deliveryLatitude ?? null,
      deliveryLongitude: insertOrder.deliveryLongitude ?? null,
      status: "pending",
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updated = { ...order, status };
    this.orders.set(id, updated);
    return updated;
  }
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const result = await db.insert(users).values({
      ...insertUser,
      password: hashedPassword,
    }).returning();
    return result[0];
  }

  // Stores
  async getStore(id: string): Promise<Store | undefined> {
    const result = await db.select().from(stores).where(eq(stores.id, id)).limit(1);
    return result[0];
  }

  async getStoresByUserId(userId: string): Promise<Store[]> {
    return await db.select().from(stores).where(eq(stores.userId, userId));
  }

  async createStore(insertStore: InsertStore): Promise<Store> {
    const result = await db.insert(stores).values(insertStore).returning();
    return result[0];
  }

  // Products
  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getActiveProducts(): Promise<Product[]> {
    const now = new Date();
    
    return await db.select()
      .from(products)
      .where(
        and(
          eq(products.isActive, true),
          gt(products.expirationDate, now)
        )
      );
  }

  async getProductsByStoreId(storeId: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.storeId, storeId));
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | undefined> {
    const result = await db.update(products)
      .set(updates)
      .where(eq(products.id, id))
      .returning();
    return result[0];
  }

  // Orders
  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return result[0];
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async getAllOrdersWithDetails(): Promise<OrderWithDetails[]> {
    const allOrders = await db
      .select({
        order: orders,
        buyer: users,
        product: products,
        store: stores,
      })
      .from(orders)
      .innerJoin(users, eq(orders.buyerId, users.id))
      .innerJoin(products, eq(orders.productId, products.id))
      .innerJoin(stores, eq(products.storeId, stores.id));

    return allOrders.map((row) => ({
      ...row.order,
      buyer: row.buyer,
      product: row.product,
      store: row.store,
    }));
  }

  async getOrdersByBuyerId(buyerId: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.buyerId, buyerId));
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(insertOrder).returning();
    return result[0];
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const result = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
