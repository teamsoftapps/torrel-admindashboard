import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import styles from "./InvoicePrint.module.css";

// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

const data1 = [
  {
    name: "M",
    income: 1200,
    outcome: 2100,
  },
  {
    name: "T",
    income: 400,
    outcome: 2200,
  },
  {
    name: "W",
    income: 2000,
    outcome: 2300,
  },
  {
    name: "T",
    income: 500,
    outcome: 2400,
  },
  {
    name: "F",
    income: 1200,
    outcome: 2500,
  },
  {
    name: "S",
    income: 2400,
    outcome: 2600,
  },
  {
    name: "S",
    income: 1200,
    outcome: 2700,
  },
];

const InvoicePrint = () => {
  return (
    <div className={styles.print}>
      {/* charts */}
      <AreaChart
        width={300}
        height={150}
        data={data1}
        margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6BDB65" stopOpacity={0.8} />
            <stop offset="75%" stopColor="#6BDB65" stopOpacity={0} />
          </linearGradient>
          {/* <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient> */}
        </defs>
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis /> */}
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Tooltip />
        <Area
          type="monotone"
          dataKey="income"
          stroke="#6fe469"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        {/* <Area
          type="monotone"
          dataKey="outcome"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        /> */}
      </AreaChart>
    </div>
  );
};

export default InvoicePrint;
