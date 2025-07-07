import { PrismaClient } from './generated/client';

const prisma = new PrismaClient();

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
      id: `C001`,
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
          id: user.id,
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

  // Create 3 products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'חולצה',
        priceUnit: 10,
        price: 10,
        customerId: customer.id,
        serviceCategoryId: category.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'שמלה',
        priceUnit: 30,
        price: 30,
        customerId: customer.id,
        serviceCategoryId: category.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "ג'קט חליפה",
        priceUnit: 50,
        price: 50,
        customerId: customer.id,
        serviceCategoryId: category.id,
      },
    }),
  ]);

  // Create an order
  const order = await prisma.order.create({
    data: {
      orderNumber: 'ORD-1234',
      status: 'pending',
      paid: false,
      customerId: customer.id,
    },
  });

  // Create 3 order items linked to products
  await Promise.all([
    prisma.orderItem.create({
      data: {
        quantity: 1,
        service: 'Wash & Fold',
        notes: 'Handle gently',
        orderId: order.id,
        productId: products[0].id,
      },
    }),
    prisma.orderItem.create({
      data: {
        quantity: 1,
        service: 'Dry Clean',
        orderId: order.id,
        productId: products[1].id,
      },
    }),
    prisma.orderItem.create({
      data: {
        quantity: 1,
        service: 'Steam Clean',
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