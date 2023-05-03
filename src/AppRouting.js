import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Confirmation from "./pages/Auth/Confirmation/Confirmation";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Dashboard/Clients";
import CreateInvoices from "./pages/Dashboard/CreateInvoices";
import CreateInvoices2 from "./pages/Dashboard/createinvoices2";
import CreateProjects from "./pages/Dashboard/CreateProjects";
import InvoiceA4 from "./pages/Dashboard/InvoiceA4";
import SubInvoiceA4 from "./pages/Dashboard/SubInvoiceA4";
import Invoices from "./pages/Dashboard/invoices";
// import InvoicePrint from "./pages/Dashboard/printInvoice/InvoicePrint";
import Projects from "./pages/Dashboard/Projects";
import SlicedInvoices from "./pages/Dashboard/SlicedInvoices";
import LandingPage from "./pages/LandingPage/LandingPage";
import CreateClients from "./pages/Dashboard/CreateClients";
import { Navigate } from "react-router-dom";
import ClientDetails from "./pages/Dashboard/ClientDetails/ClientDetails";
import UpdateClients from "./pages/Dashboard/UpdateClients";
import AllProject from "./pages/Dashboard/AllProject/AllProject";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import AllInvoices from "./pages/Dashboard/allInvoices";
import CreateSubProjects from "./pages/Dashboard/CreateSubProjects";
import SubProjects from "./pages/Dashboard/subProjects";
import SubInvoices from "./pages/Dashboard/SubInvoices";
import CreateSubInvoices from "./pages/Dashboard/CreateSubInvoices";
import AllSubProjects from "./pages/Dashboard/AllSubProjetcs";
import AllSubInvoices from "./pages/Dashboard/AllSubInvoices";
import CreateSubInvoices2 from "./pages/Dashboard/CreateSubInvoices2";
import EmailSupports from "./pages/Dashboard/EmailSupports";
import Users from "./pages/Dashboard/Users";
import UsersDetails from "./pages/Dashboard/UsersDetails";
import UserSettings from "./pages/Dashboard/UserSettings";
import TermsAndConditions from "./pages/Auth/TermsAndCondition/TermsAndCondition";

const AppRouting = () => {
  const { user } = useAuthContext();

  const forgotUser = JSON.parse(localStorage.getItem("forgot-user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        {/* <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/login" />}
        /> */}

        {/* <Route
          path="/signup"
          element={
            user?.data?.emailVerified ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup />
            )
          }
        /> */}

        <Route
          path="/forgotpassword"
          element={!user ? <ForgotPassword /> : <Navigate to="/" />}
        />

        {forgotUser && (
          <Route
            path={`/api/v1/users/reset-password/${forgotUser._id}`}
            element={!user ? <ResetPassword /> : <Navigate to="/" />}
          />
        )}

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />

        {/* <Route
          path="/confirmation"
          element={user ? <Confirmation /> : <Navigate to="/login" />}
        /> */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/dashboard/clients"
          element={user ? <Clients /> : <Navigate to="/login" />}
        /> */}
        {/* <Route path="/dashboard/clients" element={<Clients />} /> */}
        {/* <Route
          path="/dashboard/projects"
          element={user ? <AllProject /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/dashboard/subprojects"
          element={user ? <AllSubProjects /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/dashboard/projects/:id"
          element={user ? <Projects /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/dashboard/projects/create/:id"
          element={user ? <CreateProjects /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/dashboard/subprojects/:id"
          element={user ? <SubProjects /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/dashboard/subprojects/create/:id"
          element={user ? <CreateSubProjects /> : <Navigate to="/login" />}
        /> */}
        {/* <Route path="/dashboard/projects/create" element={<CreateProjects />} /> */}
        {/* <Route
          path="/dashboard/allinvoices"
          element={user ? <AllInvoices /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/dashboard/allsubinvoices"
          element={user ? <AllSubInvoices /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/dashboard/invoices/:id"
          element={user ? <Invoices /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/dashboard/subinvoices/:id"
          element={user ? <SubInvoices /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/invoices/create/:id"
          element={user ? <CreateInvoices /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/subinvoices/create/:id"
          element={user ? <CreateSubInvoices /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/invoices/slicedinvoice"
          element={user ? <SlicedInvoices /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/invoice/createinvoice2/:id"
          element={user ? <CreateInvoices2 /> : <Navigate to="/login" />}
        /> */}
        {/* <Route
          path="/dashboard/subinvoices/createsubinvoice2/:id"
          element={user ? <CreateSubInvoices2 /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/invoiceprint/:id"
          element={user ? <InvoiceA4 /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/subinvoiceprint/:id"
          element={user ? <SubInvoiceA4 /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/createClients"
          element={user ? <CreateClients /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/updateClients"
          element={user ? <UpdateClients /> : <Navigate to="/login" />}
        /> */}

        {/* <Route
          path="/dashboard/clients/:id"
          element={user ? <ClientDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/updateClients"
          element={user ? <UpdateClients /> : <Navigate to="/login" />}
        /> */}

        <Route
          path="/dashboard/superadmin/users"
          element={user ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/usersettings"
          element={user ? <UserSettings /> : <Navigate to="/login" />}
        />

        {/* <Route path="/dashboard/emailsupport" element={<EmailSupports />} /> */}

        <Route
          path="/dashboard/superadmin/users/:id"
          element={user ? <UsersDetails /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/superadmin/users/clients/:id"
          element={user ? <Clients /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/superadmin/users/jobs/:id"
          element={user ? <AllProject /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard/superadmin/users/subjobs/:id"
          element={user ? <AllSubProjects /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/superadmin/users/invoices/:id"
          element={user ? <AllInvoices /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/superadmin/users/subinvoices/:id"
          element={user ? <AllSubInvoices /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
              Error 404! PAGE NOT FOUND
            </h1>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouting;
