import { BrowserRouter, Routes, Route } from "react-router-dom";

/* =========================
   PUBLIC PAGES
========================= */
import Homepage from "./pages/Homepage";
import Competition from "./pages/Competition";
import Seminar from "./pages/Seminar";
import Workshop from "./pages/Workshop";
import Talkshow from "./pages/Talkshow";

/* =========================
   AUTH PAGES
========================= */
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";

/* =========================
   LAYOUTS
========================= */
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

/* =========================
   PROTECTED ROUTE
========================= */
import ProtectedRoute from "./routes/ProtectedRoute";

/* =========================
   DASHBOARD PAGES
========================= */
import DashboardIndex from "./pages/dashboard/DashboardIndex";

/* CATEGORY (Diperbaiki: menggunakan tanda kurung kurawal {}) */
import CategoryIndex from "./pages/dashboard/category/CategoryIndex";
import CategoryCreate from "./pages/dashboard/category/CategoryCreate";
import CategoryEdit from "./pages/dashboard/category/CategoryEdit";

/* PEMBICARA */
import PembicaraIndex from "./pages/dashboard/pembicara/PembicaraIndex";
import CreatePembicara from "./pages/dashboard/pembicara/CreatePembicara";
import EditPembicara from "./pages/dashboard/pembicara/EditPembicara";

/* EVENT */
import EventIndex from "./pages/dashboard/event/EventIndex";
import CreateEvent from "./pages/dashboard/event/CreateEvent";
import EditEvent from "./pages/dashboard/event/EditEvent";

/* BIODATA */
import Biodata from "./pages/dashboard/biodata/Biodata";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================= */}
                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Homepage />}
                    />

                    <Route
                        path="/competition"
                        element={<Competition />}
                    />

                    <Route
                        path="/seminar"
                        element={<Seminar />}
                    />

                    <Route
                        path="/workshop"
                        element={<Workshop />}
                    />

                    <Route
                        path="/talkshow"
                        element={<Talkshow />}
                    />

                </Route>

                {/* =========================
                    AUTH ROUTES
                ========================= */}
                <Route element={<AuthLayout />}>

                    <Route
                        path="/login"
                        element={<LoginForm />}
                    />

                    <Route
                        path="/register"
                        element={<RegisterForm />}
                    />

                </Route>

                {/* =========================
                    PROTECTED ROUTES
                ========================= */}
                <Route element={<ProtectedRoute />}>

                    <Route element={<DashboardLayout />}>

                        {/* DASHBOARD */}
                        <Route
                            path="/dashboard"
                            element={<DashboardIndex />}
                        />

                        {/* =========================
                            CATEGORY
                        ========================= */}

                        <Route
                            path="/dashboard/category"
                            element={<CategoryIndex />}
                        />

                        <Route
                            path="/dashboard/category/create"
                            element={<CategoryCreate />}
                        />

                        <Route
                            path="/dashboard/category/edit/:id"
                            element={<CategoryEdit />}
                        />

                        {/* =========================
                            PEMBICARA
                        ========================= */}

                        <Route
                            path="/dashboard/pembicara"
                            element={<PembicaraIndex />}
                        />

                        <Route
                            path="/dashboard/pembicara/create"
                            element={<CreatePembicara />}
                        />

                        <Route
                            path="/dashboard/pembicara/edit/:id"
                            element={<EditPembicara />}
                        />

                        {/* =========================
                            EVENT
                        ========================= */}

                        <Route
                            path="/dashboard/event"
                            element={<EventIndex />}
                        />

                        <Route
                            path="/dashboard/event/create"
                            element={<CreateEvent />}
                        />

                        <Route
                            path="/dashboard/event/edit/:id"
                            element={<EditEvent />}
                        />

                        {/* =========================
                            BIODATA
                        ========================= */}

                        <Route
                            path="/dashboard/biodata"
                            element={<Biodata />}
                        />

                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;