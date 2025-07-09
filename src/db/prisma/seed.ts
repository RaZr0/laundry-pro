import { PrismaClient } from './generated/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient()
  .$extends(withAccelerate());

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'Raz Romano',
      email: '90razro@gmail.com',
    },
  });

  // Create a customer linked to the user
  const customer = await prisma.customer.create({
    data: {
      customerNumber: 'C001',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '0501234567',
      email: 'jane@example.com',
      city: 'Tel Aviv',
      street: 'Rothschild Blvd',
      postalCode: '12345',
      joinMarketing: true,
      sendReminders: true,
      orderAcceptedAlert: true,
      orderInProgressAlert: true,
      orderReadyAlert: true,
      orderDeliveredAlert: true,
      prefrencesNotes: 'Prefer eco-friendly products',
      user: {
        connect: {
          email: user.email,
        },
      },
    },
  });

  // Create a service category
  const category = await prisma.serviceCategory.create({
    data: {
      name: 'ניקוי יבש',
    },
  });

  // Create a price unit
  const priceUnit = await prisma.priceUnit.create({
    data: {
      name: 'לק״ג',
    },
  });

  // Create 3 products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'חולצה',
        priceUnitId: priceUnit.id,
        price: 10,
        userId: user.id,
        serviceCategoryId: category.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'שמלה',
        price: 30,
        userId: user.id,
        serviceCategoryId: category.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "ג'קט חליפה",
        price: 50,
        userId: user.id,
        serviceCategoryId: category.id,
      },
    }),
  ]);

  // Create an order
  const order = await prisma.order.create({
    data: {
      orderNumber: 'ORD-1234',
      status: 'in_progress',
      paid: false,
      customerId: customer.id,
    },
  });

  // Create 3 order items linked to products
  await Promise.all([
    prisma.orderItem.create({
      data: {
        price: products[0].price,
        quantity: 1,
        notes: 'Handle gently',
        orderId: order.id,
        productId: products[0].id,
      },
    }),
    prisma.orderItem.create({
      data: {
        price: products[1].price,
        quantity: 1,
        orderId: order.id,
        productId: products[1].id,
      },
    }),
    prisma.orderItem.create({
      data: {
        price: products[2].price,
        quantity: 1,
        orderId: order.id,
        productId: products[2].id,
      },
    }),
  ]);

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });