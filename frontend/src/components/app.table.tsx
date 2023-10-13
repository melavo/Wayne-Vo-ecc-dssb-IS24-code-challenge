"use client"
import moment from 'moment';
import getUrlApi from '@/config';
import Button from 'react-bootstrap/Button';
import CreateModal from './create.modal';
import UpdateModal from './update.modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { Col, Form, FormGroup, Row } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { TrashFill } from 'react-bootstrap-icons';
import { PencilSquare } from 'react-bootstrap-icons';
import validUrl from 'valid-url';

import DataTable, { TableColumn } from 'react-data-table-component';
type DataRow = {
    productId: number;
    productName: string;
    productOwnerName: string;
    Developers: [];
    scrumMasterName: string;
    startDate: string;
    methodology: string;
    location: string;
};
interface IProps {
    products: IProduct[]
}

/**
    * AppTable is a function that returns a React component that renders a table of data from the app.
    * The table has sortable columns, pagination, and filtering options.
    * The function takes two parameters: data and columns.
    * @param {any[]} data The data to display in the table
    * @param {Column[]} columns The columns to show in the table
    * @returns {JSX.Element} The table component
*/

function AppTable(props: IProps) {
    const apiUrl = getUrlApi();
    const { products } = props;
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [searchName, setSearchName] = useState('');
    const [searchType, setSearchType] = useState('all');
    const handleDeleteProduct = (id: number) => {
        if (confirm(`Do you want delete this product id: ${id} ?`)) {
            fetch(`${apiUrl}api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    if (res) {
                        toast.success("Delete success!...");
                        mutate(`${apiUrl}api/product`);
                    }
                });
        }
    }

    const filteredProducts =
        products
            //Take data and filter it based on type and the name user is searching for
            .filter((product: IProduct) => {
                if (searchName !== "") {
                    if (searchType == "scrum") {
                        if (product.scrumMasterName.toLowerCase().includes(searchName.toLowerCase())) {
                            return product
                        }
                    } else if (searchType == "dev") {
                        for (let i = 0; i < product.Developers.length; i++) {
                            if (product.Developers[i].toLowerCase().includes(searchName.toLowerCase())) {
                                return product;
                            }
                        }
                    } else {
                        for (let i = 0; i < product.Developers.length; i++) {
                            if (product.productName.toLowerCase().includes(searchName.toLowerCase())) {
                                return product
                            }
                            if (product.productOwnerName.toLowerCase().includes(searchName.toLowerCase())) {
                                return product
                            }
                            if (product.methodology.toLowerCase().includes(searchName.toLowerCase())) {
                                return product
                            }
                            if (product.scrumMasterName.toLowerCase().includes(searchName.toLowerCase())) {
                                return product
                            }

                            if (product.Developers[i].toLowerCase().includes(searchName.toLowerCase())) {
                                return product;
                            }
                        }
                    }
                } else {
                    return product;
                }
            });

    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Id',
            id: 'productId',
            selector: row => row.productId,
            sortable: true,
            width: "100px"
        },
        {
            name: 'Product Name',
            selector: row => row.productName,
            sortable: true,
            width: "160px"
        },
        {
            name: 'Owner',
            selector: row => row.productOwnerName,
            sortable: true,
            width: "140px"
        },
        {
            name: 'Developers',
            //selector: row => row.Developers,
            sortable: false,
            cell: record => {
                if (Array.isArray(record.Developers)) {
                    return (<span>{record.Developers.join(', ')}</span>)
                } else {
                    return (<span>{record.Developers}</span>)
                }
                
            },
            width: "150px"
        },
        {
            name: 'Scrum Master',
            selector: row => row.scrumMasterName,
            sortable: true,
            width: "160px"
        },
        {
            name: 'Start Date',
            selector: row => moment(new Date(row.startDate)).format('MM/DD/YYYY'),
            sortable: true,
            width: "130px"
        },
        {
            name: 'Methodology',
            selector: row => row.methodology,
            sortable: true,
            width: "150px"
        },
        {
            name: 'Location',
            selector: row => row.location,
            sortable: false,
            width: "100px",
            cell: record => {
                let location = '';
                if (record.hasOwnProperty('location')) {
                    location = record.location;
                }

                if (!validUrl.isUri(location)) {
                    return (
                        <>
                            {location}
                        </>
                    )
                } else {
                    return (
                        <>
                            <a target="_new" href={location}>View</a>
                        </>
                    )
                }


            }
        },
        {
            name: 'Action',
            //selector: row => row.Developers,
            sortable: false,
            cell: record => {
                if (!record.hasOwnProperty('location')) record.location = '';
                return (
                    <>
                        <Button
                            variant="warning"
                            onClick={(event) => {
                                setShowModalUpdate(true);
                                setProduct(record);
                            }}
                            className="me-3 btn-sm"
                            style={{ width: "40px", borderRadius: "15px" }}
                        ><PencilSquare size={15} /></Button>

                        <Button
                            variant="danger"
                            onClick={() => { handleDeleteProduct(record.productId) }}
                            className="btn-sm"
                            style={{ width: "40px", borderRadius: "15px" }}><TrashFill size={15} /></Button>
                    </>
                )
            }
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "120%"
            },
        }
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'Rows per page',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <>
            <Row className="mt-4">
                <Col>
                    <h3>Web Application Inventory</h3>
                </Col>
                <Col>
                    <h4 style={{ textAlign: "right", fontSize: "100%" }}>Project Count: {filteredProducts.length}</h4>
                </Col>
            </Row>

            <Row className="align-items-center">
                <Col xs={8}>
                    <FormGroup>
                        <div className="row align-items-end justify-content-between">
                            <div className="col-4">
                                <Form.Label htmlFor="searchType" className='mb-0 mt-2'>
                                    <span className='small'>You are searching for..</span>
                                </Form.Label>

                                <Form.Select id="searchType" name="searchType" value={searchType} onChange={event => setSearchType(event.target.value)}>
                                    <option value="all">-- All --</option>
                                    <option value="scrum">Scrum Master</option>
                                    <option value="dev">Developer</option>
                                </Form.Select>
                            </div>

                            <div className="col">
                                <Form.Label htmlFor="searchName" className='mb-0 mt-2'>
                                    <span className='small'>Enter a name</span>
                                </Form.Label>

                                <Form.Control id="searchName" name=" searchName" placeholder="Name.." required value={searchName} onChange={event => setSearchName(event.target.value)} />
                            </div>
                        </div>
                    </FormGroup>
                </Col>

                <Col style={{ textAlign: "right", marginTop: "32px" }}>
                    <Button variant="warning" className="btn-sm" onClick={() => setShowModalCreate(true)}><Plus size={20} /> Add New</Button>
                </Col>
            </Row >
            <Row className={"mt-4"}>
                <DataTable
                    columns={columns}
                    data={filteredProducts}
                    defaultSortFieldId="productId"
                    customStyles={customStyles}
                    pagination paginationComponentOptions={paginationComponentOptions}
                    highlightOnHover
		            pointerOnHover
                />
            </Row>
            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateModal
                showModalUpdate={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                product={product}
                setProduct={setProduct}
            />
        </>
    );
}

export default AppTable;