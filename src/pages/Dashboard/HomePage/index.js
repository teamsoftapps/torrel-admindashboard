import styles from "./HomePage.module.css";
import Circle from "../../../images/Circle.png";
import ringImage from "../../../images/Masking.png";
import income from "../../../images/income.png";
import outcome from "../../../images/outcome.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dots from "../../../images/threeDots.png";

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

const HomePage = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [latestUsers, setLatestUsers] = useState([]);
  const [allBalances, SetAllBalances] = useState(null);
  const [allSubBalances, SetAllSubBalances] = useState(null);
  const [allTotals, setAllTotals] = useState(null);
  const [allSubTotals, setAllSubTotals] = useState(null);
  const [monthlyInvoicedata, setMonthlyInvoicedata] = useState(null);
  const [monthlySubInvoicedata, setMonthlySubInvoicedata] = useState(null);

  const fetchLatestUsers = async () => {
    try {
      const { data } = await api.get("/api/v1/superadmin/users", {
        headers: {
          Authorization: `Bearer ${user?.data?.token}`,
        },
      });
      if (data) {
        setLatestUsers(data?.data?.slice(0, 5));
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error==>", error);
      setError(error.response.data.message);
    }
  };

  const fetchAllBalances = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/v1/superadmin/users/invbalancedata");
      if (data) {
        SetAllBalances(data);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchAllSubBalances = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/v1/superadmin/users/subbalancedata");
      if (data) {
        SetAllSubBalances(data);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchAllTotals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/v1/superadmin/users/invtotaldata");
      if (data) {
        console.log("invtotaldata", data);
        setAllTotals(data);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchAllSubTotals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/v1/superadmin/users/subtotaldata");
      if (data) {
        setAllSubTotals(data);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  const fetchMonthlyInvoicesData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/v1/superadmin/users/invmonthlydata");
      if (data) {
        setMonthlyInvoicedata(data);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchMonthlySubInvoicesData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/v1/superadmin/users/submonthlydata");
      if (data) {
        setMonthlySubInvoicedata(data);
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  //  converting object into array then filtering and then converting it to object
  const invoicesMonthlyIncome = Object.fromEntries(
    Object.entries(monthlyInvoicedata?.data || {}).filter(([key]) =>
      key.includes("Income")
    )
  );
  const invoicesMonthlyTotal = Object.fromEntries(
    Object.entries(monthlyInvoicedata?.data || {}).filter(([key]) =>
      key.includes("Total")
    )
  );
  const invoicesMonthlyAmountPaid = Object.fromEntries(
    Object.entries(monthlyInvoicedata?.data || {}).filter(([key]) =>
      key.includes("AmountPaid")
    )
  );
  const subInvoicesMonthlyIncome = Object.fromEntries(
    Object.entries(monthlySubInvoicedata?.data || {}).filter(([key]) =>
      key.includes("Income")
    )
  );
  const subInvoicesMonthlyTotal = Object.fromEntries(
    Object.entries(monthlySubInvoicedata?.data || {}).filter(([key]) =>
      key.includes("Total")
    )
  );
  const subInvoicesMonthlyAmountPaid = Object.fromEntries(
    Object.entries(monthlySubInvoicedata?.data || {}).filter(([key]) =>
      key.includes("AmountPaid")
    )
  );

  // extracting object values and converting into arr
  const monthlyInvoiceValues = Object.values(invoicesMonthlyIncome);
  const monthlySubInvoiceValues = Object.values(subInvoicesMonthlyIncome);
  const monthlyInvoiceTotals = Object.values(invoicesMonthlyTotal);
  const monthlySubInvoiceTotals = Object.values(subInvoicesMonthlyTotal);
  const monthlyInvoiceTotalAmountPaid = Object.values(
    invoicesMonthlyAmountPaid
  );
  const monthlySubInvoiceTotalAmountPaid = Object.values(
    subInvoicesMonthlyAmountPaid
  );

  // add both arrs values and storing it to another arr
  const monthlyIncomeArr = monthlyInvoiceValues.map((invVal, i) => {
    return (
      invVal +
      monthlySubInvoiceValues[i] +
      monthlyInvoiceTotalAmountPaid[i] +
      monthlySubInvoiceTotalAmountPaid[i]
    );
  });
  const monthlyTotalArr = monthlyInvoiceTotals.map((invVal, i) => {
    return invVal + monthlySubInvoiceTotals[i];
  });

  const monthly = [
    {
      name: "Jan",
      income: monthlyIncomeArr[0],
      total: monthlyTotalArr[0],
    },
    {
      name: "Feb",
      income: monthlyIncomeArr[1],
      total: monthlyTotalArr[1],
    },
    {
      name: "Mar",
      income: monthlyIncomeArr[2],
      total: monthlyTotalArr[2],
    },
    {
      name: "Apr",
      income: monthlyIncomeArr[3],
      total: monthlyTotalArr[3],
    },
    {
      name: "May",
      income: monthlyIncomeArr[4],
      total: monthlyTotalArr[4],
    },
    {
      name: "Jun",
      income: monthlyIncomeArr[5],
      total: monthlyTotalArr[5],
    },
    {
      name: "Jul",
      income: monthlyIncomeArr[6],
      total: monthlyTotalArr[6],
    },
    {
      name: "Aug",
      income: monthlyIncomeArr[7],
      total: monthlyTotalArr[7],
    },
    {
      name: "Sep",
      income: monthlyIncomeArr[8],
      total: monthlyTotalArr[8],
    },
    {
      name: "Oct",
      income: monthlyIncomeArr[9],
      total: monthlyTotalArr[9],
    },
    {
      name: "Nov",
      income: monthlyIncomeArr[10],
      total: monthlyTotalArr[10],
    },
    {
      name: "Dec",
      income: monthlyIncomeArr[11],
      total: monthlyTotalArr[11],
    },
  ];

  // const weeklyBalance =
  //   allBalances?.weeklyInvoicesIncome +
  //   allTotals?.weeklyInvoicesAmountPaid +
  //   allSubBalances?.weeklySubInvoicesIncome +
  //   allSubTotals?.WeeklyInvoicesAmountPaid;
  // const weeklyTotal =
  //   allTotals?.weeklyInvoicesTotal +
  //   allSubTotals?.weeklySubInvoicesTotal -
  //   weeklyBalance;

  // const weekly = [
  //   { name: "total", value: weeklyTotal },
  //   { name: "income", value: weeklyBalance },
  // ];

  // //calculation for conditional rendring of pie chart
  // const weeklyValuesArr = weekly.filter((obj) => {
  //   return obj.value;
  // });
  // const isweeklyValues = weeklyValuesArr.reduce((total, curr) => {
  //   return total + curr;
  // }, 0);

  //combining  Arrays for totalIncome Array
  const totalBalance = allBalances?.totalIncomeArr?.concat(
    allSubBalances?.totalSubIncomeArr
  );

  const totalAmountPaidArr = allTotals?.totalAmountPaidArr?.concat(
    allSubTotals?.totalAmountPaidArr
  );

  const netTotalIncomeArr = totalBalance?.concat(totalAmountPaidArr);
  const allTotal = allTotals?.totalArr?.concat(allSubTotals?.subTotalArr);

  //mapping the combine Arr
  const data1 = netTotalIncomeArr?.map((val) => {
    return { income: val };
  });

  const data2 = allTotal?.map((val) => {
    return { income: val };
  });

  // combining two values Invoice totalIncome & SubInvoice totalIncome
  const netTotalIncome =
    allBalances?.totalIncome +
    allTotals?.totalAmountPaid +
    allSubBalances?.totalSubIncome +
    allSubTotals?.totalAmountPaid;

  const netTotal = allTotals?.total + allSubTotals?.subTotal;

  const netTotalBalance = netTotal - netTotalIncome;

  useEffect(() => {
    fetchAllBalances();
    fetchAllSubBalances();
    fetchAllTotals();
    fetchAllSubTotals();
    fetchMonthlyInvoicesData();
    fetchMonthlySubInvoicesData();
    fetchLatestUsers();
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
          </div>
          <div className={styles.bottom}>
            <div className={styles.validation}>
              <span>Valid Thru</span>
              <span>03/21</span>
            </div>
            <div className={styles.cardNumber}>
              <span>.... .... .... 1234</span>
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
            <span>Total</span>
            <img src={outcome} alt="" />
          </div>
          <div className={styles.balanceCount}>
            {netTotal ? <CurrencyFormatter amount={netTotal} /> : "$00.00"}
            {/* $00.00 */}
          </div>

          {/* Area charts */}
          <div className={styles.outcomeChart}>
            <ResponsiveContainer width="80%" height={80}>
              <AreaChart width={250} height={80} data={data2}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EAD6B7" stopOpacity={0.8} />
                    <stop offset="75%" stopColor="#EAD6B7" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* <Tooltip /> */}
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#EAD6B7"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ***********second Bar chart section*********** */}
      <div className={styles.container}>
        {/* transaction overview section */}

        <div className={styles.transactionOverview}>
          <h1>Monthly Transaction Overview</h1>
          <div className={styles.barchart}>
            <ResponsiveContainer width="90%" height={400}>
              <BarChart data={monthly} width={550} height={400}>
                <CartesianGrid strokeDasharray="1 2" />
                <XAxis dataKey="name" />
                <YAxis />
                {/* <Tooltip /> */}
                <Legend />
                <Bar dataKey="total" fill="#EAD6B7" />
                <Bar dataKey="income" fill="#6BDB65" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.invoiceHistory}>
          <div className={styles.top}>
            <span style={{ fontSize: "1.2rem" }}>Recent Users</span>
            <img src={dots} alt="" />
          </div>

          {/*****  Latest Invoice Table Here ******/}
          <div className={styles.home_dashboard_table}>
            {isLoading && <p style={{ fontSize: "1.1rem" }}>Loading...</p>}
            {error && <p>{error?.message}</p>}
            {latestUsers?.length === 0 && <p>No Recent Users.</p>}
            {!isLoading && !error && latestUsers?.length !== 0 && (
              <table>
                <thead>
                  <tr className={styles.header__table}>
                    <th>ID</th>

                    <th> FirstName</th>
                    <th> LastName</th>
                    <th> Email</th>
                  </tr>
                </thead>
                <tbody>
                  {latestUsers?.map((user, i) => (
                    <tr key={user._id} className={styles.body__row}>
                      <td>{i + 1}</td>

                      <td>{user?.firstName}</td>
                      <td>{user?.lastName}</td>
                      <td>{user?.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
