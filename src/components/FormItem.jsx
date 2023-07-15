import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const FormItem = ({ buttonText, onSubmit, defaultValue }) => {
    return (<Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formItem">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" defaultValue={defaultValue && defaultValue.name} required />
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" min={1} placeholder="Enter quantity" name="quantity" defaultValue={defaultValue && defaultValue.quantity} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRestaurant">
            <Form.Label>Restaurant</Form.Label>
            <Form.Control type="text" placeholder="Enter restaurant name" name="restaurantId" defaultValue={defaultValue && defaultValue.restaurantId} required />
        </Form.Group>
        <Button variant="primary" type="submit">
            {buttonText}
        </Button>
    </Form>)
}