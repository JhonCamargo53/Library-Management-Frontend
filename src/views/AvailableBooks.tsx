import { useEffect, useState } from 'react'
import { getAvailableBooks } from '../controllers/BookController';
import { IBook } from '../interface';
import { genericErrorAlertService, genericSuccessAlertService } from '../service/AlertService';
import { Container, Row, Col, Alert, FormGroup, Input, Button, FormText, Card, CardHeader, CardBody } from 'reactstrap';
import BookReport from '../components/book-manager/BookReport';

const AvailableBooks = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [bookList, setBookList] = useState<Array<IBook>>([]);
    const [originalBookList, setOriginalBookList] = useState<Array<IBook>>([]);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    

    const [filterValues, setFilterValues] = useState({ selectedFilter: "", filterArgs: "" });
    useEffect(() => {

        loadBookList();

    }, [])

    const bookFilter = () => {

        let filteredBookList: Array<IBook> = [];

        switch (filterValues.selectedFilter) {

            case "title":

                filteredBookList = originalBookList.filter(book => book.title === filterValues.filterArgs)

                break;

            case "owner":

                filteredBookList = originalBookList.filter(book => book.owner === filterValues.filterArgs)
                break;
        }

        genericSuccessAlertService("Libros filtrados con exito","Se encontraron los siguientes libros");
        setBookList(filteredBookList);
        setIsFiltered(true);

    }

    const loadBookList = async () => {

        try {

            setLoading(true);

            const response = await getAvailableBooks();
            setBookList(response.data);
            setOriginalBookList(response.data)

        } catch (error) {

            console.log(error)
            genericErrorAlertService("Error al cargar los libros disponibles", "Recargue la pagina")

        } finally {

            setLoading(false);

        }

    }

    const handleRemoveFilter = () => {

        setBookList(originalBookList);
        setIsFiltered(false);
        loadBookList();

    }

    return (
        <Container fluid>
            <Row className='my-2'>
                <Col lg={3}>
                    <FormGroup>
                        <Input type="select" name="filter" id="filter" placeholder="Ingrese su contraseña" onChange={(e) => setFilterValues({ ...filterValues, selectedFilter: e.target.value })} value={filterValues.selectedFilter}>
                            <option value="">Selecione un filtro</option>
                            <option value="owner">Por autor</option>
                            <option value="title">Por Titulo</option></Input>
                        <FormText>
                            Filtro dr libros
                        </FormText>
                    </FormGroup>
                </Col>
                <Col lg={5}>
                    <FormGroup>
                        <Input type="text" name="filterArgs" id="filterArgs" placeholder="Ingrese la información" onChange={(e) => setFilterValues({ ...filterValues, filterArgs: e.target.value })} value={filterValues.filterArgs} />
                        <FormText>
                            Información a filtrar
                        </FormText>
                    </FormGroup>
                </Col>
                <Col lg={4}>
                    <Button className='col-12' onClick={() => bookFilter()}><b>FILTRAR</b></Button>
                </Col>

                {isFiltered ? (<Col lg={12}>
                    <Button color='danger' onClick={() => handleRemoveFilter()} className='col-12'> <b>Quitar filtro</b></Button>
                </Col>) : (null)}

            </Row>

            <Card>

                <CardHeader className='text-center'>

                    <b>LIBROS DISPONIBLES</b>

                </CardHeader>
                <CardBody>
                    <Row>
                        <Col className='p-3' >
                            {loading ? (<Alert color='warning' className='text-center'><b>Cargando listado de libros...</b></Alert>)
                                :
                                (<div>{bookList.length === 0 ? (<Alert color='warning' className='text-center'><b>No hay ningun libro disponible</b></Alert>) : (<BookReport bookList={bookList} setBookList={setBookList}></BookReport>)}</div>)}
                        </Col>
                    </Row>
                </CardBody>

            </Card>

        </Container>
    )
}

export default AvailableBooks