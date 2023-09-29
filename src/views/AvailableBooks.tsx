import { useEffect, useState } from 'react'
import { getAvailableBooks } from '../controllers/BookController';
import { IBook } from '../interface';
import { genericErrorAlertService, genericSuccessAlertService } from '../service/AlertService';
import { Container, Row, Col, Alert, FormGroup, Input, Button, FormText } from 'reactstrap';
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

        if (filterValues.selectedFilter.trim() === "") return genericErrorAlertService("Información Incompleta", "Selecciona un tipo de filtro");

        if (filterValues.filterArgs.trim() === "") return genericErrorAlertService("Información Incompleta", "Completa la información a filtrar");

        switch (filterValues.selectedFilter) {

            case "title":

                filteredBookList = originalBookList.filter(book => book.title.toLocaleLowerCase().includes(filterValues.filterArgs.toLocaleLowerCase()))

                break;

            case "owner":

                filteredBookList = originalBookList.filter(book => book.owner.toLocaleLowerCase().includes(filterValues.filterArgs.toLocaleLowerCase()))
                break;
        }

        genericSuccessAlertService("Libros filtrados con exito", "Se encontraron los siguientes libros");
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
        <Container fluid className='p-3 text-white rounded' style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff"
        }}>

            <Col md={12} className='text-center rounded p-1  '>
                <b><h2>LIBROS DISPONIBLES</h2></b>
                <hr />
            </Col>

            <Row className='my-2'>
                <Col lg={3}>
                    <FormGroup>

                        <Input type="select" name="filter" id="filter" placeholder="Ingrese su contraseña" onChange={(e) => setFilterValues({ ...filterValues, selectedFilter: e.target.value })} value={filterValues.selectedFilter}>
                            <option value="">Selecione un filtro</option>
                            <option value="owner">Por autor</option>
                            <option value="title">Por título</option></Input>
                        <FormText>
                            <b style={{ color: "white" }}>Filtro de libros</b>
                        </FormText>

                    </FormGroup>
                </Col>
                <Col lg={5}>
                    <FormGroup>
                        <Input type="text" name="filterArgs" id="filterArgs" placeholder="Ingrese la información" onChange={(e) => setFilterValues({ ...filterValues, filterArgs: e.target.value })} value={filterValues.filterArgs} />
                        <FormText>
                            <b style={{ color: "white" }}>Información a filtrar</b>
                        </FormText>
                    </FormGroup>
                </Col>
                <Col lg={4}>
                    <Button className='col-12' style={{ background: "#3085d6" }} onClick={() => bookFilter()}><b>FILTRAR</b></Button>
                </Col>

                {isFiltered ? (<Col lg={12}>
                    <Button color='danger' onClick={() => handleRemoveFilter()} className='col-12 mt-2'> <b>REMOVER FILTRO</b></Button>
                </Col>) : (null)}

                <Col>
                    <hr />
                </Col>

            </Row>

            <Row>
                <Col className='p-3' >
                    {loading ? (<Alert className='text-center' style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}><b>CARGANDO LISTADO DE LIBROS...</b></Alert>)
                        :
                        (<div>{bookList.length === 0 ? (<Alert style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} className='text-center'><b className='text-white'>NO HAY LIBROS DISPONIBLES</b></Alert>) 
                        : (<BookReport bookList={bookList} setBookList={setBookList}></BookReport>)}</div>)}
                </Col>
            </Row>

        </Container>
    )
}

export default AvailableBooks