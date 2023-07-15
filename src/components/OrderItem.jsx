import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export const OrderItem = ({ order, onUpdate, onDelete }) => {

    const { id, name, quantity, orderStatus, restaurantId, createdAt } = order;

    let textColor;
    switch (orderStatus) {
        case 'SUCCESS':
            textColor = 'text-success';
            break;
        case 'FAILURE':
            textColor = 'text-danger';
            break;
        default:
            textColor = 'text-primary';
    }

    return <Card className='mb-4' style={{ width: '55em' }}>
        <Card.Header style={{backgroundColor: '#815c1b', color: 'white'}}>
            <div className='d-flex justify-content-between'>
                <span>
                    {id}
                </span>
                <span>
                    {createdAt.replace("T", " ")}
                </span>
            </div>
        </Card.Header>
        <Card.Body style={{backgroundColor: '#fdeac9'}}>
            <Col>
                <div className='d-flex align-items-center justify-content-between'>
                    <div>
                        <span className='fw-bold' style={{width: '25em', display: 'inline-block'}}>{name}</span>
                        <span style={{fontSize: '1.2em'}}>x{quantity}</span>
                    </div>
                    <span className={`${textColor}`}>{orderStatus}</span>
                </div>
                <p>Restaurant: {restaurantId}</p>
                <Button variant='primary' onClick={onUpdate} className='me-3'>Update</Button>
                <Button variant='danger' onClick={onDelete}>Delete</Button>
            </Col>
        </Card.Body>
    </Card>


}