import config from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

const createCheckoutSession = async (bookingId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    // find the booking
    const booking = await tx.booking.findUniqueOrThrow({
      where: { id: bookingId },
      include: {
        service: true, // title and price
        user: true, // email
        payment: true, // check weather paymenet already exits
      },
    });
    // check weather booking is accepted by technician
    if (booking.status !== "ACCEPTED") {
      throw new Error("technician didn't accepted you booking.");
    }
    // check weather booking is already paid
    if (booking.payment?.status == "COMPLETED") {
      throw new Error("this booking is already paid");
    }

    // create check out session or payment page for customer
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: booking.user.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "BDT",
            unit_amount: booking.service.price * 100,
            product_data: {
              name: booking.service.title,
            },
          },
        },
      ],
      metadata: { bookingId: booking.id },
      success_url: `${config.app_url}/payment/success=true`,
      cancel_url: `${config.app_url}/payment/success=false`,
    });

    const payment = await tx.payment.upsert({
      where: { transactionId: session.id },
      create: {
        bookingId,
        transactionId: session.id,
        amount: booking.service.price,
        method: "Stripe",
        status: "PENDING",
      },
      update: {
        transactionId: session.id,
        status: "PENDING",
      },
    });

    return session.url;
  });

  return transactionResult;
};

const handleWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret,
  );

  // Handle the event
  switch (event.type) {
    // success
    case "checkout.session.completed":
      const session = event.data.object;
      console.log(session);
      if (session.payment_status !== "paid") return;

      const bookingId = session.metadata?.bookingId;

      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: {
            transactionId: session.id,
          },
          data: {
            status: "COMPLETED",
            paidAt: new Date(),
          },
        });

        await tx.booking.update({
          where: { id: bookingId },
          data: {
            status: "PAID",
          },
        });
      });
      break;

    // failed
    case "checkout.session.expired":
      await prisma.payment.update({
        where: {
          transactionId: event.data.object.id,
          status: "PENDING",
        },
        data: {
          status: "FAILED",
        },
      });

    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

export const paymentServices = {
  createCheckoutSession,
  handleWebhook,
};
