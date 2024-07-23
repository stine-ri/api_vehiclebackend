import { Hono } from 'hono';
import Stripe from 'stripe';
import { Pool } from 'pg';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20', // Ensure this is the correct API version
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const stripeRouter = new Hono();

stripeRouter.post('/create-payment-intent', async (c) => {
  try {
    const requestBody = await c.req.json();
    console.log('Request Body:', requestBody);

    const { amount, currency, paymentMethod, returnUrl } = requestBody;

    // Validate request parameters
    if (typeof amount !== 'number' || !currency || !paymentMethod || !returnUrl) {
      console.error('Invalid parameters:', { amount, currency, paymentMethod, returnUrl });
      return c.json({ error: 'Invalid parameters' }, 400);
    }

    // Create payment intent
    console.log('Creating payment intent...');
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethod,
      confirm: false, // Set to false if you are confirming the payment later
      return_url: returnUrl, // Include return_url
    });

    console.log('Payment Intent Created:', paymentIntent);

    // Save payment details to the database
    console.log('Saving payment details to the database...');
    await pool.query(
      `INSERT INTO payments (amount, payment_status, payment_date, payment_method, transaction_id)
       VALUES ($1, $2, to_timestamp($3), $4, $5)`,
      [
        paymentIntent.amount,
        paymentIntent.status,
        new Date(paymentIntent.created * 1000), // Convert Unix timestamp to JavaScript Date
        paymentIntent.payment_method,
        paymentIntent.id,
      ]
    );

    console.log('Payment details saved successfully.');

    // Respond with client secret
    return c.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    console.error('Error occurred:', error);

    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: 'An unknown error occurred' }, 500);
    }
  }
});

export { stripeRouter };
