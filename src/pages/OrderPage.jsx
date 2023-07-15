import { useCallback, useEffect, useState } from 'react'
// import { Button } from 'semantic-ui-react'
import { createOrder, deleteOrder, getOrders, updateOrder } from '../api/order-api'
import { OrderItem } from '../components/OrderItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormItem } from '../components/FormItem';
import Spinner from 'react-bootstrap/Spinner';

const renderLoading = () => <div className='d-flex align-items-center justify-content-center'>
    <Spinner animation="grow" variant="primary" />
    <Spinner animation="grow" variant="primary" />
    <Spinner animation="grow" variant="primary" />
</div>

export const OrderPage = () => {

    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [cmp, setCmp] = useState({});
    const [loading, setLoading] = useState(false);
    const handlerGetOrders = useCallback(async () => {
        const data = await getOrders();
        setOrders(data);
        setLoading(false);
    }, [])

    const functionOrder = useCallback(async (e, type, id) => {
        e.preventDefault();
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        setShow(false);
        setLoading(true)
        if (type === 'create') {
            await createOrder(formDataObj);
        } else {
            await updateOrder(id, formDataObj);
        }
        handlerGetOrders();
    }, [handlerGetOrders]);

    const deleteItem = useCallback(async (id) => {
        setLoading(true);
        await deleteOrder(id);
        handlerGetOrders();
    }, [handlerGetOrders]);

    const openModal = useCallback((type, item) => {
        if (type === 'create') {
            setCmp(<FormItem buttonText="Create Order" onSubmit={(e) => functionOrder(e, 'create')} />);
        } else {
            setCmp(<FormItem buttonText="Update Order" defaultValue={item} onSubmit={(e) => functionOrder(e, 'update', item.id)} />);
        }
        setShow(!show);
    }, [functionOrder, show]);

    useEffect(() => {
        setLoading(true);
        handlerGetOrders();
    }, [handlerGetOrders])

    const renderOrder = () => <div className='my-3'>
        <Button className='me-3' variant='success' onClick={() => openModal('create')}>Create new order</Button>
        <Button style={{ backgroundColor: 'orange', borderColor: 'orange' }} className='text-light' onClick={() => { setLoading(true); handlerGetOrders() }}>Refresh List</Button>
    </div>
    const renderModal = () => (
        <Modal show={show} onHide={() => setShow(!show)}>
            <Modal.Body>
                {cmp}
            </Modal.Body>
        </Modal>
    )

    return <div>
        {renderOrder()}
        {!loading && !!orders && orders.map(item => <OrderItem order={item} key={item.id} onUpdate={() => openModal('update', item)} onDelete={() => deleteItem(item.id)} />)}
        {loading && renderLoading()}
        {renderModal()}
    </div>;
}