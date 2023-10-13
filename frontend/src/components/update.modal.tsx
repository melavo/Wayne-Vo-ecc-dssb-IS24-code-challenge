"use client"
import getUrlApi from '@/config';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from "swr";
import { FormText, InputGroup } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import { XCircle } from 'react-bootstrap-icons';
interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (v: boolean) => void;
    product: null | IProduct;
    setProduct: (item: null | IProduct) => void;
}

/**
    * UpdateModal is a function that returns a React component that renders a modal window for updating an existing item.
    * The modal window contains a form with fields for the item name, type, and details, which are pre-filled with the current values of the item.
    * The function takes one parameter: props, which is an object that contains the properties for the modal component.
    * @param {IProps} props The properties for the modal component
    * @returns {JSX.Element} The modal component
*/
function UpdateModal(props: IProps) {
    const apiUrl = getUrlApi();
    const { showModalUpdate, setShowModalUpdate, product, setProduct } = props;
    const [productId, setProductId] = useState<number>(0);
    const [productName, setProductName] = useState<string>("");
    const [productOwnerName, setProductOwnerName] = useState("");
    const [scrumMasterName, setScrumMasterName] = useState("");
    const [Developers, setDevelopers] = useState<string[]>([]);
    const [devName, setDevName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [methodology, setMethodology] = useState('');
    const [location, setLocation] = useState('');
    useEffect(() => {
        if (product && product?.productId) {
            if (!Array.isArray(product.Developers)) {
                if (product.Developers.length > 0) {
                    product.Developers = product.Developers.split(",");
                }
            }
            if (product.startDate) {
                product.startDate = moment(product.startDate).format('YYYY-MM-DD');
            }
            setProductId(product.productId);
            setProductName(product.productName);
            setProductOwnerName(product.productOwnerName);
            setScrumMasterName(product.scrumMasterName);
            setDevelopers(product.Developers);
            setStartDate(product.startDate);
            setMethodology(product.methodology);
            setLocation(product?.location);
        }
    }, [product]);
    const handleSubmit = () => {
        if (!productName) {
            toast.error("Product name is empty");
            return;
        }

        if (!productOwnerName) {
            toast.error("Owner is empty");
            return;
        }

        if (!scrumMasterName) {
            toast.error("Scrum master name is empty");
            return;
        }

        if (Developers.length == 0) {
            toast.error("Please add developer");
            return;
        }

        if (!startDate) {
            toast.error("Please select Start Date");
            return;
        }
        if (!methodology) {
            toast.error("Please select Methodology");
            return;
        }

        fetch(`${apiUrl}api/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productName, productOwnerName, scrumMasterName, Developers, startDate, methodology, location })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Update success!...");
                    handleCloseModal();
                    mutate(`${apiUrl}api/product`);
                }
            });
    }

    const handleCloseModal = () => {
        setProductName('');
        setProductOwnerName('');
        setScrumMasterName('');
        setDevName("");
        setDevelopers([]);
        setStartDate('');
        setMethodology('');
        setShowModalUpdate(false);
        setProduct(null);
    }
    return (
        
        <>
            <Modal
                show={showModalUpdate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update A Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={productOwnerName}
                                onChange={(e) => setProductOwnerName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Scrum Master</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="..."
                                value={scrumMasterName}
                                onChange={(e) => setScrumMasterName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Developers</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    id="developers"
                                    placeholder="..."
                                    value={devName}
                                    onChange={(e) => setDevName(e.target.value)}
                                />
                                <Button variant="warning" onClick={() => {
                                    if (Developers.length <= 4) {
                                        if (devName && !Developers.includes(devName)) {
                                            setDevelopers([...Developers, devName]);
                                            setDevName("");
                                        }
                                    }
                                }}>
                                    <Plus size={20} />
                                </Button>
                            </InputGroup>
                            <FormText>Cannot exceed 5 developers per project. ({Developers.length} developers added)</FormText>
                        </Form.Group>

                        <ul className='text-dark'>
                            {Developers.map(dev => (
                                <li key={dev}>
                                    <div className='d-flex pb-2'>
                                        <div className='flex-grow-1'>
                                            {dev}
                                                                           
                                            <Button variant="bg-light" size='sm' onClick={() => {
                                                setDevelopers(
                                                    Developers.filter(d =>
                                                        d !== dev
                                                    )
                                                );
                                            }}>
                                                <XCircle size={15} />
                                            </Button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='row'>
                            <div className='col'>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="startDate" className='mb-0 mt-2'>
                                        <span className='h6 small text-muted'>Start Date</span>
                                    </Form.Label>
                                    <Form.Control id="startDate" name="startDate" type="date" max="2023-12-31" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                </Form.Group>
                            </div>
                            <div className='col'>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="methodology" className='mb-0 mt-2'>
                                        <span className='h6 small text-muted'>Methodology</span>
                                    </Form.Label>
                                    <select id="methodology"
                                        name="methodology"
                                        className="form-select" onChange={(e) => setMethodology(e.target.value)}
                                        value={methodology}
                                    >
                                        <option value="">...</option>
                                        <option value="Agile">Agile</option>
                                        <option value="Waterfall">Waterfall</option>
                                    </select>
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="location" className='mb-0 mt-2'>
                                <span className='h6 small text-muted'>Location</span>
                            </Form.Label>
                            <Form.Control id="location" name="location" type="text" onChange={(e) => setLocation(e.target.value)} value={location} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={() => handleSubmit()}>Save</Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default UpdateModal;