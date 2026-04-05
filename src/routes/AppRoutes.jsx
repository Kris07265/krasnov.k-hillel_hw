import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout.jsx";
import UsersListPage from "../pages/UsersListPage.jsx";
import UserDetailsPage from "../pages/UserDetailsPage.jsx";
import CreateUserPage from "../pages/CreateUserPage.jsx";
import EditUserPage from "../pages/EditUserPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <MainLayout>
            <Routes>
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="/users" element={<UsersListPage/>} />
                <Route path="/users/:id" element={<UserDetailsPage/>} />
                <Route path="/users/create" element={<CreateUserPage/>} />
                <Route path="/users/:id/edit" element={<EditUserPage/>} />
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
            </MainLayout>
        </Router>
    )
}

export default AppRoutes