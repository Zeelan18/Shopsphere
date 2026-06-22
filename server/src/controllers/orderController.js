const supabase = require("../config/supabase");
const sendEmail = require("../utils/sendEmail");

const placeOrder = async (req, res) => {
  try {
    const {
      data: cartItems,
      error: cartError,
    } = await supabase
      .from("cart_items")
      .select(`
        *,
        products (
          id,
          name,
          price
        )
      `)
      .eq("user_id", req.user.id);

    if (cartError) throw cartError;

    if (!cartItems.length) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const totalAmount = cartItems.reduce(
      (sum, item) =>
        sum +
        item.products.price *
          item.quantity,
      0
    );

    const {
      data: orderData,
      error: orderError,
    } = await supabase
      .from("orders")
      .insert([
        {
          user_id: req.user.id,
          total_amount: totalAmount,
          status: "Pending",
        },
      ])
      .select();

    if (orderError) throw orderError;

    const orderId = orderData[0].id;

    const orderItems =
      cartItems.map((item) => ({
        order_id: orderId,
        product_id:
          item.product_id,
        quantity:
          item.quantity,
        price:
          item.products.price,
      }));

    const {
      error: itemError,
    } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemError) throw itemError;

    await supabase
      .from("cart_items")
      .delete()
      .eq(
        "user_id",
        req.user.id
      );

    // CUSTOMER DETAILS

    const {
      data: customer,
      error: customerError,
    } = await supabase
      .from("users")
      .select("*")
      .eq(
        "id",
        req.user.id
      )
      .single();

    if (customerError)
      throw customerError;

    console.log(
      "CUSTOMER:",
      customer
    );

    // CUSTOMER EMAIL

    await sendEmail(
      customer.email,
      "ShopSphere Order Confirmation",
      `
      <h2>Order Placed Successfully</h2>

      <p>Hello ${customer.name},</p>

      <p>Thank you for shopping with ShopSphere.</p>

      <p>
        Order ID:
        <b>${orderId}</b>
      </p>

      <p>
        Total Amount:
        <b>₹${totalAmount}</b>
      </p>

      <p>
        Your order has been received.
      </p>
      `
    );

    console.log(
      "CUSTOMER EMAIL SENT TO:",
      customer.email
    );

    // SELLER EMAILS

    for (const item of cartItems) {

      console.log(
        "ITEM PRODUCT ID:",
        item.product_id
      );

      const {
        data: product,
        error: productError,
      } = await supabase
        .from("products")
        .select("*")
        .eq(
          "id",
          item.product_id
        )
        .single();

      if (productError)
        throw productError;

      console.log(
        "PRODUCT:",
        product
      );

      const {
        data: seller,
        error: sellerError,
      } = await supabase
        .from("users")
        .select("*")
        .eq(
          "id",
          product.seller_id
        )
        .single();

      if (sellerError)
        throw sellerError;

      console.log(
        "SELLER:",
        seller
      );

      console.log(
        "SENDING SELLER EMAIL TO:",
        seller.email
      );

      await sendEmail(
        seller.email,
        "New Order Received",
        `
        <h2>New Order Received</h2>

        <p>Hello ${seller.name},</p>

        <p>
          A customer has placed
          an order.
        </p>

        <p>
          Product:
          <b>${product.name}</b>
        </p>

        <p>
          Quantity:
          <b>${item.quantity}</b>
        </p>

        <p>
          Customer:
          <b>${customer.name}</b>
        </p>

        <p>
          Customer Email:
          <b>${customer.email}</b>
        </p>

        <p>
          Order ID:
          <b>${orderId}</b>
        </p>
        `
      );

      console.log(
        "SELLER EMAIL SENT TO:",
        seller.email
      );
    }

    res.status(201).json({
      success: true,
      message:
        "Order placed successfully",
      orderId,
    });

  } catch (error) {

    console.error(
      "ORDER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

const getOrders = async (
  req,
  res
) => {
  try {
    const {
      data,
      error,
    } = await supabase
      .from("orders")
      .select("*")
      .eq(
        "user_id",
        req.user.id
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error) throw error;

    res.json({
      success: true,
      orders: data,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};


const updateOrderStatus = async (
  req,
  res
) => {
  try {

    const { id } =
      req.params;

    const { status } =
      req.body;

    const {
      data,
      error,
    } = await supabase
      .from("orders")
      .update({
        status,
        updated_at:
          new Date(),
      })
      .eq("id", id)
      .select();

    if (error)
      throw error;

    res.json({
      success: true,
      order: data[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};
const getAllOrders = async (
  req,
  res
) => {
  try {

    const {
      data,
      error,
    } = await supabase
      .from("orders")
      .select("*")
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error)
      throw error;

    res.json({
      success: true,
      orders: data,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};
const getSellerAnalytics =
  async (req, res) => {
    try {

      const {
        data: products,
        error: productsError,
      } = await supabase
        .from("products")
        .select("id")
        .eq(
          "seller_id",
          req.user.id
        );

      if (productsError)
        throw productsError;

      const productIds =
        products.map(
          (p) => p.id
        );

      const {
        data: orderItems,
        error: orderItemsError,
      } = await supabase
        .from("order_items")
        .select("*")
        .in(
          "product_id",
          productIds
        );

      if (orderItemsError)
        throw orderItemsError;

      const totalRevenue =
        orderItems.reduce(
          (sum, item) =>
            sum +
            item.price *
              item.quantity,
          0
        );

      res.json({
        success: true,
        totalProducts:
          products.length,
        totalOrders:
          orderItems.length,
        totalRevenue,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  };
module.exports = {
  placeOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getSellerAnalytics,
};