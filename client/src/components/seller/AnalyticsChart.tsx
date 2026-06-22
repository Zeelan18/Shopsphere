import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function AnalyticsChart({
  totalProducts,
  totalOrders,
  totalRevenue,
}: Props) {

  const data = [
    {
      name: "Products",
      value: totalProducts,
    },
    {
      name: "Orders",
      value: totalOrders,
    },
    {
      name: "Revenue",
      value: totalRevenue,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">

      <h2 className="text-xl font-bold mb-4">
        Business Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="value" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}