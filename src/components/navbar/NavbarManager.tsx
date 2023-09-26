import { useUserContext } from '../../context/UserContext';
import AdminNavbar from './navbar-type/AdminNavbar';
import UserNavbar from './navbar-type/UserNavbar';
import GuestNavbar from './navbar-type/GuestNavbar';

const NavbarManager = () => {

    const { user} = useUserContext();

    switch (user?.role) {

        case 0:
            return <AdminNavbar />
        case 1:
            return <UserNavbar />
        default:
            return <GuestNavbar />

    }

}

export default NavbarManager