
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import UserContextProvider from './context/UserContext';
import Home from './views/Home';
import Register from './views/Register';
import { Col, Container, Row } from 'reactstrap';
import NavbarManager from './components/navbar/NavbarManager';
import ProtectedRoute from './routes/ProtectedRoute';
import BorrowBooks from './views/BorrowBooks';
import AvailableBooks from './views/AvailableBooks';
import BookManager from './components/book-manager/BookManager';

function App() {

  return (

    <Container fluid className='m-0 p-0 ' >

      <Router>

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
                  <Route path="/book/list" element={<AvailableBooks />} />
                </Route>

                <Route path="/book/borrow" element={<ProtectedRoute allowedRole={["USER"]} />}>
                  <Route path="/book/borrow" element={<BorrowBooks />} />
                </Route>

                {/*Admin Access*/}

                <Route path="/book/management" element={<ProtectedRoute allowedRole={["ADMIN"]} />}>
                  <Route path="/book/management" element={<BookManager />} />
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

      </Router>

    </Container>

  )
}

export default App
