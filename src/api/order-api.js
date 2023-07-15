import { API, Auth } from 'aws-amplify';

const getRequestOptions = async () => {
  return {
    headers: {
      Authorization: `Bearer ${(await Auth.currentSession())
        .getAccessToken()
        .getJwtToken()}`
    }
  };
}


export async function getOrders() {
  const requestOptions = await getRequestOptions();

  const response = await API.get('OrderAPIGatewayAPI', '/orders', {
    ...requestOptions,
  })
  return response;

}

export async function createOrder(
  newOrder
) {
  const requestOptions = await getRequestOptions();
  const response = await API.post('OrderAPIGatewayAPI', '/orders', {
    body: newOrder,
    ...requestOptions
  })
  return response;
}

export async function updateOrder(
  id,
  order,
) {
  const requestOptions = await getRequestOptions();
  await API.put('OrderAPIGatewayAPI', `/orders/${id}`, {
    body: order,
    ...requestOptions
  })
}

export async function deleteOrder(
  id
) {
  const requestOptions = await getRequestOptions();
  await API.del('OrderAPIGatewayAPI', `/orders/${id}`, {
    ...requestOptions
  })
}

