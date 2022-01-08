const applicationState = {
    requests: [
        {
            "id": 1,
            "description": "Aut sint voluptatem fugit eius quas molestiae modi.",
            "address": "34445 Bianka Ports",
            "budget": 400,
            "neededBy": "2021-08-27"
        }
    ],

    plumbers: [
        {
            "id": 1,
            "name": "Maude"
      
         },
        {
            "id": 2,
            "name": "Merle"
        }
        
    ]
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

    export const plumbers = () => {
        return fetch(`${API}/plumbers`)
            .then(response => response.json())
            .then(
             (avlPlumbers) => {
                applicationState.plumbers = avlPlumbers
        }
    )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}


export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        container.dispatchEvent(new CustomEvent("stateChanged"))
    })
        
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                container.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}