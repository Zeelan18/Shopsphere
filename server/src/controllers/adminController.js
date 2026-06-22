const supabase =
  require("../config/supabase");
const sendEmail =
  require("../utils/sendEmail");

// ANALYTICS

const getAnalytics =
  async (req, res) => {
    try {

      const {
        count: totalUsers,
      } = await supabase
        .from("users")
        .select("*", {
          count: "exact",
          head: true,
        });

      const {
        count: totalProducts,
      } = await supabase
        .from("products")
        .select("*", {
          count: "exact",
          head: true,
        });

      const {
        count: totalOrders,
      } = await supabase
        .from("orders")
        .select("*", {
          count: "exact",
          head: true,
        });

      const {
        data: orders,
      } = await supabase
        .from("orders")
        .select(
          "total_amount"
        );

      const totalRevenue =
        orders.reduce(
          (sum, order) =>
            sum +
            order.total_amount,
          0
        );

      const {
        count: totalSellers,
      } = await supabase
        .from("users")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "role",
          "seller"
        );

      res.json({
        success: true,
        totalUsers,
        totalSellers,
        totalProducts,
        totalOrders,
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

// USERS

const getUsers =
  async (req, res) => {
    const {
      data,
      error,
    } = await supabase
      .from("users")
      .select("*");

    if (error)
      return res
        .status(500)
        .json(error);

    res.json(data);
  };

const deleteUser =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        data: user,
        error: userError,
      } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

      if (userError)
        throw userError;

      if (
        user.role ===
        "admin"
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              "Admin account cannot be deleted",
          });
      }

      const {
        error,
      } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

      if (error)
        throw error;

      res.json({
        success: true,
        message:
          "User deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };
// PRODUCTS

const getProducts =
  async (req, res) => {

    const {
      data,
      error,
    } = await supabase
      .from("products")
      .select("*");

    if (error)
      return res
        .status(500)
        .json(error);

    res.json(data);
  };

const deleteProduct =
  async (req, res) => {

    const { id } =
      req.params;

    const {
      error,
    } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error)
      return res
        .status(500)
        .json(error);

    res.json({
      success: true,
    });
  };
// GET ALL ORDERS

const getOrders =
  async (req, res) => {

    try {

      const {
        data,
        error,
      } = await supabase
        .from("orders")
        .select(`
          *,
          users (
            name,
            email
          )
        `)
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error)
        throw error;

      res.json(data);

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

// UPDATE ORDER STATUS

// UPDATE ORDER STATUS

const updateOrderStatus =
  async (req, res) => {

    try {

      console.log(
        "UPDATE STATUS API HIT"
      );

      const { id } =
        req.params;

      const { status } =
        req.body;

      const {
        data: order,
        error: orderError,
      } = await supabase
        .from("orders")
        .update({
          status,
        })
        .eq("id", id)
        .select()
        .single();

      if (orderError)
        throw orderError;

      console.log(
        "ORDER:",
        order
      );

      const {
        data: customer,
        error: customerError,
      } = await supabase
        .from("users")
        .select("*")
        .eq(
          "id",
          order.user_id
        )
        .single();

      if (customerError) {
        console.log(
          "CUSTOMER ERROR:",
          customerError
        );
      }

      console.log(
        "CUSTOMER:",
        customer
      );

      if (customer) {

        console.log(
          "SENDING EMAIL TO:",
          customer.email
        );

        await sendEmail(
          customer.email,
          `Order Status Updated - ${status}`,
          `
            <h2>ShopSphere Order Update</h2>

            <p>Hello ${customer.name},</p>

            <p>Your order status has been updated.</p>

            <p>
              <strong>New Status:</strong>
              ${status}
            </p>

            <p>
              <strong>Order ID:</strong>
              ${order.id}
            </p>

            <p>
              Thank you for shopping with ShopSphere.
            </p>
          `
        );

        console.log(
          "STATUS EMAIL SENT"
        );

      }

      res.json({
        success: true,
        order,
      });

    } catch (error) {

      console.log(
        "STATUS EMAIL ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

module.exports = {
  getAnalytics,
  getUsers,
  deleteUser,
  getProducts,
  deleteProduct,
  getOrders,
  updateOrderStatus,
};