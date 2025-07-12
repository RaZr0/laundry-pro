import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from './generated/client';

const prisma = new PrismaClient()
  .$extends(withAccelerate());


async function createNewAndSeed({ name, email }: { name: string, email: string }) {

  await prisma.$transaction(async (tx) => {
    // Create a user
    const user = await tx.user.create({
      data: {
        name,
        email,
      },
    });

    const userCustomers = await tx.customer.findMany({
      where: {
        user: {
          email: user.email,
        },
      }
    })

    // Create a customer linked to the user
    const customer = await tx.customer.create({
      data: {
        customerNumber: `C${(userCustomers.length + 1).toString().padStart(3, '0')}`,
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
          }
        }
      },
    });

    // Create a service category
    const serviceCategoryProducts = await tx.serviceCategory.create({
      data: {
        name: 'מוצרים',
      },
    });

    const serviceCategoryFixes = await tx.serviceCategory.create({
      data: {
        name: 'תיקונים',
      },
    });

    const serviceCategoryIroning = await tx.serviceCategory.create({
      data: {
        name: 'גיהוץ',
      },
    });

    const serviceCategoryDryCleaning = await tx.serviceCategory.create({
      data: {
        name: 'ניקוי יבש',
      },
    });

    const serviceCategoryDryLaundry = await tx.serviceCategory.create({
      data: {
        name: 'כביסה',
      },
    });

    // Create a price unit
    const priceUnit = await tx.priceUnit.create({
      data: {
        name: 'לק״ג',
      },
    });

    // Create 3 products
    const products1 = await Promise.all([
      tx.product.create({
        data: {
          name: 'אבקת כביסה פרימיום',
          priceUnitId: priceUnit.id,
          price: 65,
          serviceCategoryId: serviceCategoryProducts.id,
          userId: user.id,
          imageUrl: '/images/products/detergent.png',
        },
      }),
      tx.product.create({
        data: {
          name: 'מרכך כביסה',
          price: 45,
          userId: user.id,
          serviceCategoryId: serviceCategoryProducts.id,
          imageUrl: '/images/products/fabric-softener.png',
        },
      }),
      tx.product.create({
        data: {
          name: "מסיר כתמים",
          price: 55,
          userId: user.id,
          serviceCategoryId: serviceCategoryProducts.id,
          imageUrl: '/images/products/detergent.png',
        },
      }),
    ]);

    await Promise.all([
      tx.product.create({
        data: {
          name: 'קיצור מכנסיים',
          priceUnitId: priceUnit.id,
          price: 45,
          serviceCategoryId: serviceCategoryFixes.id,
          userId: user.id,
          imageUrl: '/images/products/pants.png',
        },
      }),
      tx.product.create({
        data: {
          name: 'החלפת רוכסן',
          price: 60,
          userId: user.id,
          serviceCategoryId: serviceCategoryFixes.id,
          imageUrl: '/images/products/pants.png',
        },
      }),
      tx.product.create({
        data: {
          name: "תיקון קרע",
          price: 40,
          userId: user.id,
          serviceCategoryId: serviceCategoryFixes.id,
          imageUrl: '/images/products/shirt.png',
        },
      }),
    ]);

    await Promise.all([
      tx.product.create({
        data: {
          name: 'גיהוץ חולצה',
          priceUnitId: priceUnit.id,
          price: 25,
          serviceCategoryId: serviceCategoryIroning.id,
          userId: user.id,
          imageUrl: '/images/products/shirt.png',
        },
      }),
      tx.product.create({
        data: {
          name: 'גיהוץ מכנסיים',
          price: 30,
          userId: user.id,
          serviceCategoryId: serviceCategoryIroning.id,
          imageUrl: '/images/products/pants.png',
        },
      }),
      tx.product.create({
        data: {
          name: "גיהוץ שמלה",
          price: 40,
          userId: user.id,
          serviceCategoryId: serviceCategoryIroning.id,
          imageUrl: '/images/products/dress.png',
        },
      }),
    ]);

    await Promise.all([
      tx.product.create({
        data: {
          name: 'חולצה/חולצת נשים',
          priceUnitId: priceUnit.id,
          price: 45,
          serviceCategoryId: serviceCategoryDryCleaning.id,
          userId: user.id,
          imageUrl: '/images/products/shirt.png',
        },
      }),
      tx.product.create({
        data: {
          name: 'מכנסיים',
          price: 60,
          userId: user.id,
          serviceCategoryId: serviceCategoryDryCleaning.id,
          imageUrl: '/images/products/pants.png',
        },
      }),
      tx.product.create({
        data: {
          name: "שמלה פשוטה",
          price: 89,
          userId: user.id,
          serviceCategoryId: serviceCategoryDryCleaning.id,
          imageUrl: '/images/products/dress.png',

        },
      }),
      tx.product.create({
        data: {
          name: "חליפה - שני חלקים",
          price: 150,
          userId: user.id,
          serviceCategoryId: serviceCategoryDryCleaning.id,
          imageUrl: '/images/products/suit.png',
        },
      }),
      tx.product.create({
        data: {
          name: "מעיל חורף",
          price: 120,
          userId: user.id,
          serviceCategoryId: serviceCategoryDryCleaning.id,
          imageUrl: '/images/products/coat.png',
        },
      }),
    ]);

    await Promise.all([
      tx.product.create({
        data: {
          name: 'כביסה וקיפול',
          priceUnitId: priceUnit.id,
          price: 35,
          serviceCategoryId: serviceCategoryDryLaundry.id,
          userId: user.id,
          imageUrl: '/images/products/shirt.png',
        },
      }),
      tx.product.create({
        data: {
          name: 'מצעים - סט מלא',
          price: 120,
          userId: user.id,
          serviceCategoryId: serviceCategoryDryLaundry.id,
          imageUrl: '/images/products/bedding.png',
        },
      }),
      tx.product.create({
        data: {
          name: "שמיכת פוך",
          price: 90,
          userId: user.id,
          serviceCategoryId: serviceCategoryDryLaundry.id,
          imageUrl: '/images/products/bedding.png',
        },
      }),
    ]);

    const orders = await tx.order.findMany({
      where: {
        customer: {
          id: customer.id,
          user: {
            email: user.email,
          }
        }
      }
    })

    // Create an order
    const order = await tx.order.create({
      data: {
        orderNumber: `ORD-${(orders.length + 1).toString().padStart(4, '0')}`,
        status: 'in_progress',
        paid: false,
        customer: {
          connect: {
            id: customer.id,
          }
        },
        user: {
          connect: {
            email: user.email,
          }
        }
      },
    });

    // Create 3 order items linked to products
    await Promise.all([
      tx.orderItem.create({
        data: {
          price: products1[0].price,
          quantity: 1,
          notes: 'Handle gently',
          orderId: order.id,
          productId: products1[0].id,
        },
      }),
      tx.orderItem.create({
        data: {
          price: products1[1].price,
          quantity: 1,
          orderId: order.id,
          productId: products1[1].id,
        },
      }),
      tx.orderItem.create({
        data: {
          price: products1[2].price,
          quantity: 1,
          orderId: order.id,
          productId: products1[2].id,
        },
      }),
    ]);
  })

  // Create a printer for the user
  await prisma.printer.create({
    data: {
      name: 'Microsoft Print to PDF',
      user: {
        connect: {
          email,
        },
      },
    },
  });
}

async function main() {
  await createNewAndSeed({ name: 'Raz Romano', email: '90razro@gmail.com' });
  await createNewAndSeed({ name: 'Yanki', email: 'yanki1770@gmail.com' });
  await createNewAndSeed({ name: 'Gershon Pinsky', email: 'gershon.pinsky564@gmail.com' });
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