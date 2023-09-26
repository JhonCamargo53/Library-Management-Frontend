
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import UserContextProvider from './context/UserContext';
import Home from './views/Home';
import Register from './views/Register';
import { Col, Container, Row } from 'reactstrap';
import NavbarManager from './components/navbar/NavbarManager';
import AdminManagement from './views/AdminManagement';
import BookList from './views/BookList';
import ProtectedRoute from './routes/ProtectedRoute';
import BorrowBooks from './views/BorrowBooks';

function App() {

  return (

    <Container fluid >

      <BrowserRouter>

        <UserContextProvider>

          <NavbarManager />

          <Row className='mx-1'>
            <Col>
              <Routes>

                {/*Guest Access*/}
                <Route path="*" element={<Home />} />
                <Route path="/home" element={<Home />} />

                {/*User Access*/}

                <Route path="/book/list" element={<ProtectedRoute allowedRole={["USER"]} />}>
                  <Route path="/book/list" element={<BookList />} />
                </Route>

                <Route path="/book/borrow" element={<ProtectedRoute allowedRole={["USER"]} />}>
                  <Route path="/book/borrow" element={<BorrowBooks/>} />
                </Route>

                {/*Admin Access*/}

                <Route path="/book/management" element={<ProtectedRoute allowedRole={["ADMIN"]} />}>
                  <Route path="/book/management" element={<AdminManagement />} />
                </Route>

                {/*Auth*/}
                <Route path="/register" element={<ProtectedRoute allowedRole={["GUEST"]} />}>
                  <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/login" element={<ProtectedRoute allowedRole={["GUEST"]} />}>
                  <Route path="/login" element={<Login />} />
                </Route>

              </Routes>

            </Col>
          </Row>

        </UserContextProvider>

      </BrowserRouter>

    </Container>

  )
}

export default App
