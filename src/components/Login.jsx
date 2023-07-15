import { Button } from 'semantic-ui-react'
export const Login = ({ onLogin }) => (
    <div>
        <h1>Please log in</h1>

        <Button onClick={onLogin} size="huge" color="olive">
            Log in
        </Button>
    </div>
)