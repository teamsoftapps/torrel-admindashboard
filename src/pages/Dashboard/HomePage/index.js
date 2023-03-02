import styles from "./HomePage.module.css";
import Circle from "../../../images/Circle.png";
import ringImage from "../../../images/Masking.png";
import income from "../../../images/income.png";
import outcome from "../../../images/outcome.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import graph from "../../../images/Graph.png";
// import graph1 from "../../../images/Graph(1).png";
import dots from "../../../images/threeDots.png";
// import barchart from "../../../images/BarChart.png";
import arrowUp from "../../../images/arrowUp.png";
import arrowDown from "../../../images/arrowDown.png";
import { useFetch } from "../../../hooks/useFetch";
import { useAuthContext } from "../../../hooks/useAuthContext";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import CurrencyFormatter from "../../../utils/currencyFormatter";
import { api } from "../../../services/api";

// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

// Bar charts data
const data = [
  {
    name: "M",
    income: 900,
    outcome: 2100,
  },
  {
    name: "T",
    income: 400,
    outcome: 2200,
  },
  {
    name: "W",
    income: 800,
    outcome: 2300,
  },
  {
    name: "T",
    income: 1200,
    outcome: 2400,
  },
  {
    name: "F",
    income: 2000,
    outcome: 2500,
  },
  {
    name: "S",
    income: 600,
    outcome: 2600,
  },
  {
    name: "S",
    income: 2000,
    outcome: 2700,
  },
];

// Area charts data
// const data1 = [
//   {
//     name: "M",
//     income: 1200,
//     outcome: 2100,
//   },
//   {
//     name: "T",
//     income: 400,
//     outcome: 2200,
//   },
//   {
//     name: "W",
//     income: 2000,
//     outcome: 2300,
//   },
//   {
//     name: "T",
//     income: 500,
//     outcome: 2400,
//   },
//   {
//     name: "F",
//     income: 1200,
//     outcome: 2500,
//   },
//   {
//     name: "S",
//     income: 2400,
//     outcome: 2600,
//   },
//   {
//     name: "S",
//     income: 1200,
//     outcome: 2700,
//   },
// ];

//*********/ IMPORTS FOR CHARTS.JS ************
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from "chart.js";
// // import * as faker from 'faker';
// // // import * as faker from '@faker-js/faker';
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       // text: 'Chart.js Line Chart',
//     },
//   },
// };

// const labels = ["January", "February", "March"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       fill: true,
//       label: "Dataset 2",
//       data: labels.map((label) =>label),
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

// export function App() {
//   return <Line options={options} data={data} />;
// }

const HomePage = () => {
  // const url = "/api/v1/invoices";
  // const { data: latestInvoices, error, isLoading } = useFetch(url, "GET");
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const allBalancesUrl = "/api/v1/invoices/balancedata";
  const allSubBalancesUrl = "/api/v1/subinvoices/balancedata";
  const { data: Balances } = useFetch(allBalancesUrl);
  const { data: SubBalances } = useFetch(allSubBalancesUrl);
  const [latestInvoice, setLatestInvoice] = useState([]);
  const [allBalances, SetAllBalances] = useState(null);

  const [width, setWidth] = useState(0);
  const percentage = 75;
  const percentage1 = 25;
  const percentage2 = 50;
  const percentage3 = 10;
  const percentage4 = 75;

  // console.log("Balances", Balances);
  // console.log("SubBalances", SubBalances);

  const fetchLatestSubInvoices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/v1/invoices", {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        console.log("Latest_Invoices>>", data);
        setLatestInvoice(data?.data?.slice(0, 5));
      }
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setError(error);
    }
  };

  //combining two Arrays Invoice Income Arr & Sub Invoice Income Arr
  const totalBalance = Balances?.totalIncomeArr?.concat(
    SubBalances?.totalSubIncomeArr
  );

  //mapping the combine Arr
  const data1 = totalBalance?.map((val) => {
    return { income: val };
  });

  // combining two values Invoice totalIncome & SubInvoice totalIncome
  const netTotalIncome = Balances?.totalIncome + SubBalances?.totalSubIncome;

  // combining two values Invoice totalBalance & SubInvoice totalBalance
  const netTotalBalance = Balances?.totalBalance + SubBalances?.totalSubBalance;

  useEffect(() => {
    fetchLatestSubInvoices();
  }, []);

  // console.log("latestInvoices", latestInvoice);

  return (
    <>
      <h1 className={styles.heading}>Dashboard</h1>

      {/* ***********First ledger section*********** */}

      <div className={styles.leisure}>
        {/* ************Balance container********* */}
        <div className={styles.balance}>
          <div className={styles.top}>
            <span>Balance</span>
            <img src={Circle} alt="" />
          </div>
          <div className={styles.balanceCount}>
            {netTotalBalance ? (
              <CurrencyFormatter amount={netTotalBalance} />
            ) : (
              "$00.00"
            )}

            {/* {<CurrencyFormatter amount={48325} />} */}
          </div>
          <div className={styles.bottom}>
            <div className={styles.validation}>
              <span>Valid Thru</span>
              <span>03/21</span>
            </div>
            <div className={styles.cardNumber}>
              <span>.... .... .... 1234</span>
              {/* <span> 1234</span>     */}
            </div>
          </div>

          {/* Absolute balance ring image */}
          <div className={styles.maskingImage}>
            <img src={ringImage} alt="" />
          </div>
        </div>

        {/* ************Balance income********* */}
        <div className={styles.income}>
          <div className={styles.top}>
            <span>Income</span>
          </div>
          <div className={styles.balanceCount}>
            {netTotalIncome ? (
              <CurrencyFormatter amount={netTotalIncome} />
            ) : (
              "$00.00"
            )}
          </div>

          {/*Area charts */}
          <div className={styles.incomeChart}>
            <ResponsiveContainer width="80%" height={80}>
              <AreaChart
                className={styles.areaChart}
                width={250}
                height={80}
                data={data1}
                // margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6BDB65" stopOpacity={0.8} />
                    <stop offset="75%" stopColor="#6BDB65" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* <Tooltip /> */}
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#6fe469"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ************Balance outcome********* */}
        <div className={styles.outcome}>
          <div className={styles.top}>
            <span>Outcome</span>
            <img src={outcome} alt="" />
          </div>
          <div className={styles.balanceCount}>$4811,21</div>

          {/* Area charts */}
          <div className={styles.outcomeChart}>
            {/* <Line options={options} data={data} /> */}
            <ResponsiveContainer width="80%" height={80}>
              <AreaChart
                width={250}
                height={80}
                data={data1}
                // margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EE4444" stopOpacity={0.8} />
                    <stop offset="75%" stopColor="#EE4444" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* <Tooltip /> */}
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#EE4444"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ************Balance Limit********* */}
        <div className={styles.limit}>
          <span>Limit</span>
          <div className={styles.circularProgress}>
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              strokeWidth={13}
              styles={buildStyles({
                rotation: 0.45,
                textSize: "16px",
                pathTransitionDuration: 0.5,
                pathColor: `rgb(0, 255, 0, ${percentage / 100})`,
                textColor: "#fff",
                trailColor: "#9BABC5",
                strokeLinecap: "butt",
              })}
            />
          </div>
        </div>
      </div>

      {/* ***********second Bar chart section*********** */}
      <div className={styles.container}>
        {/* transaction overview section */}

        <div className={styles.transactionOverview}>
          <h1>Transaction Overview</h1>
          <div className={styles.barchart}>
            <ResponsiveContainer width="90%" height={400}>
              <BarChart data={data} width={550} height={400}>
                <CartesianGrid strokeDasharray="1 2" />
                <XAxis dataKey="name" />
                <YAxis />
                {/* <Tooltip /> */}
                <Legend />
                <Bar dataKey="outcome" fill="#6BDB65" />
                <Bar dataKey="income" fill="#EAD6B7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* 
        <div className={styles.invoiceHistory}>
          <div className={styles.top}>
            <span>Invoice History</span>
            <img src={dots} alt="" />
          </div>

          <div className={styles.progressMain}>
            <div className={styles.first}>
              <div className={styles.heading}>
                <span>Subcription</span>
                <span>
                  <strong>$500</strong> / $2000
                </span>
              </div>

              <div className={styles.circularProgress1}>
                <CircularProgressbar
                  value={percentage1}
                  text={`${percentage1}%`}
                  strokeWidth={15}
                  styles={buildStyles({
                    rotation: 0.45,
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: `rgb(255, 255, 255, ${percentage / 100})`,
                    textColor: "#fff",
                    trailColor: `rgba(255,255,255,0.5)`,
                    strokeLinecap: "butt",
                  })}
                />
              </div>
            </div>
   

            <div className={styles.second}>
              <div className={styles.heading}>
                <span>Groceries</span>
                <span>
                  <strong>$1000</strong> / $2000
                </span>
              </div>

              <div className={styles.circularProgress1}>
                <CircularProgressbar
                  value={percentage2}
                  text={`${percentage2}%`}
                  strokeWidth={15}
                  styles={buildStyles({
                    rotation: 0.45,
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: `rgb(124, 119, 119, ${percentage / 100})`,
                    textColor: "#fff",
                    trailColor: ` rgba(186, 183, 183, 0.5)`,
                    strokeLinecap: "butt",
                  })}
                />
              </div>
            </div>
          </div>

          <div className={styles.progressMain}>
            <div className={styles.third}>
              <div className={styles.heading}>
                <span>Investment</span>
                <span>
                  <strong>$50</strong> / $2000
                </span>
              </div>

              <div className={styles.circularProgress1}>
                <CircularProgressbar
                  value={percentage3}
                  text={`${percentage3}%`}
                  strokeWidth={15}
                  styles={buildStyles({
                    rotation: 0.45,
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: `rgb(255, 255, 255, ${percentage / 100})`,
                    textColor: "#fff",
                    trailColor: "rgba(255, 255, 255, 0.5)",
                    strokeLinecap: "butt",
                  })}
                />
              </div>
            </div>

      

            <div className={styles.fourth}>
              <div className={styles.heading}>
                <span>Others</span>
                <span>
                  <strong>$1500</strong> / $2000
                </span>
              </div>

              <div className={styles.circularProgress1}>
                <CircularProgressbar
                  value={percentage4}
                  text={`${percentage4}%`}
                  strokeWidth={15}
                  styles={buildStyles({
                    rotation: 0.45,
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: `rgb(255, 255, 255, ${percentage / 100})`,
                    textColor: "#fff",
                    trailColor: `rgba(255, 255, 255, 0.5)`,
                    strokeLinecap: "butt",
                  })}
                />
              </div>
            </div>
          </div>
        </div> */}
        <div className={styles.invoiceHistory}>
          <div className={styles.top}>
            <span style={{ fontSize: "1.2rem" }}>Latest Invoice</span>
            <img src={dots} alt="" />
          </div>

          {/*****  Latest Invoice Table Here ******/}
          <div className={styles.home_dashboard_table}>
            {isLoading && <p style={{ fontSize: "1.1rem" }}>Loading...</p>}
            {error && <p>{error?.message}</p>}
            {latestInvoice?.length === 0 && <p>No Latest Invoices.</p>}
            {!isLoading && !error && latestInvoice?.length !== 0 && (
              <table>
                <thead>
                  <tr className={styles.header__table}>
                    {/* <th>
                      <input type="checkbox" id="header_checkbox" />
                    </th> */}
                    <th>Invoice ID</th>
                    <th>Recipient</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestInvoice?.map((invoice) => (
                    <tr key={invoice._id} className={styles.body__row}>
                      {/* <td>
                        <input type="checkbox" id={invoice._id} />
                      </td> */}
                      <td>{invoice?.invoiceNumber.split("-")[0]}</td>
                      <td>
                        {invoice?.job?.client?.firstName +
                          " " +
                          invoice?.job?.client?.lastName}
                      </td>
                      <td
                        style={{
                          color: "#9BABC5",
                          fontWeight: "100",
                          fontSize: "13.5px",
                        }}
                      >
                        {invoice?.dueDate.split("T")[0]}
                      </td>
                      <td className={styles.row_btn}>
                        <button>{invoice?.status}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/************Third invoice and transction details section************/}
      {/* <div className={styles.transactionContainer}> */}
      {/* <div className={styles.first}>
          <div className={styles.top}>
            <span style={{ fontSize: "1.2rem" }}>Latest Invoice</span>
            <img src={dots} alt="" />
          </div> */}

      {/*****  Latest Invoice Table Here ******/}
      {/* <div className={styles.home_dashboard_table}>
            {isLoading && <p style={{ fontSize: "1.1rem" }}>Loading...</p>}
            {error && <p>{error?.message}</p>}
            {latestInvoice?.length === 0 && <p>No Latest Invoices.</p>}
            {!isLoading && !error && latestInvoice?.length !== 0 && (
              <table>
                <thead>
                  <tr className={styles.header__table}> */}
      {/* <th>
                      <input type="checkbox" id="header_checkbox" />
                    </th> */}
      {/* <th>Invoice ID</th>
                    <th>Recipient</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestInvoice?.map((invoice) => (
                    <tr key={invoice._id} className={styles.body__row}> */}
      {/* <td>
                        <input type="checkbox" id={invoice._id} />
                      </td> */}
      {/* <td>{invoice?.invoiceNumber.split("-")[0]}</td>
                      <td>
                        {invoice?.job?.client?.firstName +
                          " " +
                          invoice?.job?.client?.lastName}
                      </td>
                      <td
                        style={{
                          color: "#9BABC5",
                          fontWeight: "100",
                          fontSize: "13.5px",
                        }}
                      >
                        {invoice?.dueDate.split("T")[0]}
                      </td>
                      <td className={styles.row_btn}>
                        <button>{invoice?.status}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div> */}

      {/* <div className={styles.second}>
          <div className={styles.top}>
            <span style={{ fontSize: "1.2rem" }}>Previous Transaction</span>
            <img src={dots} alt="" />
          </div>

          <div className={styles.selectBox}>
            <select name="" id="">
              <option value="option1">Bulan Ini</option>
              <option value="option1">Bulan Ini</option>
            </select>
          </div> */}

      {/************* Invoice List *************/}

      {/* <div className={styles.invoiceList1}>
            <div className={styles.icon}>
              <img src={arrowUp} alt="" />
            </div>
            <span className={styles.title}>Netfilx Subcription</span>
            <span className={styles.text}>March 2, 2021</span>
            <span className={styles.price}>+$45</span>
            <button>Completed</button>
          </div> */}

      {/* <div className={styles.invoiceList2}>
            <div className={styles.icon}>
              <img src={arrowDown} alt="" />
            </div>
            <span className={styles.title}>Spotify Subciption</span>
            <span className={styles.text}>March 2, 2021</span>
            <span className={styles.price}>+$80</span>
            <button>Cancelled</button>
          </div> */}

      {/* <div className={styles.invoiceList3}>
            <div className={styles.icon}>
              <img src={arrowUp} alt="" />
            </div>
            <span className={styles.title}>Paypal Payment</span>
            <span className={styles.text}>March 2, 2021</span>
            <span className={styles.price}>+$480</span>
            <button>Pending</button>
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default HomePage;
